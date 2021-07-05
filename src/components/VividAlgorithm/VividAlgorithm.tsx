import * as React from "react";
import {useEffect, useRef} from "react";
import {Text, View} from "../UI";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {getStyles} from "./styles";
import {
    BinarySearchTree,
    BinarySearchTreeNode,
    BinaryTreeNode,
    Coordinate,
    getDirectionVector,
    SinglyLinkedListNode,
    Stack,
    uuidV4
} from "../../utils";
import {Card} from "../../containers/Card";
import {TreeNode} from "../../types";
import Svg, {Circle, Defs, G, Line, Marker, Path, Rect, Text as SVGText, TSpan} from "react-native-svg";
import {ScrollView} from "react-native";

export interface VividAlgorithmProps<T> {
    data?: T,
    referenceData?: any,
    relatedNodeKey?: string,
    relatedRouteKey?: string,
    isDebug?: boolean
}

export const VividAlgorithm = function <T extends { [key in string]: any }>(props: VividAlgorithmProps<T>) {
    const {data, referenceData, relatedNodeKey, relatedRouteKey, isDebug = false} = props;
    const {sizeLabor, themeLabor, wp, colors, ms} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);

    let relatedNode: TreeNode<any> | undefined;
    let relatedBinaryNode: BinaryTreeNode<any> | undefined;
    let relatedMatrixCell: Coordinate | undefined;
    if (relatedNodeKey) {
        relatedNode = data?.[relatedNodeKey] as TreeNode<any> | undefined;
        relatedBinaryNode = data?.[relatedNodeKey] as BinaryTreeNode<any> | undefined;
        relatedMatrixCell = data?.[relatedNodeKey] as Coordinate | undefined;
    }

    // TODO render bug needs to be fixed
    let relatedMatrixRoutes: Coordinate[][] | undefined;
    if (relatedRouteKey) {
        relatedMatrixRoutes = data?.[relatedRouteKey] as Coordinate[][] | undefined;
    }

    const VividNumber: React.FC<{ data: number }> = ({data}) => {
        return (
            <Row>
                <Col size={6}><Text>{data.toString()}</Text></Col>
            </Row>
        )
    }

    const VividString: React.FC<{ data: string }> = ({data}) => {
        return (
            <Row>
                <Col size={6}><Text>{data}</Text></Col>
            </Row>
        )
    }


    const VividTreeContainer: React.FC = ({children}) => {
        const horizontalScrollView = useRef<ScrollView>(null)
        useEffect(() => {
            horizontalScrollView?.current?.scrollTo({
                x: (treePanelWidth - wp(375)) / 2,
                y: 0,
                animated: false
            })
        }, [])

        return <ScrollView nestedScrollEnabled style={{height: wp(375)}}>
            <ScrollView style={{width: wp(375)}}
                        horizontal ref={horizontalScrollView}>
                <Svg
                    width={treePanelWidth}
                    height={treePanelHeight}
                >
                    <G fill={colors.background} strokeWidth={strokeWidth} stroke={colors.border}>
                        {
                            children
                        }
                    </G>
                </Svg>
            </ScrollView>
        </ScrollView>
    }

    const VividTree: React.FC<{ data: TreeNode<any> }> = ({data}) => {
        return (
            <VividTreeContainer>
                <VividTreeRecursive node={data} level={1} index={0} familyLength={1} parentX={0} parentY={0}
                                    maxDepth={data.getMaxDepth()}/>
            </VividTreeContainer>
        )
    }

    const VividBinaryTree: React.FC<{ node?: BinaryTreeNode<any> | BinarySearchTreeNode<any>, maxDepth?: number }> = ({node, maxDepth}) => {
        return (
            <VividTreeContainer>
                {
                    node
                        ? <VividBinaryTreeRecursive node={node} level={1} index={0} familyLength={1}
                                                    maxDepth={maxDepth}/>
                        : null
                }
            </VividTreeContainer>
        )
    }

    const matrixPanelWidth = wp(360, false);
    const matrixRectStrokeWidth = wp(1, false);
    const arrowCut = 0.3;
    const arrowColor = colors.warning

    const VividMatrix: React.FC<{ data: Array<Array<any>> }> = ({data}) => {
        const rowCount = data?.length;
        const colCount = data?.[0]?.length;
        if (colCount < 1) {
            return null
        }
        const rectSize = (matrixPanelWidth - (colCount + 1) * matrixRectStrokeWidth) / colCount;
        const matrixHeight = rectSize * rowCount;

        return (
            <Svg
                width={matrixPanelWidth}
                height={matrixHeight}
            >
                <G>
                    {data.map((row, i) => {
                        return row.map((col, j) => {
                            const colKey = i + '-' + j.toString();
                            const isActive = (relatedMatrixCell?.y === i && relatedMatrixCell?.x === j);
                            return <Rect
                                key={colKey}
                                x={j * rectSize}
                                y={i * rectSize}
                                width={rectSize}
                                height={rectSize}
                                stroke={colors.border}
                                strokeDasharray={`${rectSize},${rectSize * 2},${rectSize}`}
                                strokeWidth={matrixRectStrokeWidth}
                                fill={isActive ? colors.primary : colors.backgroundA}
                            />
                        })
                    })}
                    {data.map((row, i) => {
                        const rowKey = i.toString();

                        return row.map((col, j) => {
                            const colKey = 'text-' + i + '-' + j.toString();
                            const isActive = (relatedMatrixCell?.y === i && relatedMatrixCell?.x === j);
                            return <SVGText
                                key={colKey}
                                strokeWidth={wp(1)}
                                fontSize={ms.fs.m}
                                fill={isActive ? colors.buttonText : colors.text}
                                fontWeight={100}
                                x={(j + 0.5) * rectSize}
                                y={(i + 0.5) * rectSize}
                                textAnchor="middle"
                            >{data[i][j].toString()}</SVGText>
                        })
                    })}
                    {
                        relatedMatrixRoutes
                            ? relatedMatrixRoutes.map((route, routeIndex) => {
                                return route.map((cell, cellIndex) => {
                                    const from = cell;
                                    const to = relatedMatrixRoutes?.[routeIndex]?.[cellIndex + 1];
                                    const deviationVector = getDirectionVector(from, to);

                                    return from && to ?
                                        <G key={from.y + ',' + from.x + to.y + to.x}>
                                            <Defs>
                                                <Marker
                                                    id="Triangle"
                                                    viewBox="0 0 10 10"
                                                    refX="0"
                                                    refY="5"
                                                    markerWidth="4"
                                                    markerHeight="3"
                                                    orient="auto"
                                                >
                                                    <Path d="M 0 0 L 10 5 L 0 10 z" fill={arrowColor}/>
                                                </Marker>
                                            </Defs>
                                            <Path
                                                d={`M ${(from.x + 0.5 + deviationVector.x * arrowCut) * rectSize} ${(from.y + 0.5 + deviationVector.y * arrowCut) * rectSize} L ${(to.x + 0.5 - deviationVector.x * arrowCut) * rectSize} ${(to.y + 0.5 - deviationVector.y * arrowCut) * rectSize}`}
                                                fill="none"
                                                stroke={arrowColor}
                                                strokeWidth="2"
                                                markerEnd="url(#Triangle)"
                                            />
                                        </G>
                                        : null
                                })
                            })
                            : null
                    }
                </G>
            </Svg>

        )
    }

    const treePanelWidth = wp(20000);
    const treePanelHeight = wp(20000);
    const strokeWidth = wp(2);
    const levelOffset = wp(60);
    const circleR = wp(20);
    const nodeSpace = wp(40);
    const fontSize = wp(12);
    const fontOffsetY = fontSize / 3;


    const VividTreeRecursive: React.FC<{ node: TreeNode<any>, level: number, index: number, familyLength: number, parentX?: number, parentY?: number, maxDepth?: number }> = ({node, level = 1, index = 0, familyLength = 1, parentX, parentY, maxDepth}) => {
        if (!node) {
            return null;
        }
        // const firstRender = useMemo(
        //     () =>console.log('!!!first Render'),
        //     []
        // );
        let space = 0;
        let offsetX = 0;
        let offsetY = 0;
        let levelNodeSpace = nodeSpace * Math.pow(2, (maxDepth || 5) - 1 - level)
        if (level === 1) {
            space = treePanelWidth / 2
            offsetX = space - circleR;
            offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
        } else {
            offsetX = parentX! - (familyLength / 2) * levelNodeSpace + (index + 0.5) * levelNodeSpace;
            offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
        }

        const isActive = node.id === relatedNode?.id;
        return (
            <G key={node.id}>
                {
                    level > 1
                        ? <Line x1={parentX} y1={parentY} x2={offsetX} y2={offsetY}/>
                        : null
                }
                {node.children
                    ? node.children.map((child, index, family) => <VividTreeRecursive key={child.id}
                                                                                      node={child}
                                                                                      level={level + 1}
                                                                                      index={index}
                                                                                      familyLength={family.length}
                                                                                      parentX={offsetX}
                                                                                      parentY={offsetY}
                                                                                      maxDepth={maxDepth}/>)
                    : null
                }
                <Circle r={circleR} cx={offsetX} cy={offsetY}
                        fill={isActive ? colors.primary : colors.background}/>
                <SVGText
                    strokeWidth={wp(1)}
                    fill={isActive ? colors.buttonText : colors.text}
                    stroke={isActive ? colors.buttonText : colors.text}
                    fontSize={fontSize}
                    fontWeight={100}
                    x={offsetX}
                    y={offsetY + fontOffsetY}
                    textAnchor="middle"
                >{node.name || node.id}</SVGText>
            </G>
        )
    }

    const VividBinaryTreeRecursive: React.FC<{ node: BinaryTreeNode<any> | BinarySearchTreeNode<any>, level: number, index: number, familyLength: number, parentX?: number, parentY?: number, maxDepth?: number }> = ({node, level = 1, index = 0, familyLength = 1, parentX, parentY, maxDepth}) => {
        if (!node) {
            return null;
        }
        let space = 0;
        let offsetX;
        let offsetY;
        let levelNodeSpace = nodeSpace * Math.pow(2, (maxDepth || 5) - 1 - level)
        if (level === 1) {
            space = treePanelWidth / 2
            offsetX = space - circleR;
            offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
        } else {
            offsetX = parentX! - ((index < 1) ? levelNodeSpace : -levelNodeSpace);
            offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
        }

        const isActive = node.value === relatedBinaryNode?.value;
        return (
            <G key={node.value}>
                {
                    level > 1
                        ? <Line x1={parentX} y1={parentY} x2={offsetX} y2={offsetY}/>
                        : null
                }
                {
                    node.left
                        ?
                        <VividBinaryTreeRecursive node={node.left} level={level + 1} index={0}
                                                  familyLength={2} parentX={offsetX} parentY={offsetY}
                                                  maxDepth={maxDepth}/>
                        : null
                }
                {
                    node.right
                        ?
                        <VividBinaryTreeRecursive node={node.right} level={level + 1} index={1}
                                                  familyLength={2} parentX={offsetX} parentY={offsetY}
                                                  maxDepth={maxDepth}/>
                        : null
                }
                <Circle r={circleR} cx={offsetX} cy={offsetY}
                        fill={isActive ? colors.primary : colors.background}/>
                <SVGText
                    fill="none"
                    stroke={isActive ? colors.buttonText : colors.text}
                    fontSize={fontSize}
                    fontWeight={1}
                    x={offsetX}
                    y={offsetY + fontOffsetY}
                    textAnchor="middle"
                >
                    <TSpan x={offsetX} y={offsetY + fontOffsetY}>{node.value}</TSpan>
                    <TSpan x={offsetX} y={offsetY + fontOffsetY + fontSize + wp(2)}>{node.count}</TSpan>
                    {
                        node instanceof BinarySearchTreeNode
                            ? <TSpan x={offsetX}
                                     y={offsetY + fontOffsetY + 2 * fontSize + wp(4)}>{node.leftSum}</TSpan>
                            : null
                    }
                </SVGText>
            </G>
        )
    }

    const VividArray: React.FC<{ data: any[] }> = ({data}) => {
        return (
            <View>
                {
                    data[0] instanceof Array
                        ? <VividMatrix data={data}/>
                        : data.map(item => {
                            switch (typeof item) {
                                case 'number':
                                    return <View style={styles.arrayItem}
                                                 key={uuidV4()}><Text>{item}</Text></View>;
                                case 'string':
                                    return <View style={styles.arrayItem}
                                                 key={uuidV4()}><Text>{item}</Text></View>;
                                default:
                                    return <View style={styles.arrayItem}
                                                 key={uuidV4()}><Text>{JSON.stringify(item)}</Text></View>;
                            }
                        })

                }
            </View>
        )
    }

    const VividObject: React.FC<{ data: { [key in string]: any } }> = ({data}) => {
        return (
            <Row>
                {
                    Object.keys(data).map(key => {
                        return <View style={styles.arrayItem} key={key}>
                            <Text>{key}</Text>
                            <Text>{data[key]}</Text>
                        </View>
                    })
                }
            </Row>
        )
    }

    const VividLinkedListNode: React.FC<{ data: SinglyLinkedListNode }> = ({data}) => {
        return (
            <Row>
                <View style={styles.arrayItem} key={data.index}>
                    <Text>{data.index}</Text>
                    <Text>{data.value}</Text>
                </View>
            </Row>
        )
    }

    // TODO
    const VividBinaryTreeNode: React.FC<{ data: BinaryTreeNode<any> }> = ({data}) => {
        return (
            <Row>
                <View style={styles.arrayItem} key={data.value}>
                    <Text>{data.value}</Text>
                </View>
            </Row>
        )
    }

    const VividBinarySearchTreeNode: React.FC<{ data: BinarySearchTreeNode<any> }> = ({data}) => {
        return (
            <Row>
                <View style={styles.arrayItem} key={data.value}>
                    <Text>{data.value}</Text>
                </View>
            </Row>
        )
    }

    const renderVariable = (item: any) => {
        if (!item) return null
        switch (typeof item) {
            case 'number':
                return <VividNumber data={item}/>;
            case 'string':
                return <VividString data={item}/>;
            case 'object':
                if (item instanceof TreeNode) {
                    return <VividTree data={item}/>
                } else if (item instanceof BinaryTreeNode) {
                    return <VividBinaryTreeNode data={item}/>;
                } else if (item instanceof BinarySearchTree) {
                    return <VividBinaryTree node={item.root} maxDepth={item.getMaxDepth()}/>;
                } else if (item instanceof SinglyLinkedListNode) {
                    return <VividLinkedListNode data={item}/>
                } else if (item instanceof Map) {
                    return <VividArray data={Array.from(item)}/>
                } else if (item instanceof Stack) {
                    return <VividArray data={item.toArray()}/>
                } else if (item instanceof Array) {
                    return <VividArray data={item}/>
                } else {
                    return <VividObject data={item}/>;
                }
        }
    }

    return <View>
        {
            referenceData
                ? renderVariable(referenceData)
                : null
        }
        {
            data
                ? Object.keys(data).map(datumKey => {
                    const item = data[datumKey];
                    return (datumKey !== relatedRouteKey && datumKey !== relatedNodeKey)
                        ?
                        <Card title={datumKey} key={datumKey}>
                            {
                                renderVariable(item)
                            }
                        </Card>
                        : null

                })
                : null
        }
    </View>
}

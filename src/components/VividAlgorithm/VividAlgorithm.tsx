import * as React from "react";
import {useEffect, useRef} from "react";
import {Text, View} from "../UI";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {getStyles} from "./styles";
import {Matrix, SinglyLinkedListNode, Stack, uuidV4} from "../../utils";
import {Card} from "../../containers/Card";
import {BinaryTreeNode, TreeNode} from "../../types";
import Svg, {Circle, G, Line, Text as SVGText} from "react-native-svg";
import {ScrollView} from "react-native";

export interface VividAlgorithmProps<T> {
    data?: T,
    referenceData?: any,
    relatedKey?: string,
    isDebug?: boolean
}

export const VividAlgorithm = function <T extends { [key in string]: any }>(props: VividAlgorithmProps<T>) {
    const {data, referenceData, relatedKey, isDebug = false} = props;
    const {sizeLabor, themeLabor, wp, colors} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);
    const treePanelWidth = wp(2000);
    const treePanelHeight = wp(2000);
    const renderNumber = (num: number) => {
        return (
            <Row>
                <Col size={6}><Text>{num.toString()}</Text></Col>
            </Row>
        )
    }

    const renderString = (num: string) => {
        return (
            <Row>
                <Col size={6}><Text>{num}</Text></Col>
            </Row>
        )
    }

    const renderReference = (data: any) => {
        switch (typeof data) {
            case 'object':
                if (data instanceof TreeNode) {
                    return renderTree(data);
                } else if (data instanceof BinaryTreeNode) {
                    return renderBinaryTree(data);
                } else if (data instanceof Matrix) {
                    return renderMatrix(data);
                } else {
                    return null;
                }
            default:
                return null;
        }
    }

    const TreeContainer: React.FC = ({children}) => {
        const horizontalScrollView = useRef<ScrollView>(null)
        useEffect(() => {
            horizontalScrollView?.current?.scrollTo({x: (treePanelWidth - wp(375)) / 2, y: 0, animated: false})
            console.log('---useEffect')
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

    const renderTree = (node: TreeNode<any>) => {
        return (
            <TreeContainer>
                {/*{*/}
                <RenderRecursive node={node} level={1} index={0} familyLength={1} parentX={0} parentY={0} maxDepth={node.getMaxDepth()}/>
                // renderRecursive(node, 1, 0, 1, 0, 0, node.getMaxDepth())
                {/*}*/}
            </TreeContainer>
        )
    }

    const renderBinaryTree = (node: BinaryTreeNode) => {
        return (
            <TreeContainer>
                {
                    renderBinaryRecursive(node, 1, 0, 1)
                }
            </TreeContainer>
        )
    }

    const renderMatrix = (node: Matrix<any>) => {
        const elements = node.toArray();
        return (
            <View style={{borderLeftWidth: wp(1), borderTopWidth: wp(1), borderColor: colors.border}}>
                {
                    elements.map((row, i) => {
                        const rowKey = i.toString();
                        return (
                            <Row style={{height: wp(360 / row.length)}} key={rowKey}>
                                {
                                    row.map((item, j) => {
                                        const colKey = i + '-' + j.toString();
                                        return <Col style={{borderRightWidth: wp(1), borderBottomWidth: wp(1), borderColor: colors.border}}
                                                    key={colKey}><Text style={{textAlign: 'center'}}>{item.toString()}</Text></Col>
                                    })
                                }

                            </Row>
                        )
                    })
                }
            </View>
        )
    }

    const strokeWidth = wp(2);
    const levelOffset = wp(60);
    const circleR = wp(20);
    const nodeSpace = wp(40);
    const fontSize = wp(12);
    const fontOffsetY = fontSize / 3;
    let relatedNode: TreeNode<any> | undefined = undefined;
    let relatedBinaryNode: BinaryTreeNode | undefined = undefined;
    if (relatedKey) {
        relatedNode = data?.[relatedKey] as TreeNode<any> | undefined;
        relatedBinaryNode = data?.[relatedKey] as BinaryTreeNode | undefined;
    }

    const RenderRecursive: React.FC<{ node: TreeNode<any>, level: number, index: number, familyLength: number, parentX?: number, parentY?: number, maxDepth?: number }> = ({node, level = 1, index = 0, familyLength = 1, parentX, parentY, maxDepth}) => {
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
        let levelNodeSpace = nodeSpace * Math.pow(2, (maxDepth || 5) - level);
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
                    ? node.children.map((child, index, family) => <RenderRecursive key={child.id} node={child} level={level + 1} index={index}
                                                                                   familyLength={family.length} parentX={offsetX} parentY={offsetY}
                                                                                   maxDepth={maxDepth}/>)
                    : null
                }
                <Circle r={circleR} cx={offsetX} cy={offsetY} fill={isActive ? colors.primary : colors.background}/>
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

    const renderBinaryRecursive = (node: BinaryTreeNode, level: number = 1, index: number = 0, familyLength: number = 1, parentX?: number, parentY?: number): React.ReactNode => {
        if (!node) {
            return null;
        }
        let space = 0;
        let offsetX;
        let offsetY;
        let levelNodeSpace = nodeSpace / 7
        if (level === 1) {
            space = treePanelWidth / 2
            offsetX = space - circleR;
            offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
        } else {
            offsetX = parentX! - ((index < 1) ? levelNodeSpace : -levelNodeSpace);
            offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
        }

        const isActive = node.val === relatedBinaryNode?.val;
        return (
            <G key={node.val}>
                {
                    level > 1
                        ? <Line x1={parentX} y1={parentY} x2={offsetX} y2={offsetY}/>
                        : null
                }
                {
                    node.left
                        ? renderBinaryRecursive(node.left, level + 1, 0, 2, offsetX, offsetY)
                        : null
                }
                {
                    node.right
                        ? renderBinaryRecursive(node.right, level + 1, 1, 2, offsetX, offsetY)
                        : null
                }
                <Circle r={circleR} cx={offsetX} cy={offsetY} fill={isActive ? colors.primary : colors.background}/>
                <SVGText
                    fill="none"
                    stroke={isActive ? colors.buttonText : colors.text}
                    fontSize={fontSize}
                    fontWeight={1}
                    x={offsetX}
                    y={offsetY + fontOffsetY}
                    textAnchor="middle"
                >{node.val}</SVGText>
            </G>
        )
    }

    const renderArray = (array: any[]) => {
        return (
            <View>
                <Row>
                    {
                        array.map(item => {
                            switch (typeof item) {
                                case 'object':
                                    // console.log('array')
                                    if (item instanceof Array) {
                                        return <View style={styles.arrayItem} key={uuidV4()}>
                                            {
                                                item.map(innerItem => {
                                                    return <Text key={innerItem}>{innerItem}</Text>
                                                })
                                            }
                                        </View>
                                    }
                                    break;
                                case 'number':
                                    return <View style={styles.arrayItem} key={uuidV4()}><Text>{item}</Text></View>;
                                case 'string':
                                    return <View style={styles.arrayItem} key={uuidV4()}><Text>{item}</Text></View>;
                                default:
                                    return <View style={styles.arrayItem} key={uuidV4()}><Text>{JSON.stringify(item)}</Text></View>;
                            }
                        })
                    }
                </Row>
            </View>
        )
    }

    const renderObject = (obj: { [key in string]: any }) => {
        return (
            <Row>
                {
                    Object.keys(obj).map(key => {
                        return <View style={styles.arrayItem} key={key}>
                            <Text>{key}</Text>
                            <Text>{obj[key]}</Text>
                        </View>
                    })
                }
            </Row>
        )
    }

    const renderLinkedListNode = (linkedListNode: SinglyLinkedListNode) => {
        return (
            <Row>
                <View style={styles.arrayItem} key={linkedListNode.index}>
                    <Text>{linkedListNode.index}</Text>
                    <Text>{linkedListNode.value}</Text>
                </View>
            </Row>
        )
    }

    const renderBinaryTreeNode = (node: BinaryTreeNode) => {
        return (
            <Row>
                <View style={styles.arrayItem} key={node.val}>
                    <Text>{node.val}</Text>
                </View>
            </Row>
        )
    }

    const renderVariable = (item: any) => {

        // bunnyConsole.log('item', item);
        if (!item) return null
        switch (typeof item) {
            case 'number':
                return renderNumber(item);
            case 'string':
                return renderString(item);
            case 'object':
                if (data instanceof Matrix) {
                    return renderMatrix(data);
                } else if (item instanceof TreeNode) {
                    return renderTree(item);
                } else if (item instanceof BinaryTreeNode) {
                    return renderBinaryTreeNode(item);
                } else if (item instanceof SinglyLinkedListNode) {
                    return renderLinkedListNode(item)
                } else if (item instanceof Map) {
                    return renderArray(Array.from(item))
                } else if (item instanceof Stack) {
                    return renderArray(item.toArray())
                } else if (item instanceof Array) {
                    return renderArray(item)
                } else {
                    // console.log('---item.constructor', item.constructor);
                    return renderObject(item);
                }
        }
    }

    // console.log('referenceData', referenceData)
    return <View>
        {
            referenceData
                ? renderReference(referenceData)
                : null
        }
        {
            data
                ? Object.keys(data).map(datumKey => {
                    const item = data[datumKey];
                    return <Card title={datumKey} key={datumKey}>
                        {
                            renderVariable(item)
                        }
                    </Card>
                })
                : null
        }
    </View>
}

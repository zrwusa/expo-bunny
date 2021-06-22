import * as React from "react";
import {useEffect, useRef} from "react";
import {Text, View} from "../UI";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {getStyles} from "./styles";
import {SinglyLinkedListNode, Stack, uuidV4} from "../../utils";
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

    const VividTree: React.FC<{ data: TreeNode<any> }> = ({data}) => {
        return (
            <VividTreeContainer>
                <VividTreeRecursive node={data} level={1} index={0} familyLength={1} parentX={0} parentY={0} maxDepth={data.getMaxDepth()}/>
            </VividTreeContainer>
        )
    }

    const VividBinaryTree = (node: BinaryTreeNode) => {
        return (
            <VividTreeContainer>
                {
                    <VividBinaryTreeRecursive node={node} level={1} index={0} familyLength={1}/>
                }
            </VividTreeContainer>
        )
    }

    const VividMatrix: React.FC<{ data: Array<Array<any>> }> = ({data}) => {
        return (
            <View style={{borderLeftWidth: wp(1), borderTopWidth: wp(1), borderColor: colors.border}}>
                {
                    data.map((row, i) => {
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

    const treePanelWidth = wp(2000);
    const treePanelHeight = wp(2000);
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
                    ? node.children.map((child, index, family) => <VividTreeRecursive key={child.id} node={child} level={level + 1} index={index}
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

    const VividBinaryTreeRecursive: React.FC<{ node: BinaryTreeNode, level: number, index: number, familyLength: number, parentX?: number, parentY?: number }> = ({node, level = 1, index = 0, familyLength = 1, parentX, parentY}) => {
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
                        ?
                        <VividBinaryTreeRecursive node={node.left} level={level + 1} index={0} familyLength={2} parentX={offsetX} parentY={offsetY}/>
                        : null
                }
                {
                    node.right
                        ?
                        <VividBinaryTreeRecursive node={node.right} level={level + 1} index={1} familyLength={2} parentX={offsetX} parentY={offsetY}/>
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

    const VividArray: React.FC<{ data: any[] }> = ({data}) => {
        return (
            <View>
                <Row>
                    {
                        data[0] instanceof Array
                            ? <VividMatrix data={data}/>
                            : data.map(item => {
                                switch (typeof item) {
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
    const VividBinaryTreeNode: React.FC<{ data: BinaryTreeNode }> = ({data}) => {
        return (
            <Row>
                <View style={styles.arrayItem} key={data.val}>
                    <Text>{data.val}</Text>
                </View>
            </Row>
        )
    }

    const renderVariable = (item: any) => {
        // bunnyConsole.log('item', item);
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

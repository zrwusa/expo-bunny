import * as React from "react";
import {Text, View} from "../UI";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {getStyles} from "./styles";
import {bunnyConsole, SinglyLinkedListNode, Stack, uuidV4} from "../../utils";
import {Card} from "../../containers/Card";
import {BinaryTreeNode, TreeNode} from "../../types";
import Svg, {Circle, G, Line, Text as SVGText} from "react-native-svg";
import {ScrollView} from "react-native";
import {useEffect, useRef} from "react";

export interface VividAlgorithmProps<T> {
    data: T,
    referenceData?: any,
    relatedKey?: string,
    isDebug?: boolean
}

export function VividAlgorithm<T extends { [key in string]: any }>(props: VividAlgorithmProps<T>) {
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
                }
            default:
                return null;
        }
    }

    const TreeContainer: React.FC = ({children}) => {
        const horizontalScrollView =  useRef<ScrollView>(null)
        useEffect(() => {
            horizontalScrollView?.current?.scrollTo({x:(treePanelWidth - wp(375))/2,y:0,animated:false})

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
                {
                    renderRecursive(node, 1, 0, 1, 0, 0, node.getMaxDepth())
                }
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
    const strokeWidth = wp(2);
    const levelOffset = wp(60);
    const circleR = wp(20);
    const nodeSpace = wp(40);
    const fontSize = wp(12);
    const fontOffsetY = fontSize / 3;
    let relatedNode: TreeNode<any> | undefined = undefined;
    let relatedBinaryNode: BinaryTreeNode | undefined = undefined;
    if (relatedKey) {
        relatedNode = data[relatedKey] as TreeNode<any> | undefined;
        relatedBinaryNode = data[relatedKey] as BinaryTreeNode | undefined;
    }
    const renderRecursive = (node: TreeNode<any>, level: number = 1, index: number = 0, familyLength: number = 1, parentX?: number, parentY?: number, maxDepth?: number): React.ReactNode => {
        if (!node) {
            return null;
        }
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
                    ? node.children.map((child, index, family) => renderRecursive(child, level + 1, index, family.length, offsetX, offsetY, maxDepth))
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

    const renderTreeVariable = (node: TreeNode<any>) => {
        return (
            <Row>
                <View style={styles.arrayItem} key={node.id}>
                    <Text>{node.id}</Text>
                    <Text>{node.value}</Text>
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
        bunnyConsole.log('item', item);
        if (!item) return null
        switch (typeof item) {
            case 'number':
                return renderNumber(item);
            case 'string':
                return renderString(item);
            case 'object':
                if (item instanceof TreeNode) {
                    return renderTree(item);
                } else if (item instanceof BinaryTreeNode) {
                    return renderBinaryTreeNode(item);
                } else if (item instanceof SinglyLinkedListNode) {
                    return renderLinkedListNode(item)
                } else if (item instanceof Map) {
                    return renderArray(Array.from(item))
                } else if (item instanceof Array) {
                    return renderArray(item)
                } else if (item instanceof Stack) {
                    return renderArray(item.toArray())
                } else {
                    console.log('---item.constructor', item.constructor);
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

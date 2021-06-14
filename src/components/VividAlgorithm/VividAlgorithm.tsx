import * as React from "react";
import {Text, View} from "../UI";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {getStyles} from "./styles";
import {SinglyLinkedListNode, Stack, uuidV4} from "../../utils";
import {Card} from "../../containers/Card";
import {TreeNode} from "../../types";
import Svg, {Circle, G, Line, Text as SVGText} from "react-native-svg";

export interface VividAlgorithmProps<T> {
    data: T,
    referenceData?: any,
    relatedKey?: string
}

export function VividAlgorithm<T extends { [key in string]: any }>(props: VividAlgorithmProps<T>) {
    const {data, referenceData, relatedKey} = props;
    const {sizeLabor, themeLabor, wp, colors} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);

    const renderNumber = (num: number) => {
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
                }
            default:
                return null;
        }
    }

    const renderTree = (node: TreeNode) => {
        return <Svg
            width={wp(375)}
            height={wp(375)}
        >
            <G fill={colors.background} strokeWidth={strokeWidth} stroke={colors.border}>
                {
                    renderRecursive(node, 1, 0, 1)
                }
            </G>
        </Svg>
    }
    const strokeWidth = wp(2);
    const screenWidth = wp(375);
    const levelOffset = wp(60);
    const circleR = wp(18);
    const nodeSpace = wp(700);
    const fontSize = wp(12);
    const fontOffsetY = fontSize / 3;
    let relatedNode: TreeNode | undefined = undefined;
    if (relatedKey) {
        relatedNode = data[relatedKey] as TreeNode | undefined;
    }
    const renderRecursive = (node: TreeNode, level: number = 1, index: number = 0, familyLength: number = 1, parentX?: number, parentY?: number): React.ReactNode => {
        if (!node) {
            return null;
        }
        let space = 0;
        let offsetX = 0;
        let offsetY = 0;
        let levelNodeSpace = nodeSpace / level / level
        if (level === 1) {
            space = screenWidth / 2
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
                    ? node.children.map((child, index, family) => renderRecursive(child, level + 1, index, family.length, offsetX, offsetY))
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
                >{node.name || node.id}</SVGText>
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

    const renderTreeNode = (obj: TreeNode) => {
        return (
            <Row>
                <View style={styles.arrayItem} key={obj.id}>
                    <Text>{obj.id}</Text>
                    <Text>{obj.value}</Text>
                </View>
            </Row>
        )
    }

    const renderVariable = (item: any) => {
        if (!item) return null
        switch (typeof item) {
            case 'number':
                return renderNumber(item)
            case 'object':
                if (item instanceof TreeNode) {
                    return renderTreeNode(item);
                } else if (item instanceof SinglyLinkedListNode) {
                    return renderLinkedListNode(item)
                } else if (item instanceof Map) {
                    return renderArray(Array.from(item))
                } else if (item instanceof Array) {
                    return renderArray(item)
                } else if (item instanceof Stack) {
                    return renderArray(item.items)
                } else {
                    return renderObject(item)
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

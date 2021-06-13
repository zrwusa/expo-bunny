import * as React from "react";
import {Text, View} from "../UI";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {getStyles} from "./styles";
import {SinglyLinkedListNode, Stack, uuidV4} from "../../utils";
import {Card} from "../../containers/Card";

export interface VividAlgorithmProps<T> {
    data: T
}

export function VividAlgorithm<T extends { [key in string]: any }>(props: VividAlgorithmProps<T>) {
    const {data} = props;
    const {sizeLabor, themeLabor} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);
    const renderNumber = (num: number) => {
        return (
            <Row>
                <Col size={6}><Text>{num}</Text></Col>
            </Row>
        )
    }

    const renderArray = (array: any[]) => {
        return (
            <Row>
                {
                    array.map(item => {
                        switch (typeof item) {
                            case 'object':
                                console.log('array')
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

    const renderVariable = (item: any) => {
        if (!item) return null
        switch (typeof item) {
            case 'number':
                return renderNumber(item)
            case 'object':
                if (item instanceof SinglyLinkedListNode) {
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

    console.log('data', data)
    return <View>
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

import {IcoMoon, Text, TextButton, View} from "../UI";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";
import * as React from "react";
import {useEffect, useState} from "react";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {getSharedStyles} from "../../helpers/shared-styles";
import {getStyles} from "./styles";
import {FlatList, KeyboardAvoidingView, SafeAreaView} from "react-native";
import {ModalFromRight} from "../../containers/ModalFromRight";
import {InlineSelector} from "../InlineSelector";
import {Searchbar} from "react-native-paper";
import {firebase} from "../../firebase/firebase";
import {FieldPath, WhereFilterOp} from '@firebase/firestore-types';
import {useIsMounted} from "../../hooks/is-mounted";

declare const ChildrenKey: unique symbol
// TODO key not in Omit
export type TreeNode = {
    name: string,
    code: string,
    type?: string,
    sort?: number | null,
    displayLevel?: number,
    category?: string,
} & { [key in string]?: TreeNode[] }

export type WhereArguments = [string | FieldPath, WhereFilterOp, any];

export type TreeNodePickerProps = {
    dataMode: 'local' | 'firestore',
    onDone?: (result?: TreeNode) => void,
    onCancel?: () => void,
    initialTreeNode?: TreeNode,
    titles: string[],
    childrenKeys?: string[],
    data?: TreeNode[],
    level?: number,
    collectionPaths?: string[],
    conditions?: WhereArguments [],
    condition?: WhereArguments,
    leafLevel?: number,
}

export const TreeNodePicker = (props: TreeNodePickerProps) => {
    const {sizeLabor, themeLabor, wp} = useBunnyKit();
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const isMounted = useIsMounted();
    const {
        dataMode = 'local',
        onDone,
        onCancel,
        titles = ['title0', 'title1', 'title2'],
        initialTreeNode,
        data = dataMode === 'local' ? [] as TreeNode[] : undefined,
        level = 0,
        childrenKeys = ['children', 'children', 'children'],
        collectionPaths = ['collection0', 'collection1'],
        conditions = dataMode === 'firestore' ? [['', '==', ''], ['category', '==', '$code']] : undefined,
        condition = dataMode === 'local' ? undefined : ['', '==', ''],
        leafLevel = 1,
    } = props;

    const [orgData, setOrgData] = useState(data)
    const [filterData, setFilterData] = useState(orgData)
    const [children, setChildren] = useState<TreeNode[] | undefined>(undefined)
    const childrenLevel = level + 1

    const _reset = () => {

    }

    const title = titles[level]
    const childrenKey = childrenKeys[level]
    const collectionPath = collectionPaths[level]

    const [childrenCondition, setChildrenCondition] = useState<WhereArguments>()
    useEffect(() => {
        (async () => {
            if (dataMode === 'firestore' && isMounted) {
                const collectionRef = firebase
                    .firestore()
                    .collection(collectionPath);
                let snapshot;
                if (JSON.stringify(condition) !== JSON.stringify(['', '==', ''])) {
                    snapshot = await collectionRef
                        .where(...condition as WhereArguments)
                        .get();
                } else {
                    snapshot = await collectionRef
                        .get();
                }
                let data: TreeNode[] = []
                snapshot.forEach((doc) => {
                    data.push(doc.data() as TreeNode)
                });
                setOrgData(data);
                setFilterData(data)
            }
        })()

    }, [])

    const treeNodePress = async (treeNode: TreeNode) => {
        // TODO when child selected,this should not be called
        switch (dataMode) {
            case 'local':
                if (treeNode?.[childrenKey]) {
                    setChildren(treeNode[childrenKey])
                    setIsShowTreeNodes(true)
                } else {
                    setChildren(undefined)
                    onDone?.(treeNode)
                }
                break;
            case 'firestore':
                const condition = conditions?.[childrenLevel]
                const $key = condition?.[2].split('$')[1]
                setChildrenCondition(['category', '==', treeNode[$key]])
                if (level === leafLevel) {
                    onDone?.(treeNode)
                } else {
                    setIsShowTreeNodes(true)
                }
                break;
        }
    }

    const [isShowTreeNodes, setIsShowTreeNodes] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const onChangeSearch = (searchQuery: string) => {
        setSearchQuery(searchQuery)
    }

    useEffect(() => {
        if (searchQuery) {
            const filterData = orgData?.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            setFilterData(filterData)
        } else {
            setFilterData(orgData)
        }
    }, [searchQuery])

    return <SafeAreaView style={[styles.container]}>
        <View style={styles.header}>
            <Row>
                <Col><TextButton onPress={() => {
                    onCancel?.()
                }}><IcoMoon name="x"/></TextButton></Col>
                <Col align="center"><Text>{title}</Text></Col>
                <Col align="flex-end"><TextButton onPress={_reset}>
                    <Text style={sharedStyles.text2}>Reset</Text>
                </TextButton>
                </Col>
            </Row>
        </View>
        <View style={styles.content}>
            <View style={{flex: 1, paddingVertical: wp(10)}}>
                <KeyboardAvoidingView
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                    behavior="padding" enabled
                    keyboardVerticalOffset={wp(100)}>

                    <FlatList
                        style={{flex: 1}}
                        data={filterData}
                        keyExtractor={item => item.code}
                        renderItem={({item}) => {
                            return <InlineSelector
                                textAlign="flex-start"
                                columns={[0, 9, 1]}
                                onPress={async () => {
                                    await treeNodePress(item)
                                }}
                                renderText={() => item.name}
                                isShowChevron={dataMode === 'local' ? !!item.children : level !== leafLevel}
                            />
                        }}
                    />
                    <Searchbar placeholder="Search"
                               onChangeText={onChangeSearch}
                               value={searchQuery}/>
                </KeyboardAvoidingView>
                {
                    (dataMode === 'local' && children) || (dataMode === 'firestore')
                        ? <ModalFromRight isVisible={isShowTreeNodes}
                                          onVisibleChanged={isVisible => {
                                              setIsShowTreeNodes(isVisible)
                                          }}>
                            <TreeNodePicker
                                dataMode={dataMode}
                                titles={titles}
                                collectionPaths={collectionPaths}
                                condition={childrenCondition}
                                data={dataMode === 'local' ? children : undefined}
                                onDone={(result) => {
                                    setIsShowTreeNodes(false);
                                    onDone?.(result)
                                }}
                                initialTreeNode={initialTreeNode}
                                onCancel={() => {
                                    setIsShowTreeNodes(false);
                                }}
                                level={childrenLevel}
                                leafLevel={leafLevel}
                            />
                        </ModalFromRight>
                        : null
                }

            </View>
        </View>
        {/*<View style={[styles.footer]}>*/}
        {/*    <ButtonTO onPress={() => {*/}
        {/*        onDone?.(treeNode)*/}
        {/*    }}><InButtonText>Done</InButtonText></ButtonTO>*/}
        {/*</View>*/}
    </SafeAreaView>
}

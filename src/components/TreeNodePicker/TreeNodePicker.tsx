import {ButtonTO, IcoMoon, InButtonText, Text, TextButton, View} from "../UI";
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
import {useKeyboardHeight} from "../../hooks/keyboard-height";
import {flex} from "styled-system";


export interface TreeNode {
    name: string,
    code: string,
    type?: string,
    sort?: number | null,
    displayLevel?: number,
    category?: string,
    children?: TreeNode[]
}

export interface TreeNodePickerProps {
    onDone?: (result?: TreeNode) => void,
    onCancel?: () => void,
    initialTreeNode?: TreeNode,
    title: string[],
    childrenKeys?: string[],
    data?: TreeNode[],
    level?: number,
    storedDataCollections?: string[]
}

export const TreeNodePicker = (props: TreeNodePickerProps) => {
    const {sizeLabor, themeLabor, wp, colors} = useBunnyKit();
    const {
        onDone,
        onCancel,
        title = ['title0', 'title1', 'title2'],
        initialTreeNode,
        data,
        level = 0,
        childrenKeys = ['children', 'children', 'children']
    } = props;
    const childrenLevel = level + 1
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const [treeNode, setTreeNode] = useState(initialTreeNode)
    const [orgData, setOrgData] = useState(data)
    const [filterData, setFilterData] = useState(orgData)
    const [children, setChildren] = useState<TreeNode[] | undefined>(undefined)
    const [levelData, setLevelData] = useState()
    const _reset = () => {

    }
    const currentTitle = title[level]

    const treeNodePress = (treeNode: TreeNode) => {
        if (treeNode?.children) {
            setChildren(treeNode.children)
            setIsShowTreeNodes(true)

        } else {
            setChildren(undefined)
            onDone?.(treeNode)
        }
    }

    const [isShowTreeNodes, setIsShowTreeNodes] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const onChangeSearch = (searchQuery: string) => {
        setSearchQuery(searchQuery)
    }

    useEffect(() => {
        if (searchQuery) {
            console.log('---orgData', orgData)
            const filterData = orgData?.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
            setFilterData(filterData)
            console.log(filterData)
        } else {
            setFilterData(orgData)
        }
    }, [searchQuery])

    const keyboardHeight = useKeyboardHeight()
    return <SafeAreaView style={[styles.container]}>
        <View style={styles.header}>
            <Row>
                <Col><TextButton onPress={() => {
                    onCancel?.()
                }}><IcoMoon name="x"/></TextButton></Col>
                <Col align="center"><Text>{currentTitle}</Text></Col>
                <Col align="flex-end"><TextButton onPress={_reset}><Text style={sharedStyles.text2}>Reset</Text></TextButton></Col>
            </Row>
        </View>
        <View style={styles.content}>
            <View style={{flex: 1, paddingVertical: wp(10)}}>
                <KeyboardAvoidingView style={{flex: 1, flexDirection: 'column', justifyContent: 'center',}} behavior="padding" enabled
                                      keyboardVerticalOffset={wp(100)}>

                    <FlatList
                        style={{flex: 1}}
                        data={filterData}
                        keyExtractor={item => item.code}
                        renderItem={({item}) => {
                            return <InlineSelector
                                textAlign="flex-start"
                                columns={[0, 9, 1]}
                                onPress={() => {
                                    treeNodePress(item)
                                }}
                                renderText={() => item.name}
                                isShowChevron={!!item.children}
                            />
                        }}
                    />

                    <Searchbar placeholder="Search"
                               onChangeText={onChangeSearch}
                               value={searchQuery}/>
                </KeyboardAvoidingView>

                {
                    children
                        ? <ModalFromRight isVisible={isShowTreeNodes}
                                          onVisibleChanged={isVisible => {
                                              setIsShowTreeNodes(isVisible)
                                          }}>
                            <TreeNodePicker
                                title={title}
                                data={children}
                                onDone={(result) => {
                                    setIsShowTreeNodes(false);
                                    onDone?.(result)
                                }}
                                onCancel={() => {
                                    setIsShowTreeNodes(false);
                                }}
                                level={childrenLevel}
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

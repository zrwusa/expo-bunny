import React, {useState} from "react";
import {Text, TextButton, TextInput, View} from "../../components/UI";
import {getStyles} from "./styles";
import {OrderType, TreeNode} from "../../types";
import {Card} from "../../containers/Card";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {
    BFS,
    binaryTreeInorderTraversal,
    BinaryTreeNode,
    DFS,
    isValidParenthesis,
    lengthOfLongestSubstring,
    reverseLinkedList,
    treeData,
    treeMaxDepth
} from "../../utils/algorithms";
import {VividAlgorithm} from "../../components/VividAlgorithm";
import {SinglyLinkedList} from "../../utils/data-structures";
import {ScrollView} from "react-native";

export function AlgorithmScreen() {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);

    const [binaryTreeInorderTraversalVariables, setBinaryTreeInorderTraversalVariables] = useState<{ [key in string]: BinaryTreeNode }>()
    const binaryTree: BinaryTreeNode = new BinaryTreeNode(1, null,
        new BinaryTreeNode(2, new BinaryTreeNode(3)));
    const _binaryTreeInorderTraversal = async () => {
        await binaryTreeInorderTraversal(binaryTree, ({value, key, DEFAULT}) => {
            console.log(key, value);
            setBinaryTreeInorderTraversalVariables(prevState => ({...prevState, [key!.toString()]: value}));
            return DEFAULT
        })
    }

    const [DFSVariables, setDFSVariables] = useState<{ [key in string]: TreeNode }>()

    const handleDFS = async (type: OrderType) => {
        await DFS(treeData, type, ({value, key, DEFAULT}) => {
            // console.log(key, value);
            setDFSVariables(prevState => ({...prevState, [key!.toString()]: value}));
            return DEFAULT
        })
    }

    const [BFSVariables, setBFSVariables] = useState<{ [key in string]: TreeNode }>()
    const handleBFS = async () => {
        console.log(await BFS(treeData, ({value, key, DEFAULT}) => {
            console.log(key, value);
            setBFSVariables(prevState => ({...prevState, [key!.toString()]: value}));
            return DEFAULT
        }))
    }

    const [parenthesisInput, setParenthesisInput] = useState('')
    const [parenthesisVariables, setParenthesisVariables] = useState<{ [key in string]: unknown }>()
    const _parenthesisInput = async () => {
        const result = await isValidParenthesis(parenthesisInput, ({trapName, value, key, DEFAULT}) => {
            console.log(key, value);
            setParenthesisVariables(prevState => ({...prevState, [key!.toString()]: value}));
            return DEFAULT
        });
        console.log('result', result);
    }

    const [lengthOfLongestSubstringValue, setLengthOfLongestSubstringValue] = useState('')
    const [lengthOfLongestSubstringVariables, setLengthOfLongestSubstringVariables] = useState<{ [key in string]: unknown }>()
    const _lengthOfLongestSubstring = async () => {
        const result = await lengthOfLongestSubstring(lengthOfLongestSubstringValue, ({value, key, DEFAULT}) => {
            console.log(key, value);
            setLengthOfLongestSubstringVariables(prevState => ({...prevState, [key!.toString()]: value}));
            return DEFAULT
        });
        console.log('result', result);
    }

    const linkedList = SinglyLinkedList.from([1, 2, 3, 4, 5, 6]);
    const [reverseLinkedListVariables, setReverseLinkedListVariables] = useState<{ [key in string]: unknown }>()

    const _reverseLinkedList = async () => {
        const result = await reverseLinkedList(linkedList.head, ({value, key, DEFAULT}) => {
            console.log(key, value);
            setReverseLinkedListVariables(prevState => ({...prevState, [key!.toString()]: value}));
            return DEFAULT
        });
        console.log(result)
    }

    return (
        <ScrollView>
            <View style={{flex: 1}}>
                <View style={styles.container}>
                    <Card title="Algorithms" titleMode="OUT">

                        <TextButton onPress={() => _binaryTreeInorderTraversal()}>
                            <Text>Binary Tree Inorder Traversal</Text>
                        </TextButton>
                        <TextButton onPress={() => handleDFS('PreOrder')}>
                            <Text>DFS PreOrder</Text>
                        </TextButton>
                        <TextButton onPress={() => handleDFS('InOrder')}>
                            <Text>DFS InOrder</Text>
                        </TextButton>
                        <TextButton onPress={() => handleDFS('PostOrder')}>
                            <Text>DFS PostOrder</Text>
                        </TextButton>
                        <TextButton onPress={() => handleBFS()}>
                            <Text>BFS</Text>
                        </TextButton>
                        <TextInput value={parenthesisInput} onChangeText={setParenthesisInput}/>
                        <TextButton onPress={_parenthesisInput}>
                            <Text>Parenthesis Check</Text>
                        </TextButton>
                        <TextInput value={lengthOfLongestSubstringValue} onChangeText={setLengthOfLongestSubstringValue}/>
                        <TextButton onPress={_lengthOfLongestSubstring}>
                            <Text>Length Of Longest Substring</Text>
                        </TextButton>
                        <TextButton onPress={_reverseLinkedList}>
                            <Text>Reverse Linked List</Text>
                        </TextButton>


                        <TextButton onPress={() => {
                            console.log(treeMaxDepth(treeData))
                        }}>
                            <Text>Max depth</Text>
                        </TextButton>
                    </Card>
                    {
                        binaryTreeInorderTraversalVariables
                            ? <VividAlgorithm data={binaryTreeInorderTraversalVariables} referenceData={binaryTree} relatedKey="node"/>
                            : null
                    }
                    {
                        DFSVariables
                            ? <VividAlgorithm data={DFSVariables} referenceData={treeData} relatedKey="nodeNeedPrint"/>
                            : null
                    }
                    {
                        BFSVariables
                            ? <VividAlgorithm data={BFSVariables} referenceData={treeData} relatedKey="node"/>
                            : null
                    }
                    {
                        lengthOfLongestSubstringVariables
                            ? <VividAlgorithm data={lengthOfLongestSubstringVariables}/>
                            : null
                    }
                    {
                        parenthesisVariables
                            ? <VividAlgorithm data={parenthesisVariables}/>
                            : null
                    }
                    {
                        reverseLinkedListVariables
                            ? <VividAlgorithm data={reverseLinkedListVariables}/>
                            : null
                    }
                </View>

            </View>

        </ScrollView>
    )
}




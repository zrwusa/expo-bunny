import React, {useState} from "react";
import {Text, TextButton, TextInput, View} from "../../components/UI";
import {getStyles} from "./styles";
import {OrderType, TreeNode} from "../../types";
import {Card} from "../../containers/Card";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {
    BFS,
    binaryTreeInorderTraversal,
    countSmallerBST,
    countSmallerCase1,
    cutOffTree,
    cutOffTreeCase8,
    DFS,
    isValidParenthesis,
    ladderLengthCase1,
    ladderLengthDFS,
    lengthOfLongestSubstring,
    letterCombinations,
    networkDelayTime,
    networkDelayTimeCase3,
    reverseLinkedList,
    testAVLTree,
    testBinaryTree,
    testBST,
    testBSTCase1,
    testBSTCase3,
    testGraphs,
    treeData,
    treeMaxDepth
} from "../../utils/algorithms";
import {VividAlgorithm} from "../../components/VividAlgorithm";
import {BinaryTree, BinaryTreeNode, SinglyLinkedList} from "../../utils/data-structures";
import {ScrollView} from "react-native";

export function AlgorithmScreen() {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);

    const [binaryTreeInorderTraversalVariables, setBinaryTreeInorderTraversalVariables] = useState<{ [key in string]: BinaryTreeNode<any> }>()
    const binaryTreeNode1 = new BinaryTreeNode<number>(1);
    const binaryTree = new BinaryTree<number>(binaryTreeNode1);
    // binaryTree.insert(3);
    // binaryTree.insert(3);
    // binaryTree.insert(2);

    const _binaryTreeInorderTraversal = async () => {
        await binaryTreeInorderTraversal(binaryTree.root!, ({value, key, DEFAULT}) => {
            console.log(key, value);
            setBinaryTreeInorderTraversalVariables(prevState => ({...prevState, [key!.toString()]: value}));
            return DEFAULT
        })
    }

    const [DFSVariables, setDFSVariables] = useState<{ [key in string]: TreeNode<number> }>()

    const handleDFS = async (type: OrderType) => {
        await DFS(treeData, type, ({value, key, DEFAULT}) => {
            // console.log(key, value);
            setDFSVariables(prevState => ({...prevState, [key!.toString()]: value}));
            return DEFAULT
        })
    }

    const [BFSVariables, setBFSVariables] = useState<{ [key in string]: TreeNode<number> }>()
    const handleBFS = async () => {
        console.log(await BFS(treeData, ({value, key, DEFAULT}) => {
            console.log(key, value);
            setBFSVariables(prevState => ({...prevState, [key!.toString()]: value}));
            return DEFAULT
        }))
    }

    const [letterCombinationsVariables, setLetterCombinationsVariables] = useState<{ [key in string]: string }>()
    const _letterCombinations = async () => {
        console.log(await letterCombinations('29', ({value, key, DEFAULT}) => {
            console.log(key, value);
            setLetterCombinationsVariables(prevState => ({...prevState, [key!.toString()]: value}));
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


    const [ladderLengthVariables, setLadderLengthVariables] = useState<{ [key in string]: unknown }>()


    const _ladderLength = async () => {
        const result = await ladderLengthDFS(...ladderLengthCase1,
            ({value, key, DEFAULT}) => {
                console.log(key, value);
                setLadderLengthVariables(prevState => ({...prevState, [key!.toString()]: value}));
                return DEFAULT
            });
        console.log(result)
    }

    const [cutOffTreeVariables, setCutOffTreeVariables] = useState<{ [key in string]: unknown }>()
    const _cutOffTree = async () => {
        const result = await cutOffTree(...cutOffTreeCase8,
            ({value, key, DEFAULT}) => {
                console.log(key, value);
                setCutOffTreeVariables(prevState => ({...prevState, [key!.toString()]: value}));
                return DEFAULT
            });
        console.log(result)
    }

    const [countSmallerVariables, setCountSmallerVariables] = useState<{ [key in string]: unknown }>()
    const _countSmallerBST = async () => {
        const result = await countSmallerBST(...countSmallerCase1,
            ({value, key, DEFAULT}) => {
                // console.log(key, value);
                setCountSmallerVariables(prevState => ({...prevState, [key!.toString()]: value}));
                return DEFAULT
            }
        )
    }

    const [testBinaryTreeVariables, setTestBinaryTreeVariables] = useState<{ [key in string]: unknown }>()
    const _testBinaryTree = async () => {
        const result = await testBinaryTree(...testBSTCase3,
            ({value, key, DEFAULT}) => {
                // console.log(key, value);
                setTestBinaryTreeVariables(prevState => ({...prevState, [key!.toString()]: value}));
                return DEFAULT
            }
        )
    }

    const [testBSTVariables, setGenBSTVariables] = useState<{ [key in string]: unknown }>()
    const _testBST = async () => {
        const result = await testBST(...testBSTCase1,
            ({value, key, DEFAULT}) => {
                // console.log(key, value);
                setGenBSTVariables(prevState => ({...prevState, [key!.toString()]: value}));
                return DEFAULT
            }
        )
    }

    const [testAVLVariables, setGenAVLVariables] = useState<{ [key in string]: unknown }>()
    const _testAVL = async () => {
        const result = await testAVLTree(...testBSTCase1,
            ({value, key, DEFAULT}) => {
                // console.log(key, value);
                setGenAVLVariables(prevState => ({...prevState, [key!.toString()]: value}));
                return DEFAULT
            }
        )
    }

    const [testGraphVars, setTestGraphVars] = useState<{ [key in string]: unknown }>()
    const _testGraphs = async () => {
        await testGraphs(({value, key, DEFAULT}) => {
            // console.log(key, value);
            setTestGraphVars(prevState => ({...prevState, [key!.toString()]: value}));
            return DEFAULT;
        });
    }

    const [netWorkDelayTimeVars, setNetWorkDelayTimeVars] = useState<{ [key in string]: unknown }>()
    const _netWorkDelayTime = async () => {
        await networkDelayTime(...networkDelayTimeCase3, ({value, key, DEFAULT}) => {
            // console.log(key, value);
            setNetWorkDelayTimeVars(prevState => ({...prevState, [key!.toString()]: value}));
            return DEFAULT;
        });
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
                        <TextButton onPress={() => _letterCombinations()}>
                            <Text>Letter Combinations</Text>
                        </TextButton>
                        <TextInput value={parenthesisInput} onChangeText={setParenthesisInput}/>
                        <TextButton onPress={_parenthesisInput}>
                            <Text>Parenthesis Check</Text>
                        </TextButton>
                        <TextInput value={lengthOfLongestSubstringValue}
                                   onChangeText={setLengthOfLongestSubstringValue}/>
                        <TextButton onPress={_lengthOfLongestSubstring}>
                            <Text>Length Of Longest Substring</Text>
                        </TextButton>
                        <TextButton onPress={_reverseLinkedList}>
                            <Text>Reverse Linked List</Text>
                        </TextButton>
                        <TextButton onPress={_ladderLength}>
                            <Text>Ladder Length</Text>
                        </TextButton>
                        <TextButton onPress={() => {
                            console.log(treeMaxDepth(treeData))
                        }}>
                            <Text>Max Depth</Text>
                        </TextButton>
                        <TextButton onPress={_cutOffTree}>
                            <Text>Cut Off Tree For Golf Event</Text>
                        </TextButton>
                        <TextButton onPress={_countSmallerBST}>
                            <Text>Count Smaller BST</Text>
                        </TextButton>
                        <TextButton onPress={_testBinaryTree}>
                            <Text>Test BinaryTree</Text>
                        </TextButton>
                        <TextButton onPress={_testBST}>
                            <Text>Test BST</Text>
                        </TextButton>
                        <TextButton onPress={_testAVL}>
                            <Text>Test AVL</Text>
                        </TextButton>
                        <TextButton onPress={_testGraphs}>
                            <Text>Test Graphs</Text>
                        </TextButton>
                        <TextButton onPress={_netWorkDelayTime}>
                            <Text>Network Delay Time</Text>
                        </TextButton>
                    </Card>
                    {
                        binaryTreeInorderTraversalVariables
                            ? <VividAlgorithm data={binaryTreeInorderTraversalVariables}
                                              referenceData={binaryTree.root} relatedNodeKey="node"/>
                            : null
                    }
                    {
                        DFSVariables
                            ? <VividAlgorithm data={DFSVariables} referenceData={treeData}
                                              relatedNodeKey="nodeNeedPrint"/>
                            : null
                    }
                    {
                        letterCombinationsVariables
                            ? <VividAlgorithm data={letterCombinationsVariables}/>
                            : null
                    }
                    {
                        BFSVariables
                            ? <VividAlgorithm data={BFSVariables} referenceData={treeData}
                                              relatedNodeKey="node"/>
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
                    {
                        ladderLengthVariables
                            ? <VividAlgorithm data={ladderLengthVariables}/>
                            : null
                    }
                    {
                        cutOffTreeVariables
                            ? <VividAlgorithm data={cutOffTreeVariables} relatedNodeKey="cur"
                                              referenceData={cutOffTreeCase8[0]}
                                              relatedRouteKey="route"/>
                            : null
                    }
                    {
                        countSmallerVariables
                            ? <VividAlgorithm data={countSmallerVariables}/>
                            : null
                    }
                    {
                        testBinaryTreeVariables
                            ? <VividAlgorithm data={testBinaryTreeVariables}/>
                            : null
                    }
                    {
                        testBSTVariables
                            ? <VividAlgorithm data={testBSTVariables}/>
                            : null
                    }
                    {
                        testAVLVariables
                            ? <VividAlgorithm data={testAVLVariables}/>
                            : null
                    }
                    {
                        testGraphVars
                            ? <VividAlgorithm data={testGraphVars}/>
                            : null
                    }
                    {
                        netWorkDelayTimeVars
                            ? <VividAlgorithm data={netWorkDelayTimeVars}/>
                            : null
                    }
                </View>
            </View>
        </ScrollView>
    )
}




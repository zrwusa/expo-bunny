import React, {useState} from "react";
import {Text, TextButton, TextInput, View} from "../../components/UI";
import {getStyles} from "./styles";
import {OrderType} from "../../types";
import {Card} from "../../containers/Card";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {BFS, DFS, isValidParenthesis, lengthOfLongestSubstring, treeData, treeMaxDepth} from "../../utils/algorithms";
import {VividAlgorithm} from "../../components/VividAlgorithm";

export function AlgorithmScreen() {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);

    const handleDFS = (type: OrderType) => {
        DFS(treeData, type)
    }

    const handleBFS = () => {
        console.log(BFS(treeData))
    }

    const [parenthesisInput, setParenthesisInput] = useState('')
    const [parenthesisVariables, setParenthesisVariables] = useState<{ [key in string]: unknown }>()
    const _parenthesisInput = async () => {
        const result = await isValidParenthesis(parenthesisInput, ({trapName, value, key, DEFAULT}) => {
            setParenthesisVariables(prevState => ({...prevState, [key!.toString()]: value}))
            return DEFAULT
        });
        console.log(result);
    }

    const [lengthOfLongestSubstringValue, setLengthOfLongestSubstringValue] = useState('')
    const [lengthOfLongestSubstringVariables, setLengthOfLongestSubstringVariables] = useState<{ [key in string]: unknown }>()
    const _lengthOfLongestSubstring = async () => {
        const result = await lengthOfLongestSubstring(lengthOfLongestSubstringValue, ({value, key, DEFAULT}) => {
            console.log(value)
            setLengthOfLongestSubstringVariables(prevState => ({...prevState, [key!.toString()]: value}))
            return DEFAULT
        });
        console.log(result);
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Card title="Algorithms" titleMode="OUT">
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
                    <TextButton onPress={() => {
                        console.log(treeMaxDepth(treeData))
                    }}>
                        <Text>Max depth</Text>
                    </TextButton>
                </Card>
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
            </View>

        </View>
    )
}




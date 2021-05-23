import React, {useEffect, useMemo, useState} from "react";
import {InButtonText, LinearGradientButton, SwitchP, Text, TextInput, View} from "../../components/UI";
import {useDispatch, useSelector} from "react-redux";
import {saveDemoSagaFirebaseTodo} from "../../store/actions";
import {RootState} from "../../types";
import {getSharedStyles} from "../../helpers/shared-styles";
import {Col, getContainerStyles, Row} from "../../containers";
import {useFirebaseConnect} from "react-redux-firebase";
import {getStyles} from "./styles";
import {randomText} from "../../utils";
import {FlatList} from "react-native";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {useBunnyKit} from "../../hooks/bunny-kit";


export function DemoSagaFirebaseScreen() {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const dispatch = useDispatch();
    useFirebaseConnect([{path: 'todoList', queryParams: ['limitToLast=100']}])
    const todoList = useSelector((rootState: RootState) => rootState.firebaseState.ordered.todoList)
    const st = shortenTFunctionKey(t, 'screens.DemoSagaFirebase')
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor)
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const [text, setText] = useState(`text-${randomText(3)}`);
    const [done, setDone] = useState(Math.random() > 0.5);

    const memorizedTodo = useMemo(() => {
        if (todoList && todoList.length > 0) {
            return todoList.reverse()
        } else {
            return []
        }
    }, [todoList && todoList.length])
    useEffect(() => {
        // async function storeHighScore(userId: string, score: number) {
        //     await firebase
        //         .database()
        //         .ref('users/' + userId)
        //         .set({
        //             highscore: score,
        //         });
        // }
        //
        // storeHighScore('001', 200)
        //     .then()
    })
    return (
        <View style={[containerStyles.Screen, sharedStyles.centralizeHorizontal]}>
            <View style={styles.todoContainer}>
                <Row paddingVertical="l">
                    <Col>
                        <TextInput value={text} onChangeText={(value) => {
                            setText(value)
                        }}/>
                    </Col>
                    <Col align="flex-end">
                        <SwitchP value={done} onValueChange={(value) => {
                            setDone(value)
                        }}/>
                    </Col>
                </Row>


                <LinearGradientButton onPress={() => {
                    dispatch(saveDemoSagaFirebaseTodo({
                        text,
                        done
                    }))
                }}>
                    <InButtonText>{st('saveDemoSagaFirebaseTodo')}</InButtonText>
                </LinearGradientButton>
                <View style={styles.table}>
                    <View>
                        <Row paddingVertical="l">
                            <Col>
                                <Text>Text</Text>
                            </Col>
                            <Col align="flex-end">
                                <Text>Done</Text>
                            </Col>
                        </Row>
                    </View>
                    {
                        memorizedTodo && memorizedTodo.length > 0
                            ? <FlatList
                                style={styles.flatList}
                                data={todoList}
                                renderItem={({item}) => {

                                    return <View key={item.key}>
                                        <Row paddingVertical="l">
                                            <Col>
                                                <Text>{item.value.text}</Text>
                                            </Col>
                                            <Col align="flex-end">
                                                <Text>{item.value.done.toString()}</Text>
                                            </Col>
                                        </Row>
                                    </View>
                                }}
                            />
                            : null
                    }
                </View>
            </View>
        </View>
    )
}


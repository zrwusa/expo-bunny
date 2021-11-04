// import React, {Component} from "react";
// import {Text, View} from "../../components/UI";
// import {connect} from "react-redux";
// import {DBSchema, RootState} from "../../types";
// import {Col, Row} from "../../containers";
// import {WithSizeLabor} from "../../providers/size-labor";
// import {WithThemeLabor} from "../../providers/theme-labor";
// import {FlatList} from "react-native";
// import {compose} from 'redux'
// import {firebaseConnect, UserProfile, WithFirebaseProps, withFirestore, WithFirestoreProps} from 'react-redux-firebase'
// import {randomText} from "../../utils";
//
// export interface DemoSagaFirebaseInnerProps extends WithSizeLabor, WithThemeLabor,WithFirestoreProps {
//
// }
// type DemoSagaFirebaseCCState = {
//     text: string,
//     done: boolean
// }
//
// export class DemoSagaFirebaseScreenInner extends Component<DemoSagaFirebaseInnerProps, DemoSagaFirebaseCCState> {
//     constructor(props: DemoSagaFirebaseInnerProps) {
//         super(props)
//         this.state = {
//             text: `text-${randomText(3)}`,
//             done: Math.random() > 0.5
//         }
//     }
//
//     render() {
//         const {todoList} = this.props;
//         const {text, done} = this.state;
//         return (
//             todoList && todoList.length > 0
//                 ? <FlatList
//                     data={todoList}
//                     renderItem={({item}) => {
//
//                         return <View key={item.key}>
//                             <Row paddingVertical="l">
//                                 <Col>
//                                     <Text>{item.value.text}</Text>
//                                 </Col>
//                                 <Col align="flex-end">
//                                     <Text>{item.value.done.toString()}</Text>
//                                 </Col>
//                             </Row>
//                         </View>
//                     }}
//                 />
//                 : null
//         )
//     }
// }
//
// const enhance = compose(
//     firebaseConnect([
//         'todoList'
//     ]),
//     connect((rootState: RootState) => ({
//         todoList: rootState.firebaseState.ordered.todoList
//     }))
// )
// export const DemoSagaFirebaseScreen = enhance(DemoSagaFirebaseScreenInner)
//
//
//
// // export class DemoSagaFirebaseScreenInner extends Component<DemoSagaFirebaseInnerProps, DemoSagaFirebaseCCState> {
// //     constructor(props: DemoSagaFirebaseInnerProps) {
// //         super(props)
// //         this.state = {
// //             text: `text-${randomText(3)}`,
// //             done: Math.random() > 0.5
// //         }
// //     }
// //
// //     handleTextChange = (value: string) => {
// //         this.setState({
// //             ...this.state,
// //             text: value
// //         })
// //     }
// //
// //     handleDoneChange = (value: boolean) => {
// //         this.setState({
// //             ...this.state,
// //             done: value
// //         })
// //     }
// //
// //     render() {
// //         const {sizeLabor, themeLabor, todoList} = this.props;
// //         const {text, done} = this.state;
// //         console.log('---todoList', todoList)
// //         const {theme} = themeLabor;
// //         const {designsBasedOn} = sizeLabor;
// //         const containerStyles = getContainerStyles(sizeLabor, themeLabor);
// //         const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
// //         const styles = getStyles(sizeLabor, themeLabor);
// //         const {wp} = designsBasedOn.iphoneX;
// //         const {width} = getCardSize(sizeLabor, themeLabor);
// //         return (
// //
// //             <View style={[containerStyles.Screen, sharedStyles.centralizeHorizontal]}>
// //                 <View style={styles.todoContainer}>
// //                     <Row paddingVertical="l">
// //                         <Col>
// //                             <TextInput value={text} onChangeText={this.handleTextChange}/>
// //                         </Col>
// //                         <Col align="flex-end">
// //                             <SwitchP value={done} onValueChange={this.handleDoneChange}/>
// //                         </Col>
// //                     </Row>
// //
// //
// //                     <LinearGradientButton onPress={() => {
// //                         // dispatch(saveDemoSagaFirebaseTodo({
// //                         //     text,
// //                         //     done
// //                         // }))
// //                     }}>
// //                         {/*<InButtonText>{st('saveDemoSagaFirebaseTodo')}</InButtonText>*/}
// //                         <InButtonText>xxx</InButtonText>
// //                     </LinearGradientButton>
// //                     <View style={styles.table}>
// //                         <View>
// //                             <Row paddingVertical="l">
// //                                 <Col>
// //                                     <Text>Text</Text>
// //                                 </Col>
// //                                 <Col align="flex-end">
// //                                     <Text>Done</Text>
// //                                 </Col>
// //                             </Row>
// //                         </View>
// //                         {
// //                             todoList && todoList.length > 0
// //                                 ? <FlatList
// //                                     style={styles.flatList}
// //                                     data={todoList}
// //                                     renderItem={({item}) => {
// //
// //                                         return <View key={item.key}>
// //                                             <Row paddingVertical="l">
// //                                                 <Col>
// //                                                     <Text>{item.value.text}</Text>
// //                                                 </Col>
// //                                                 <Col align="flex-end">
// //                                                     <Text>{item.value.done.toString()}</Text>
// //                                                 </Col>
// //                                             </Row>
// //                                         </View>
// //                                     }}
// //                                 />
// //                                 : null
// //                         }
// //                     </View>
// //                 </View>
// //             </View>
// //
// //         )
// //     }
// // }
// // export const DemoSagaFirebaseScreen = enhance(withSizeLabor(withThemeLabor(DemoSagaFirebaseScreenInner)))
export {};

import React, {useCallback, useEffect, useMemo, useState} from "react"
import {GiftedChat, IMessage} from "../../../../packages/react-native-gifted-chat/src"
import {RouteProp} from "@react-navigation/native";
import {DemoChatStackParam, IMMessage, IMMessageType, RootState} from "../../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {useFirebase, useFirebaseConnect} from "react-redux-firebase";
import {extractValue, uuidV4} from "../../../utils";
import {useAuthLabor} from "../../../providers/auth-labor";
import {Keyboard, SafeAreaView, TouchableOpacity} from "react-native";
import {AudioRecorder, ImageUploader, StickerPicker} from "../../../components";
import {IcoMoon} from "../../../components/UI";
import {useSizeLabor} from "../../../providers/size-labor";


type ChatRoomRouteProp = RouteProp<DemoChatStackParam, 'ChatRoom'>;
type ChatRoomNavigationProp = StackNavigationProp<DemoChatStackParam, 'ChatRoom'>;

export interface ChatRoomProps {
    route: ChatRoomRouteProp,
    navigation: ChatRoomNavigationProp
}

export type Sticker = {
    url: string,
    id: string
}

export function ChatRoomScreen({route, navigation}: ChatRoomProps) {
    const authLabor = useAuthLabor()
    const {authResult} = authLabor;
    const {user} = authResult
    const {roomKey} = route.params
    const initialMessages: IMessage[] = [];
    const {designsBasedOn} = useSizeLabor()
    const {wp} = designsBasedOn.iphoneX

    const [messages, setMessages] = useState(initialMessages);

    useFirebaseConnect([{type: 'value', path: `chatMessages`, queryParams: ['orderByChild=createdAt', 'limitToLast=1000']}])

    const chatMessages = useSelector((rootState: RootState) => rootState.firebaseState.ordered.chatMessages)
    const firebase = useFirebase()

    const memoizedUser = useMemo(() => {
        if (!user) {
            return {_id: 'defaultId', avatar: '', name: 'defaultName'}
        }
        const {firebaseUser} = user
        if (firebaseUser) {
            return {_id: firebaseUser.uid || 'defaultId', avatar: firebaseUser.photoURL || '', name: firebaseUser.displayName || 'defaultName'}
        }

    }, [user])

    useEffect(() => {
        let gcMessages: IMessage[] = []
        if (roomKey) {
            const xxx = extractValue<IMMessage>(chatMessages)
                .filter(item => item.roomKey === roomKey).reverse()
            gcMessages = xxx.map((node) => {
                let message: IMessage = {
                    _id: node._id,
                    createdAt: node.createdAt,
                    user: {
                        _id: node.user._id,
                        name: node.user.name,
                        avatar: node.user.avatar
                    },
                    text: node.text,
                    image: node.image,
                    sticker: node.sticker,
                    audio: node.audio,
                    video: node.video,
                    received: node.received,
                    pending: node.pending,
                    sent: node.sent,
                };
                return message;
            })
        } else {
            return
        }
        setMessages(gcMessages)
    }, [JSON.stringify(chatMessages)])

    const _handleSend = useCallback(async (messages = []) => {
        const msg = _genMessage('MESSAGE', messages[0].text)
        await _sendMsg(msg)
    }, [])

    const _sendMsg = async (msg: IMessage) => {
        await firebase.database().ref(`chatMessages/${msg._id}`).set(msg)
        await _sentSuccess(msg)
    }

    const _sentSuccess = async (msg: IMessage) => {
        await firebase.database().ref(`chatMessages/${msg._id}`).update({sent: true, pending: false})
    }

    const _receivedMsg = async (msg: IMessage) => {
        if ((memoizedUser && memoizedUser._id) !== msg?.user._id) {
            firebase.database().ref(`chatMessages/${msg._id}`).update({received: true})
        }
    }

    const _genMessage = (type: IMMessageType, payload?: string, needMerge?: IMMessage) => {
        let text = '', image = '', audio = '', video = '', sticker = '';
        switch (type) {
            case "IMAGE":
                image = payload || '';
                break;
            case "AUDIO":
                audio = payload || '';
                break;
            case "STICKER_GIF":
                sticker = payload || '';
                break;
            case "MESSAGE":
                text = payload || '';
                break;
            case "VIDEO":
                video = payload || '';
                break;
            default:
                break
        }
        return {
            _id: uuidV4(),
            createdAt: firebase.database.ServerValue.TIMESTAMP as number,
            roomKey,
            type: type,
            user: memoizedUser,
            text,
            image,
            sticker,
            audio,
            video,
            received: false,
            pending: true,
            sent: false,
            ...needMerge,
        } as IMMessage
    }


    const [isShowAudioButton, setIsShowAudioButton] = useState(true)
    const [isShowStickerPicker, setIsShowStickerPicker] = useState(false)

    const chatAssetsPath = `/chatAssets/${memoizedUser?._id}`
    return (
        <SafeAreaView style={{flex: 1}}>
            <GiftedChat
                alwaysShowSend
                showUserAvatar
                showAvatarForEveryMessage
                messages={messages}
                onSend={messages => _handleSend(messages)}
                user={memoizedUser}

                textInputProps={{
                    onFocus: () => {
                        setIsShowStickerPicker(false)
                    }
                }}
                onInputTextChanged={(text: string) => {
                    setIsShowAudioButton(!text)
                }}


                // imageStyle={{backgroundColor: 'red'}}
                // stickerStyle={{margin: 10, backgroundColor: 'green'}}
                // stickerProps={{
                //     onLoad: () => {
                //         console.log('onload here sticker')
                //     }
                // }}
                // videoStyle={{margin: 10, backgroundColor: 'purple'}}
                // videoProps={{
                //     onLoad: () => {
                //         console.log('onload here video')
                //     }
                // }}
                // audioStyle={{margin: 10, backgroundColor: 'blue'}}
                // audioProps={{
                //     onLoad: () => {
                //         console.log('onload here audio')
                //     }
                // }}
                // renderMessageText={(props) => {
                //     const {currentMessage} = props
                //     return <View>
                //         {
                //             currentMessage?.text
                //                 ? <Text onLayout={async () => {
                //                     await _receivedMsg(currentMessage)
                //                 }}>{currentMessage?.text}</Text>
                //                 : null
                //         }
                //     </View>
                // }}

                // renderMessageImage={(props) => {
                //     const {currentMessage} = props
                //     return <View>
                //         {
                //             currentMessage?.image
                //                 ? <Image onLoad={async () => {
                //                     await _receivedMsg(currentMessage)
                //                 }} style={{width: wp(100), height: wp(100)}} source={{uri: currentMessage.image}}/>
                //                 : null
                //         }
                //     </View>
                // }}

                // renderMessageSticker={(props) => {
                //     const {currentMessage} = props
                //     return <View>
                //         {
                //             currentMessage?.sticker
                //                 ? <Image onLoad={async () => {
                //                     await _receivedMsg(currentMessage)
                //                 }} onLoadStart={()=>{}}
                //                          onLoadEnd={()=>{}} style={{width: wp(100), height: wp(100)}} source={{uri: currentMessage.sticker}}/>
                //                 : null
                //         }
                //     </View>
                // }}
                onMessageLoad={(currentMessage) => {
                    // console.log('---onMessageLoad',currentMessage)
                }}
                onMessageLoadStart={(currentMessage) => {
                    // console.log('---onMessageLoadStart',currentMessage)
                }}
                onMessageLoadEnd={async (currentMessage) => {
                    // console.log('---onMessageLoadEnd',currentMessage)
                }}
                onMessageReadyForDisplay={async (currentMessage) => {
                    // console.log('---onMessageReadyForDisplay',currentMessage)
                    await _receivedMsg(currentMessage)
                }}
                onMessageLoadError={(e, currentMessage) => {
                    // console.log('---onMessageLoadError',currentMessage)
                }}

                // renderMessageAudio={(props) => {
                //     const {currentMessage} = props
                //     // const debugSource = {uri: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_2MG.mp3'}
                //     return <View>
                //         {
                //             currentMessage?.audio
                //                 ? <AudioPlayer
                //                     source={{uri: currentMessage.audio}}
                //                     onLoaded={async () => {
                //                         await _receivedMsg(currentMessage)
                //                     }}
                //                 />
                //                 : null
                //         }
                //     </View>
                // }}
                // renderMessageVideo={(props) => {
                //     const {currentMessage} = props
                //     // const debugSource = {uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}
                //     return <View>
                //         {
                //             currentMessage && currentMessage.video
                //                 ?
                //                 <Video
                //                     style={{width: wp(240), height: wp(370)}}
                //                     useNativeControls
                //                     resizeMode="contain"
                //                     onLoad={async () => {
                //                         await _receivedMsg(currentMessage)
                //                     }}
                //                     source={{uri: currentMessage.video}}
                //                     // source={debugSource}
                //                 />
                //                 : null
                //         }
                //     </View>
                // }}
                renderActions={() => {
                    return <>
                        <TouchableOpacity onPress={() => {
                            Keyboard.dismiss()
                            setIsShowStickerPicker(!isShowStickerPicker)
                        }}>
                            <IcoMoon name="chat4" style={{paddingBottom: wp(15), paddingHorizontal: wp(10)}}/>
                        </TouchableOpacity>
                        <ImageUploader
                            isDeleteFromServerWhenUpload={false}
                            path={chatAssetsPath}
                            renderPreview={({toggleModal}) => {
                                return <TouchableOpacity
                                    onPress={() => {
                                        toggleModal()
                                    }}><IcoMoon name="attachment" style={{paddingBottom: wp(15)}}/>
                                </TouchableOpacity>
                            }}
                            onUploaded={async (imageSource, type) => {
                                console.log(imageSource)
                                let mediaType: IMMessageType = ''
                                switch (type) {
                                    case "image":
                                        mediaType = 'IMAGE'
                                        break;
                                    case "video":
                                        mediaType = 'VIDEO'
                                        break;
                                }
                                const msg = _genMessage(mediaType, imageSource.uri)
                                await _sendMsg(msg)
                            }}
                        />
                    </>
                }}
                renderSend={(props) => {
                    const {text, onSend} = props
                    return (<>
                            {isShowAudioButton
                                ? <AudioRecorder isUpload
                                                 uploadPath={chatAssetsPath}
                                                 onValueChanged={async (uri) => {
                                                     const messageNeedSent = _genMessage('AUDIO', uri)
                                                     await _sendMsg(messageNeedSent)
                                                 }}/>
                                : <TouchableOpacity onPress={() => {
                                    if (text && onSend) {
                                        onSend({text: text, user: memoizedUser, _id: uuidV4()}, true);
                                    }
                                }}>
                                    <IcoMoon name="paperplane1" style={{paddingBottom: wp(15), paddingHorizontal: wp(10)}}/>
                                </TouchableOpacity>
                            }

                        </>
                    )
                }}
            />
            <StickerPicker
                isShow={isShowStickerPicker}
                onValueChanged={async (uri) => {
                    const msg = _genMessage('STICKER_GIF', uri)
                    await _sendMsg(msg)
                }}/>
        </SafeAreaView>
    )
}

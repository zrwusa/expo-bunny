import React, {useCallback, useMemo, useState} from "react"
import {GiftedChat} from "../../../../packages/react-native-gifted-chat/src"
import {RouteProp} from "@react-navigation/native";
import {DemoChatStackParam, IMMessage, IMMessageType, RootState} from "../../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {isLoaded, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {uuidV4} from "../../../utils";
import {Keyboard, SafeAreaView, TouchableOpacity} from "react-native";
import {AudioRecorder, ImageUploader, Preparing, StickerPicker} from "../../../components";
import {IcoMoon} from "../../../components/UI";
import {FirestoreReducer} from "redux-firestore";
import firebase from "firebase";
import {getStyles} from "./styles";
import {useBunnyKit} from "../../../hooks/bunny-kit";

type ChatRoomRouteProp = RouteProp<DemoChatStackParam, 'ChatRoom'>;
type ChatRoomNavigationProp = StackNavigationProp<DemoChatStackParam, 'ChatRoom'>;

export interface ChatRoomProps {
    route: ChatRoomRouteProp,
    navigation: ChatRoomNavigationProp
}

export function ChatRoomScreen({route, navigation}: ChatRoomProps) {
    const {conversationId} = route.params
    const firestore = useFirestore();
    const {sizeLabor, themeLabor, authLabor} = useBunnyKit();
    const {authResult} = authLabor;
    const {user} = authResult

    const styles = getStyles(sizeLabor, themeLabor);

    useFirestoreConnect([
        {
            collection: 'chatMessages',
            orderBy: ['createdAt', 'desc'],
            where: [
                ['conversationId', '==', conversationId]
            ],
        }
    ])
    const chatMessages = useSelector((state: RootState) => state.firestoreState.ordered.chatMessages)

    const chatMessagesAdapted = chatMessages?.map((item) => {
        const createdAtTimestamp = item.createdAt as unknown as firebase.firestore.Timestamp

        // firebase timestamp need to waited to be available
        return {...item, createdAt: createdAtTimestamp?.toDate()}
        // return {...item, createdAt: new Date(createdAtTimestamp.seconds*1000)}
    })

    const memoizedUser = useMemo(() => {
        if (!user) {
            return {_id: 'defaultId', avatar: '', name: 'defaultName'}
        }
        const {firebaseUser} = user
        if (firebaseUser) {
            return {_id: firebaseUser.uid || 'defaultId', avatar: firebaseUser.photoURL || '', name: firebaseUser.displayName || 'defaultName'}
        }
    }, [user])


    const [isShowAudioButton, setIsShowAudioButton] = useState(true)
    const [isShowStickerPicker, setIsShowStickerPicker] = useState(false)
    const chatAssetsPath = `/chatAssets/${memoizedUser?._id}`

    const generateMessage = (type: IMMessageType, payload?: string, needMerge?: IMMessage) => {
        let text = '', image = '', audio = '', video = '', sticker = '';
        switch (type) {
            case 'IMAGE':
                image = payload || '';
                break;
            case 'AUDIO':
                audio = payload || '';
                break;
            case 'STICKER_GIF':
                sticker = payload || '';
                break;
            case 'MESSAGE':
                text = payload || '';
                break;
            case 'VIDEO':
                video = payload || '';
                break;
            default:
                break
        }
        return {
            _id: uuidV4(),
            createdAt: firestore.FieldValue.serverTimestamp(),
            conversationId,
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

    const handleSend = useCallback(async (messages = []) => {
        const msg = generateMessage('MESSAGE', messages[0].text)
        await sendMessage(msg)
    }, [])

    const sendMessage = async (msg: IMMessage) => {
        await firestore.set(`chatMessages/${msg._id}`, msg)
        await setSent(msg)
    }

    const setSent = async (msg: IMMessage) => {
        await firestore.update(`chatMessages/${msg._id}`, {sent: true, pending: false})
    }

    const setReceived = async (msg: FirestoreReducer.EntityWithId<IMMessage>) => {
        if ((memoizedUser && memoizedUser._id) !== msg?.user._id) {
            await firestore.update(`chatMessages/${msg._id}`, {received: true})
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            {isLoaded()
                ? <>
                    <GiftedChat
                        alwaysShowSend
                        showUserAvatar
                        showAvatarForEveryMessage
                        messages={chatMessagesAdapted}
                        onSend={messages => handleSend(messages)}
                        user={memoizedUser}

                        textInputProps={{
                            onFocus: () => {
                                setIsShowStickerPicker(false)
                            }
                        }}

                        onInputTextChanged={(text: string) => {
                            setIsShowAudioButton(!text)
                        }}

                        onMessageReadyForDisplay={async (currentMessage) => {
                            // console.log('---onMessageReadyForDisplay',currentMessage)
                            await setReceived(currentMessage)
                        }}
                        onMessageLoadError={(e, currentMessage) => {
                            // console.log('---onMessageLoadError',currentMessage)
                        }}

                        renderActions={() => {
                            return <>
                                <TouchableOpacity onPress={() => {
                                    Keyboard.dismiss()
                                    setIsShowStickerPicker(!isShowStickerPicker)
                                }}>
                                    <IcoMoon name="chat4" style={styles.stickerPickerIcon}/>
                                </TouchableOpacity>
                                <ImageUploader
                                    isDeleteFromServerWhenUpload={false}
                                    path={chatAssetsPath}
                                    renderPreview={({toggleModal}) => {
                                        return <TouchableOpacity
                                            onPress={() => {
                                                toggleModal()
                                            }}>
                                            <IcoMoon name="attachment" style={styles.mediaLibraryPickerIcon}/>
                                        </TouchableOpacity>
                                    }}
                                    onUploaded={async (imageSource, type) => {
                                        let mediaType: IMMessageType = ''
                                        switch (type) {
                                            case "image":
                                                mediaType = 'IMAGE'
                                                break;
                                            case "video":
                                                mediaType = 'VIDEO'
                                                break;
                                        }
                                        const msg = generateMessage(mediaType, imageSource.uri)
                                        await sendMessage(msg)
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
                                                             const messageNeedSent = generateMessage('AUDIO', uri)
                                                             await sendMessage(messageNeedSent)
                                                         }}/>
                                        : <TouchableOpacity onPress={() => {
                                            if (text && onSend) {
                                                onSend({text: text, user: memoizedUser, _id: uuidV4()}, true);
                                            }
                                        }}>
                                            <IcoMoon name="paperplane1" style={styles.sendIcon}/>
                                        </TouchableOpacity>
                                    }

                                </>
                            )
                        }}
                    />
                    <StickerPicker
                        isShow={isShowStickerPicker}
                        onValueChanged={async (uri) => {
                            const msg = generateMessage('STICKER_GIF', uri)
                            await sendMessage(msg)
                        }}/>
                </>
                : <Preparing/>
            }

        </SafeAreaView>
    )
}

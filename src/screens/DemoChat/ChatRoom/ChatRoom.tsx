import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {BunnyChat} from '../../../components/BunnyChat'
import {RouteProp} from '@react-navigation/native';
import {DemoChatStackParam, IMMessage, IMMessageType, RootState} from '../../../types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {isLoaded, useFirestore, useFirestoreConnect} from 'react-redux-firebase';
import {firestoreTimestampToDate, uuidV4} from '../../../utils';
import {Keyboard, SafeAreaView, TouchableOpacity} from 'react-native';
import {AudioRecorder, ImageUploader, Preparing, StickerPicker} from '../../../components';
import {IcoMoon} from '../../../components/UI';
import {getStyles} from './styles';
import {useBunnyKit} from '../../../hooks/bunny-kit';
import {sysError} from '../../../store/actions';

type ChatRoomRouteProp = RouteProp<DemoChatStackParam, 'ChatRoom'>;
type ChatRoomNavigationProp = StackNavigationProp<DemoChatStackParam, 'ChatRoom'>;

export interface ChatRoomProps {
    route: ChatRoomRouteProp,
    navigation: ChatRoomNavigationProp
}

export function ChatRoomScreen({route, navigation}: ChatRoomProps) {
    const {conversationId} = route.params
    const firestore = useFirestore();
    const {sizeLabor, themeLabor, authLabor, wp} = useBunnyKit();
    const {authResult} = authLabor;
    const {user} = authResult;
    const dispatch = useDispatch();

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

    // const [chatMessagesAdapted,setChatMessagesAdapted] = useState<IMMessage[]>([])
    //
    // useEffect(() => {
    //     const xxx = chatMessages?.map((serverItem) => {
    //         return {...serverItem, createdAt: firestoreTimestampToDate(serverItem.createdAt)}
    //     })
    //     setChatMessagesAdapted(xxx)
    // }, [chatMessages])

    useEffect(() => {
        return () => {
            firestore.get({
                collection: 'chatMessages',
                limit: 0,
            }).then()
            // dispatch({ type: actionTypes.CLEAR_DATA, meta: { collection: 'chatMessages' } })
        }
    }, [])

    let chatMessagesAdapted = chatMessages?.map((serverItem) => {
        return {...serverItem, createdAt: firestoreTimestampToDate(serverItem.createdAt)}
    })

    const memoizedUser = useMemo(() => {
        if (!user) {
            return {_id: 'defaultId', avatar: '', name: 'defaultName'}
        }
        const {firebaseUser, storedUser} = user
        if (firebaseUser) {
            return {
                _id: firebaseUser.uid || 'defaultId',
                avatar: storedUser?.photoURL || '',
                name: firebaseUser.displayName || 'defaultName'
            }
        }
    }, [user])


    const [isShowAudioButton, setIsShowAudioButton] = useState(true)
    const [isShowStickerPicker, setIsShowStickerPicker] = useState(false)

    const chatAssetsPath = `/chatAssets/${memoizedUser?._id}`

    const generateMessage = (type: IMMessageType, payload?: string, needMerge?: Partial<IMMessage>) => {
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
        await storeMessage(msg)
    }, [])

    const storeMessage = async (msg: IMMessage) => {
        await firestore.set(`chatMessages/${msg._id}`, msg)
        await setSent(msg)
    }

    const setSent = async (msg: IMMessage) => {
        await firestore.update(`chatMessages/${msg._id}`, {sent: true, pending: false})
    }

    const setReceived = async (msg: IMMessage) => {
        if ((memoizedUser && memoizedUser._id) !== msg?.user._id) {
            await firestore.update(`chatMessages/${msg._id}`, {received: true})
        }
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            {isLoaded(chatMessages)
                ? <>
                    <BunnyChat<IMMessage>
                        // actionsConfig={{
                        //     'PickImage': function () {
                        //         console.log(arguments)
                        //     },
                        //     'Cancel': function () {
                        //         console.log(arguments)
                        //     }
                        // }}
                        // minComposerHeight={100}
                        // keyboardShouldPersistTaps
                        isDebug={false}
                        alwaysShowSend
                        // TODO Suspected to be a react-native-gifted-chat bug,default value is true.
                        inverted={true}
                        // showUserAvatar
                        // showAvatarForEveryMessage
                        messages={chatMessagesAdapted}
                        onSend={async (messages) => {
                            console.log('onSend', messages)
                            await handleSend(messages)
                        }}

                        user={memoizedUser}

                        textInputProps={{
                            onFocus: () => {
                                setIsShowStickerPicker(false)
                            }
                        }}

                        onInputTextChanged={(text) => {
                            setIsShowAudioButton(!text)
                        }}

                        onMessageReadyForDisplay={async (currentMessage: IMMessage) => {
                            await setReceived(currentMessage)
                        }}

                        onMessageLoadError={(e, currentMessage) => {
                            dispatch(sysError(e));
                        }}
                        // actionSheet={() => {
                        //     return {
                        //         showActionSheetWithOptions: (options, callback) => {
                        //             console.log(options, callback)
                        //             callback(0)
                        //         }
                        //     }
                        // }}
                        renderActions={() => {
                            return <>
                                <TouchableOpacity onPress={() => {
                                    Keyboard.dismiss()
                                    // TODO issue when this triggered firebase writes channel and rerenders all
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
                                            <IcoMoon name="paperclip" size={wp(16)}
                                                     style={styles.mediaLibraryPickerIcon}/>
                                        </TouchableOpacity>
                                    }}
                                    onUploaded={async (imageSource, type) => {
                                        let mediaType: IMMessageType = ''
                                        switch (type) {
                                            case 'image':
                                                mediaType = 'IMAGE'
                                                break;
                                            case 'video':
                                                mediaType = 'VIDEO'
                                                break;
                                        }
                                        const msg = generateMessage(mediaType, imageSource.uri)
                                        await storeMessage(msg)
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
                                                             await storeMessage(messageNeedSent)
                                                         }}/>
                                        : <TouchableOpacity onPress={() => {
                                            if (text && onSend && memoizedUser) {
                                                onSend(generateMessage('MESSAGE',
                                                    text), true);
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
                            await storeMessage(msg);
                            // setIsShowStickerPicker(false);
                        }}/>
                </>
                : <Preparing/>
            }

        </SafeAreaView>
    )
}

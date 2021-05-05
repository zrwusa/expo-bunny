import React, {useCallback, useEffect, useMemo, useState} from "react"
import {GiftedChat} from "react-native-gifted-chat"
import {RouteProp} from "@react-navigation/native";
import {DemoChatStackParam, IMMessage, RootState} from "../../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {useFirebase, useFirebaseConnect} from "react-redux-firebase";
import {extractValue} from "../../../utils";
import {useAuthLabor} from "../../../providers/auth-labor";


type ChatRoomRouteProp = RouteProp<DemoChatStackParam, 'ChatRoom'>;
type ChatRoomNavigationProp = StackNavigationProp<DemoChatStackParam, 'ChatRoom'>;

export interface ChatRoomProps {
    route: ChatRoomRouteProp,
    navigation: ChatRoomNavigationProp
}

export function ChatRoomScreen({route, navigation}: ChatRoomProps) {
    const authLabor = useAuthLabor()
    const {authResult} = authLabor;
    const {user} = authResult
    const {roomKey} = route.params
    const initialMessages: IMMessage[] = [];

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
        let gcMessages: IMMessage[] = []
        if (roomKey) {
            gcMessages = extractValue<IMMessage>(chatMessages).filter(item => item.roomKey === roomKey).reverse()
        } else {
            return
        }
        setMessages(gcMessages)
    }, [JSON.stringify(chatMessages)])

    const handleSend = useCallback((messages = []) => {
        const messageNeedSent = {...messages[0], roomKey, createdAt: firebase.database.ServerValue.TIMESTAMP}
        firebase.database().ref(`chatMessages`).push(messageNeedSent)
    }, [])

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => handleSend(messages)}
            user={memoizedUser}
        />
    )
}


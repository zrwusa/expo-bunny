import React, {useCallback, useEffect, useMemo, useState} from "react"
import {GiftedChat} from "react-native-gifted-chat"
import {RouteProp} from "@react-navigation/native";
import {DemoChatStackParam, IMMessage, RootState} from "../../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {useFirebase, useFirebaseConnect} from "react-redux-firebase";
import {extractValue} from "../../../utils";
import {useAuthLabor} from "../../../providers/auth-labor";
import {Text, TouchableOpacity, View} from "react-native";
import {GifSearch} from "react-native-gif-search";


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


    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const [gifSelected, setGifSelected] = useState<string>();

    const handleOpenModal = useCallback(() => {
        setModalOpened(!modalOpened);
    }, [modalOpened]);

    const handleSelectModal = useCallback((gifUrl?: string) => {
        setGifSelected(gifUrl);
    }, []);

    return (
        <View style={{flex: 1}}>
            <GiftedChat
                messages={messages}
                onSend={messages => handleSend(messages)}
                user={memoizedUser}

            />
            <TouchableOpacity
                // style={styles.buttonContainer}
                onPress={handleOpenModal}>
                <Text>Select a GIF</Text>
            </TouchableOpacity>
            <GifSearch
                visible
                giphyApiKey="oF6N3TXanxxChOJXEf6zo9YUszYef9Uu"
                gifsToLoad={100}
                maxGifsToLoad={3 * 9}
                // style={styles.gifContainer}
                // textInputStyle={styles.searchInputText}
                // gifListStyle={styles.gifListComponent}
                // gifStyle={styles.gifComponent}
                loadingSpinnerColor={'black'}
                placeholderTextColor={'#807E7E'}
                placeholderText={'Search a GIF'}
                horizontal={false}
                numColumns={3}
                onGifSelected={() => {
                    console.log('111')
                }}
                showScrollBar={false}
            />
            {/*<GifPicker  showModal={modalOpened}*/}
            {/*handleChangeModal={()=>{*/}
            {/*    console.log('-xxx')*/}
            {/*}}*/}
            {/*selectGif={(gifUrl?: string) => {*/}
            {/*    console.log('-gifUrl',gifUrl)*/}
            {/*}}/>*/}
            {/*<GifViewer gifUrl={gifSelected} />*/}
        </View>

    )
}


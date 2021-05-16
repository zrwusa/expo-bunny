import React, {useEffect} from "react"
import {Text, View} from "../../../components/UI";
import {FlatList, TouchableOpacity} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {ChatRoom, Conversation, DemoChatStackParam, RootState} from "../../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {Row} from "../../../containers/Row";
import {getStyles} from "./styles";
import {Col} from "../../../containers";
import {useBunnyKit} from "../../../hooks/bunny-kit";
import {Divider} from "../../../components/Divider";
import {isLoaded, useFirebaseConnect, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {FirestoreReducer} from "redux-firestore";
import {Preparing} from "../../../components/Preparing";
import {Avatar} from "../../../components/Avatar";
import firebase from "firebase";
import dayjs from "dayjs"

type ChatHomeRouteProp = RouteProp<DemoChatStackParam, 'ChatHome'>;
type ChatHomeNavigationProp = StackNavigationProp<DemoChatStackParam, 'ChatHome'>;

export interface ChatHomeProps {
    route: ChatHomeRouteProp,
    navigation: ChatHomeNavigationProp
}

export function ChatHomeScreen({route, navigation}: ChatHomeProps) {
    const {sizeLabor, themeLabor, user, colors, wp, ms} = useBunnyKit()
    const styles = getStyles(sizeLabor, themeLabor)

    const firebaseUser = user?.firebaseUser;
    let userId = ''
    if (firebaseUser) {
        userId = firebaseUser.uid;
    }

    useFirebaseConnect([{path: 'chatRooms', queryParams: []}])

    useFirestoreConnect([
        {
            collection: 'conversations',
            where: [
                ['users', 'array-contains', userId],
            ],
        }
    ])

    useFirestoreConnect([
        {
            collection: 'users',
        }
    ])

    const conversations = useSelector((state: RootState) => state.firestoreState.ordered.conversations)
    const firestore = useFirestore()

    useEffect(() => {
        getCurrentUserConversationsMessages().then()
    }, [conversations])

    const getCurrentUserConversationsMessages = async () => {
        if (conversations && (conversations.length > 0)) {
            const whereConversationIds = conversations.map(item => item.id)
            await firestore.get(
                {
                    collection: 'chatMessages',
                    orderBy: ['createdAt', 'desc'],
                    where: [
                        ['conversationId', 'in', whereConversationIds],
                    ],
                    storeAs: 'currentUserConversationsMessages'
                }
            )
        }
    }


    const users = useSelector((state: RootState) => state.firestoreState.ordered.users)
    const currentUserConversationsMessages = useSelector((state: RootState) => state.firestoreState.ordered.currentUserConversationsMessages)

    const handleRoomPress = (key: string) => {
        navigation.navigate('ChatRoom', {conversationId: key})
    }

    const renderAvatar = (usersInConversation: string[]) => {
        const userInfos = users?.filter((user) => {
            return usersInConversation.includes(user.uid)
        })

        return (userInfos && userInfos[0] && userInfos[0].photoURL)
            ? <Avatar size="l" source={{uri: userInfos[0].photoURL}}/>
            : null
    }

    const renderLatestMessage = (conversation: FirestoreReducer.EntityWithId<Conversation>) => {
        const xxx = currentUserConversationsMessages?.filter((item) => {
            return (item.conversationId === conversation.id)
        })
        const latestMessage = xxx?.[0]
        let showText = ''
        let showTime = ''

        if (latestMessage) {
            const createdAtTimestamp = latestMessage.createdAt as unknown as firebase.firestore.Timestamp
            showTime = dayjs(createdAtTimestamp?.toDate())
                .format('LT')
            switch (latestMessage.type) {
                case 'MESSAGE':
                    showText = latestMessage.text;

                    break;
                case 'IMAGE':
                    showText = 'Image Message'
                    break;
                case 'STICKER_GIF':
                    showText = 'Sticker Message'
                    break;
                case 'AUDIO':
                    showText = 'Voice Message'
                    break;
                case 'VIDEO':
                    showText = 'Video Message'
                    break;
                default:

                    break;

            }
        }

        return <>
            <Row style={{justifyContent: 'space-between'}}>
                <Text>{conversation.name}</Text>
                <Text>{showTime}</Text>
            </Row>
            <Row style={{paddingTop: wp(6)}}>
                <Text style={{color: colors.text3, fontSize: ms.fs.xs}}>{showText}</Text>
            </Row>
        </>
    }

    const renderItem = (conversation: FirestoreReducer.EntityWithId<Conversation>) => {
        return (
            <TouchableOpacity onPress={() => handleRoomPress(conversation.id)}>
                <Row paddingVertical="m">
                    <Col size={1}>
                        {
                            renderAvatar(conversation.users)
                        }
                    </Col>
                    <Col size={5} style={{alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                        {
                            renderLatestMessage(conversation)
                        }

                    </Col>
                </Row>
            </TouchableOpacity>
        )
    }

    return (
        isLoaded(conversations)
            ? <View style={styles.screen}>
                <FlatList
                    data={conversations}
                    renderItem={({item}) => {
                        return renderItem(item)
                    }}
                    keyExtractor={(item) => item.id as any}
                    ItemSeparatorComponent={() => <Divider/>}
                />
            </View>
            : <Preparing/>
    )
}

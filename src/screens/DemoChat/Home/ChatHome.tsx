import React, {useEffect} from "react"
import {Text} from "../../../components/UI";
import {Dimensions, FlatList, SafeAreaView, TouchableOpacity, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {ChatRoom, Conversation, DemoChatStackParam, RootState} from "../../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {Row} from "../../../containers/Row";
import {getStyles} from "./styles";
import {Col} from "../../../containers";
import {useBunnyKit} from "../../../hooks/bunny-kit";
import {isLoaded, useFirebaseConnect, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {FirestoreReducer} from "redux-firestore";
import {Avatar} from "../../../components/Avatar";
import dayJS from "dayjs"
import isToday from "dayjs/plugin/isToday";
import {Divider} from "../../../components";
import {Preparing} from "../../../components/Preparing";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {firestoreTimestampToDate} from "../../../utils";

dayJS.extend(isToday)

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

    useFirestoreConnect([{
        collection: 'conversations', where: [
            ['users', 'array-contains', userId],
        ],
    }])

    useFirestoreConnect([{collection: 'users',}])

    const conversations = useSelector((state: RootState) => state.firestoreState.ordered.conversations)
    const firestore = useFirestore()

    useEffect(() => {
        getCurrentUserConversationsMessages().then()
    }, [conversations])

    const getCurrentUserConversationsMessages = async () => {
        if (conversations && (conversations.length > 0)) {
            const whereConversationIds = conversations.map(item => item.id)
            // TODO Invalid Query. 'in' filters support a maximum of 10 elements in the value array.
            await firestore.get(
                {
                    collection: 'chatMessages',
                    orderBy: ['createdAt', 'desc'],
                    // where: [
                    //     ['conversationId', 'in', whereConversationIds],
                    // ],
                    storeAs: 'currentUserConversationsMessages'
                }
            )
        }
    }

    const insets = useSafeAreaInsets();

    const users = useSelector((state: RootState) => state.firestoreState.ordered.users)
    const currentUserConversationsMessages = useSelector((state: RootState) => state.firestoreState.ordered.currentUserConversationsMessages)

    const handleRoomPress = (key: string) => {
        navigation.navigate('ChatRoom', {conversationId: key})
    }

    const renderAvatar = (conversation: Conversation) => {
        switch (conversation.type) {
            case 'GROUP':
                return <Avatar size="l" isBorder={false} source={{uri: conversation.avatar}}/>
            case 'COUPLE':
                const otherUsersInConversation = users?.filter((user) => {
                    return conversation.users.includes(user.uid) && user.uid !== userId
                })
                return (otherUsersInConversation && otherUsersInConversation[0] && otherUsersInConversation[0].photoURL)
                    ? <Avatar size="l" isBorder={false} source={{uri: otherUsersInConversation[0].photoURL}}/>
                    : null

        }
    }

    const renderLatestMessage = (conversation: FirestoreReducer.EntityWithId<Conversation>) => {
        const latestMessages = currentUserConversationsMessages?.filter((item) => {
            return (item.conversationId === conversation.id)
        })
        const latestMessage = latestMessages?.[0]
        let tipText = ''
        let tipTime = ''

        if (latestMessage) {
            const createdAtTimestamp = firestoreTimestampToDate(latestMessage.createdAt)
            const date = dayJS(createdAtTimestamp)
            const now = new Date();
            const isToday = date.isToday();
            const isSameWeek = date.isSame(now, 'week')
            tipTime = isToday ? date.format('LT') : isSameWeek ? date.format('ddd').toString() : date.format('MM/DD/YY')
            switch (latestMessage.type) {
                case 'MESSAGE':
                    tipText = latestMessage.text;
                    break;
                case 'IMAGE':
                    tipText = 'Image Message'
                    break;
                case 'STICKER_GIF':
                    tipText = 'Sticker Message'
                    break;
                case 'AUDIO':
                    tipText = 'Voice Message'
                    break;
                case 'VIDEO':
                    tipText = 'Video Message'
                    break;
                default:

                    break;
            }
        }

        return <>
            <Row style={styles.timePanel}>
                <Text>{conversation.name}</Text>
                <Text style={styles.time}>{tipTime}</Text>
            </Row>
            <Row style={styles.tipPanel}>
                <Text style={styles.tip}>{tipText}</Text>
            </Row>
        </>
    }

    const renderItem = (conversation: FirestoreReducer.EntityWithId<Conversation>) => {
        return (
            <View style={styles.conversation}>
                <TouchableOpacity onPress={() => handleRoomPress(conversation.id)}>
                    <Row paddingVertical="m">
                        <Col size={1}>
                            {
                                renderAvatar(conversation)
                            }
                        </Col>
                        <Col size={5} style={styles.latestMessage}>
                            {
                                renderLatestMessage(conversation)
                            }
                        </Col>
                    </Row>
                </TouchableOpacity>
                <Divider/>
            </View>

        )
    }

    // React Navigation bug,when nested navigators and headerShown = false,
    // the FlatList height not limited,as such the scrolling does't work
    const webFlatListHeight = Dimensions.get('window').height - insets.top - insets.bottom - wp(46)

    return (
        <SafeAreaView style={{flex: 1}}>
            {
                isLoaded(conversations)
                    ? <FlatList
                        style={{height: webFlatListHeight}}
                        data={conversations}
                        renderItem={({item}) => {
                            return renderItem(item)
                        }}
                        keyExtractor={(item) => item.id as any}
                    />
                    : <Preparing/>
            }
        </SafeAreaView>
    )
}

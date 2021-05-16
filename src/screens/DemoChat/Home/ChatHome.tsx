import React from "react"
import {Text, View} from "../../../components/UI";
import {FlatList, TouchableOpacity} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {ChatRoom, Conversation, DemoChatStackParam, RootState} from "../../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {Row} from "../../../containers/Row";
import {getStyles} from "./styles";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {Col} from "../../../containers";
import {useBunnyKit} from "../../../hooks/bunny-kit";
import {Divider} from "../../../components/Divider";
import {isLoaded, useFirebaseConnect, useFirestoreConnect} from "react-redux-firebase";
import {FirestoreReducer} from "redux-firestore";
import {Preparing} from "../../../components/Preparing";

type ChatHomeRouteProp = RouteProp<DemoChatStackParam, 'ChatHome'>;
type ChatHomeNavigationProp = StackNavigationProp<DemoChatStackParam, 'ChatHome'>;

export interface ChatHomeProps {
    route: ChatHomeRouteProp,
    navigation: ChatHomeNavigationProp
}

export function ChatHomeScreen({route, navigation}: ChatHomeProps) {
    const {user} = useBunnyKit()
    useFirebaseConnect([{path: 'chatRooms', queryParams: []}])
    const {wp} = useBunnyKit()
    const firebaseUser = user?.firebaseUser;
    let userId = ''
    if (firebaseUser) {
        userId = firebaseUser.uid;
    }

    useFirestoreConnect([
        {
            collection: 'conversations',
            where: [
                ['users', 'array-contains', userId],
            ],
        }
    ])

    const conversations = useSelector((state: RootState) => state.firestoreState.ordered.conversations)

    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor)
    const handleRoomPress = (key: string) => {
        navigation.navigate('ChatRoom', {conversationId: key})
    }

    const renderItem = (item: FirestoreReducer.EntityWithId<Conversation>) => {
        return (
            <TouchableOpacity onPress={() => handleRoomPress(item.id)}>
                <Row paddingVertical="xxl">
                    <Col size={1}>
                        <Text>{item.name}</Text>
                    </Col>
                    <Col size={3} style={{alignItems: 'center'}}>
                        <Text>{item.name}</Text>
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

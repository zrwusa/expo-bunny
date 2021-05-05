import {firebase} from "../firebase";
import {uuidV4} from "../../utils";

const chatMessages = {
    'room_a_msg_a': {
        _id: uuidV4(),
        roomKey: 'room_a',
        text: 'Room a msg a text',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    'room_a_msg_b': {
        _id: uuidV4(),
        roomKey: 'room_a',
        text: 'Room a msg b text',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    'room_b_msg_a': {
        _id: uuidV4(),
        roomKey: 'room_b',
        text: 'Room b msg a text',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
    'room_b_msg_b': {
        _id: uuidV4(),
        roomKey: 'room_b',
        text: 'Room b msg b text',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
        },
    },
}

export const migrateChatMessages = async () => {
    await firebase
        .database()
        .ref('chatMessages')
        .set(chatMessages);
}

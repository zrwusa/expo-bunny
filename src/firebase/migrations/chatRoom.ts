import {firebase} from "../firebase";
import {uuidV4} from "../../utils";

const chatRooms = {
    'room_a': {
        _id: uuidV4(),
        name: 'Room a',
    },
    'room_b': {
        _id: uuidV4(),
        name: 'Room b',
    },
}

export const migrateChatRooms = async () => {
    await firebase
        .database()
        .ref('chatRooms')
        .set(chatRooms);
}

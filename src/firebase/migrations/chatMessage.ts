import {firebase} from "../firebase";

const demoVideo = "https://raw.githubusercontent.com/zrwusa/assets/master/videos/big-buck-bunny.mp4";
const demoAudio = "https://www.kozco.com/tech/LRMonoPhase4.wav";
const fromDate = (date: number | string | Date) => {
    return firebase.firestore.Timestamp.fromDate(new Date(date))
}

const chatMessagesDev = []
const chatMessagesTest = [{
    "_id": "chat-message-007",
    "pending": false,
    "text": "This is a e-mail test@gmail.com",
    "sent": true,
    "audio": "",
    "video": "",
    "createdAt": fromDate("2021-05-14T00:09:10.000Z"),
    "image": "",
    "user": {"name": "defaultName", "_id": "G39wPYnspoRacDCXXGcptuEJHky2", "avatar": ""},
    "sticker": "",
    "received": false,
    "type": "MESSAGE",
    "conversationId": "conversation-002"
}, {
    "_id": "chat-message-008",
    "video": "",
    "image": "",
    "received": false,
    "pending": false,
    "audio": "",
    "user": {"name": "defaultName", "_id": "G39wPYnspoRacDCXXGcptuEJHky2", "avatar": ""},
    "sticker": "",
    "text": "This is a phone +601162366666",
    "type": "MESSAGE",
    "createdAt": fromDate("2021-05-14T00:09:20.000Z"),
    "sent": true,
    "conversationId": "conversation-002"
}, {
    "_id": "chat-message-001",
    "user": {
        "name": "Pablo Rios",
        "avatar": "https://lh3.googleusercontent.com/a-/AOh14GgkbmDGHEhu-V3uLunUJ0IBCBnO5ll-VL8RBnCU=s96-c",
        "_id": "pnaJWwEpZLf0IlMZbScjh0wfDKP2"
    },
    "pending": false,
    "createdAt": fromDate("2021-05-15T05:22:31.000Z"),
    "audio": demoAudio,
    "conversationId": "conversation-002",
    "received": true,
    "sent": true
}, {
    "_id": "chat-message-002",
    "user": {"name": "defaultName", "_id": "64qQ5XaPLZeTsRqPdDAkjsWc9Hx2", "avatar": ""},
    "sent": true,
    "image": "https://asset.kompas.com/crops/Y51dQ3fy_sACbi7JJnAj5KOkQfc=/0x0:960x640/750x500/data/photo/2021/01/10/5ffb167d0af9b.jpg",
    "received": true,
    "pending": false,
    "createdAt": fromDate("2021-05-15T04:10:23.000Z"),
    "conversationId": "conversation-002"
}, {
    "_id": "chat-message-005",
    "text": "",
    "audio": demoAudio,
    "createdAt": fromDate("2021-05-15T01:09:09.000Z"),
    "received": true,
    "user": {
        "_id": "pnaJWwEpZLf0IlMZbScjh0wfDKP2",
        "name": "Pablo Rios",
        "avatar": "https://lh3.googleusercontent.com/a-/AOh14GgkbmDGHEhu-V3uLunUJ0IBCBnO5ll-VL8RBnCU=s96-c"
    },
    "sticker": "",
    "video": "",
    "pending": false,
    "type": "AUDIO",
    "conversationId": "conversation-002",
    "image": "",
    "sent": true
}, {
    "_id": "chat-message-003",
    "received": true,
    "createdAt": fromDate("2021-05-15T00:56:09.000Z"),
    "sent": true,
    "pending": false,
    "conversationId": "conversation-002",
    "user": {"avatar": "", "name": "defaultName", "_id": "64qQ5XaPLZeTsRqPdDAkjsWc9Hx2"},
    "text": "This is a text"
}, {
    "_id": "chat-message-006",
    "video": "",
    "sticker": "",
    "type": "AUDIO",
    "createdAt": fromDate("2021-05-14T10:55:08.000Z"),
    "image": "",
    "conversationId": "conversation-002",
    "audio": demoAudio,
    "user": {"avatar": "", "name": "defaultName", "_id": "tBINx8zZrcPrJnCP4sQV95pbFU73"},
    "pending": false,
    "text": "",
    "sent": true,
    "received": false
}, {
    "_id": "chat-message-004",
    "pending": false,
    "sent": true,
    "text": "",
    "audio": "",
    "image": "",
    "user": {"avatar": "", "_id": "64qQ5XaPLZeTsRqPdDAkjsWc9Hx2", "name": "defaultName"},
    "createdAt": fromDate("2021-05-15T10:54:08.000Z"),
    "conversationId": "conversation-002",
    "sticker": "",
    "video": demoVideo,
    "type": "VIDEO",
    "received": true
},
    {
        "_id": "chat-message-009",
        "user": {"name": "defaultName", "avatar": "", "_id": "G39wPYnspoRacDCXXGcptuEJHky2"},
        "pending": false,
        "image": "",
        "received": false,
        "audio": "",
        "video": "",
        "text": "",
        "type": "STICKER_GIF",
        "sent": true,
        "conversationId": "conversation-002",
        "sticker": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/ShaunTheSheep256%2FShaunTheSheep-256px-19.gif?alt=media&token=35de2bb7-d3f3-4e6e-b41f-c2d29409ff1c",
        "createdAt": fromDate("2021-05-15T10:53:29.000Z"),
    }]


export const migrateChatMessages = async () => {
    for (const chatMessage of chatMessagesTest) {
        await firebase
            .firestore()
            .collection('chatMessages')
            .doc(chatMessage._id)
            .set(chatMessage);
    }

}

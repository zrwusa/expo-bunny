import {conversations, datingConversations} from "./conversation";
import {datingUsers} from "./user";
import {IMMessage} from "../../types";
import {randomDate} from "../../utils";
import dayJS from "dayjs";
import weekday from "dayjs/plugin/weekday"

dayJS.extend(weekday)

const demoVideo = "https://raw.githubusercontent.com/zrwusa/assets/master/videos/big-buck-bunny.mp4";
const demoAudio = "https://www.kozco.com/tech/LRMonoPhase4.wav";

// const fromDate = (date: number | string | Date) => {
//     return firebase.firestore.Timestamp.fromDate(new Date(date))
// }

const lastWeek = dayJS().weekday(-7).toDate()

const randomNeededDate = () => randomDate(new Date('2019-01-01'), new Date(), lastWeek, 0.5)

const groupChatMessagesTestBase: IMMessage[] = [
    {
        "_id": "chat-message-001",
        "text": '',
        "user": {
            "name": "Pablo Rios",
            "avatar": 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fi.jpg?alt=media&token=e51deb19-6fa4-451a-b2fc-9e92f52db343',
            "_id": 'BzoqTn3KZCXDWScp0fhKr8xGp2u2',
        },
        "pending": false,
        "createdAt": randomNeededDate(),
        "audio": demoAudio,
        "conversationId": "conversation-001",
        "received": true,
        "sent": true,
        "type": "AUDIO",
    },
    {
        "_id": "chat-message-002",
        "text": '',
        "user": {
            "name": "defaultName",
            "avatar": 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fj.jpg?alt=media&token=3b210a82-0e08-4080-a518-f3d7c25368a2',
            "_id": 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
        },
        "sent": true,
        "image": "https://asset.kompas.com/crops/Y51dQ3fy_sACbi7JJnAj5KOkQfc=/0x0:960x640/750x500/data/photo/2021/01/10/5ffb167d0af9b.jpg",
        "received": true,
        "pending": false,
        "createdAt": randomNeededDate(),
        "conversationId": "conversation-001",
        "type": "IMAGE",
    },
    {
        "_id": "chat-message-003",
        "received": true,
        "createdAt": randomNeededDate(),
        "sent": true,
        "pending": false,
        "conversationId": "conversation-001",
        "user": {
            "name": "defaultName",
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fk.jpg?alt=media&token=38b2b032-2f7f-447d-9e83-2e6b8d1cf89f',
            _id: "hovkAoBO4SfArjeT0A9ydAEtfnF3",
        },
        "text": "This is a text",
        "type": "MESSAGE",
    },
    {
        "_id": "chat-message-004",
        "pending": false,
        "sent": true,
        "text": "This is a cartoon video for your baby",
        "audio": "",
        "image": "",
        "user": {
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fa.jpg?alt=media&token=4b0a0670-41cf-4678-8822-05ef5fe69c13',
            _id: 'iXtCc0Ad4KYxSv4eat3EdRLGCmC3',
            "name": "defaultName"
        },
        "createdAt": randomNeededDate(),
        "conversationId": "conversation-001",
        "sticker": "",
        "video": demoVideo,
        "type": "VIDEO",
        "received": true
    },
    {
        "_id": "chat-message-005",
        "text": "",
        "audio": demoAudio,
        "createdAt": randomNeededDate(),
        "received": true,
        "user": {
            "name": "Pablo Rios",
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fb.jpg?alt=media&token=0cd3c7ad-033d-4f77-853c-aaca2058418d',
            _id: 'YtyPwHQsErYX6KH6DYLmQn7OQgn1',
        },
        "sticker": "",
        "video": "",
        "pending": false,
        "type": "AUDIO",
        "conversationId": "conversation-001",
        "image": "",
        "sent": true
    },
    {
        "_id": "chat-message-006",
        "video": "",
        "sticker": "",
        "type": "AUDIO",
        "createdAt": randomNeededDate(),
        "image": "",
        "conversationId": "conversation-001",
        "audio": demoAudio,
        "user": {
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fc.jpg?alt=media&token=31188292-a9e1-48f1-80ae-88387cda60c3',
            name: '',
            _id: 'vr9SRkq7ofOYiOQao6aTRkkMUEp1',
        },
        "pending": false,
        "text": "",
        "sent": true,
        "received": false
    },
    {
        "_id": "chat-message-007",
        "pending": false,
        "text": "This is a e-mail test@gmail.com",
        "sent": true,
        "audio": "",
        "video": "",
        "createdAt": randomNeededDate(),
        "image": "",
        "user": {
            "name": "defaultName",
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fd.jpg?alt=media&token=3b023315-05f1-481f-bd3e-544211240db5',
            _id: 'L2WaWwhWH9ZO7gjZHItAvJMXh9D2',
        },
        "sticker": "",
        "received": false,
        "type": "MESSAGE",
        "conversationId": "conversation-001"
    },
    {
        "_id": "chat-message-008",
        "video": "",
        "image": "",
        "received": false,
        "pending": false,
        "audio": "",
        "user": {
            "name": "defaultName",
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fe.jpg?alt=media&token=a118ea91-e05b-4501-874a-2e83eca0f119',
            _id: 'da4g2pOxzVb7slyAXEUO3uWwuQl2',
        },
        "sticker": "",
        "text": "This is a phone +601162366666",
        "type": "MESSAGE",
        "createdAt": randomNeededDate(),
        "sent": true,
        "conversationId": "conversation-001"
    },
    {
        "_id": "chat-message-009",
        "user": {
            "name": "defaultName",
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Ff.jpg?alt=media&token=0f331dc9-be29-4a27-b47c-75e885806666',
            _id: 'EvqTQMfHJLRPF2BU3MxbZGoF1R43',
        },
        "pending": false,
        "image": "",
        "received": false,
        "audio": "",
        "video": "",
        "text": "",
        "type": "STICKER_GIF",
        "sent": true,
        "conversationId": "conversation-001",
        "sticker": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/ShaunTheSheep256%2FShaunTheSheep-256px-19.gif?alt=media&token=35de2bb7-d3f3-4e6e-b41f-c2d29409ff1c",
        "createdAt": randomNeededDate(),
    }]

let groupChatMessagesTest: IMMessage[] = []

const datingChatMessagesBase: IMMessage[] = [
    {
        "_id": "chat-message-dating-001",
        "text": '',
        "user": {
            "name": "Pablo Rios",
            "avatar": 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fi.jpg?alt=media&token=e51deb19-6fa4-451a-b2fc-9e92f52db343',
            "_id": 'BzoqTn3KZCXDWScp0fhKr8xGp2u2',
        },
        "pending": false,
        "createdAt": randomNeededDate(),
        "audio": demoAudio,
        "conversationId": "",
        "received": true,
        "sent": true,
        "type": "AUDIO",
    },
    {
        "_id": "chat-message-dating-002",
        "text": '',
        "user": {
            "name": "defaultName",
            "avatar": 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fj.jpg?alt=media&token=3b210a82-0e08-4080-a518-f3d7c25368a2',
            "_id": 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
        },
        "sent": true,
        "image": "https://asset.kompas.com/crops/Y51dQ3fy_sACbi7JJnAj5KOkQfc=/0x0:960x640/750x500/data/photo/2021/01/10/5ffb167d0af9b.jpg",
        "received": true,
        "pending": false,
        "createdAt": randomNeededDate(),
        "conversationId": "",
        "type": "IMAGE",
    },
    {
        "_id": "chat-message-dating-003",
        "received": true,
        "createdAt": randomNeededDate(),
        "sent": true,
        "pending": false,
        "conversationId": "",
        "user": {
            "name": "defaultName",
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fk.jpg?alt=media&token=38b2b032-2f7f-447d-9e83-2e6b8d1cf89f',
            _id: "hovkAoBO4SfArjeT0A9ydAEtfnF3",
        },
        "text": "This is a text",
        "type": "MESSAGE",
    },
    {
        "_id": "chat-message-dating-004",
        "pending": false,
        "sent": true,
        "text": "",
        "audio": "",
        "image": "",
        "user": {
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fa.jpg?alt=media&token=4b0a0670-41cf-4678-8822-05ef5fe69c13',
            _id: 'iXtCc0Ad4KYxSv4eat3EdRLGCmC3',
            "name": "defaultName"
        },
        "createdAt": randomNeededDate(),
        "conversationId": "",
        "sticker": "",
        "video": demoVideo,
        "type": "VIDEO",
        "received": true
    },
    {
        "_id": "chat-message-dating-005",
        "text": "",
        "audio": demoAudio,
        "createdAt": randomNeededDate(),
        "received": true,
        "user": {
            "name": "Pablo Rios",
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fb.jpg?alt=media&token=0cd3c7ad-033d-4f77-853c-aaca2058418d',
            _id: 'YtyPwHQsErYX6KH6DYLmQn7OQgn1',
        },
        "sticker": "",
        "video": "",
        "pending": false,
        "type": "AUDIO",
        "conversationId": "",
        "image": "",
        "sent": true
    },
    {
        "_id": "chat-message-dating-006",
        "video": "",
        "sticker": "",
        "type": "AUDIO",
        "createdAt": randomNeededDate(),
        "image": "",
        "conversationId": "",
        "audio": demoAudio,
        "user": {
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fc.jpg?alt=media&token=31188292-a9e1-48f1-80ae-88387cda60c3',
            name: '',
            _id: 'vr9SRkq7ofOYiOQao6aTRkkMUEp1',
        },
        "pending": false,
        "text": "",
        "sent": true,
        "received": false
    },
    {
        "_id": "chat-message-dating-007",
        "pending": false,
        "text": "This is a e-mail test@gmail.com",
        "sent": true,
        "audio": "",
        "video": "",
        "createdAt": randomNeededDate(),
        "image": "",
        "user": {
            "name": "defaultName",
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fd.jpg?alt=media&token=3b023315-05f1-481f-bd3e-544211240db5',
            _id: 'L2WaWwhWH9ZO7gjZHItAvJMXh9D2',
        },
        "sticker": "",
        "received": false,
        "type": "MESSAGE",
        "conversationId": ""
    },
    {
        "_id": "chat-message-dating-008",
        "video": "",
        "image": "",
        "received": false,
        "pending": false,
        "audio": "",
        "user": {
            "name": "defaultName",
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fe.jpg?alt=media&token=a118ea91-e05b-4501-874a-2e83eca0f119',
            _id: 'da4g2pOxzVb7slyAXEUO3uWwuQl2',
        },
        "sticker": "",
        "text": "This is a phone +601162366666",
        "type": "MESSAGE",
        "createdAt": randomNeededDate(),
        "sent": true,
        "conversationId": ""
    },
    {
        "_id": "chat-message-dating-009",
        "user": {
            "name": "defaultName",
            avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Ff.jpg?alt=media&token=0f331dc9-be29-4a27-b47c-75e885806666',
            _id: 'EvqTQMfHJLRPF2BU3MxbZGoF1R43',
        },
        "pending": false,
        "image": "",
        "received": false,
        "audio": "",
        "video": "",
        "text": "",
        "type": "STICKER_GIF",
        "sent": true,
        "conversationId": "",
        "sticker": "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/ShaunTheSheep256%2FShaunTheSheep-256px-19.gif?alt=media&token=35de2bb7-d3f3-4e6e-b41f-c2d29409ff1c",
        "createdAt": randomNeededDate(),
    }
]

let datingChatMessages: IMMessage[] = []

const generateMoreData = () => {

    for (let conversation of conversations) {
        for (let chatMessage of groupChatMessagesTestBase) {
            let newMessage = {
                ...chatMessage,
                _id: conversation._id + '-' + chatMessage._id,
                conversationId: conversation._id,
                createdAt: randomNeededDate(),
            }
            groupChatMessagesTest.push(newMessage)
        }
    }

    for (let conversation of datingConversations) {
        for (let user of datingUsers) {
            if (conversation.users.includes(user.uid)) {
                let datingMessagesGenerated: IMMessage[] = []
                for (let chatMessage of datingChatMessagesBase) {
                    let newMessage: IMMessage = {
                        ...chatMessage,
                        _id: conversation._id + '-' + chatMessage._id,
                        conversationId: conversation._id,
                        createdAt: randomNeededDate(),
                        user: (() => {
                            const testUser = datingUsers.filter((item) => item.uid === 'gEQMxRMVfjRLUngNJHKcIj1Impu1')[0]
                            let currentUser = Math.random() > 0.7 ? testUser : user
                            return {
                                name: currentUser.displayName,
                                _id: currentUser.uid,
                                avatar: currentUser.photoURL
                            }
                        })()
                    }
                    datingMessagesGenerated.push(newMessage)
                }
                datingChatMessages = datingChatMessages.concat(datingMessagesGenerated)
            }
        }
    }
}

export const migrateChatMessages = async () => {

    generateMoreData();

    // console.log('---datingChatMessages',datingChatMessages)
    // console.log('---groupChatMessagesTest',groupChatMessagesTest)

    // for (const message of datingChatMessages) {
    //     await firebase
    //         .firestore()
    //         .collection('chatMessages')
    //         .doc(message._id as string)
    //         .set(message);
    // }
    //
    // for (const message of groupChatMessagesTest) {
    //     await firebase
    //         .firestore()
    //         .collection('chatMessages')
    //         .doc(message._id as string)
    //         .set(message);
    // }
}

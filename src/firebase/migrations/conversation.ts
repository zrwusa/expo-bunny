import {firebase} from "../firebase";
import {Conversation} from "../../types";

export const conversations: Conversation[] = [
    {
        _id: "conversation-001",
        name: 'Car Fans',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/chatGroupPortraits%2Fcar-group.jpg?alt=media&token=179029e9-a687-45b2-94c1-12b48227ae7f',
        creatorId: 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
        users: ["BzoqTn3KZCXDWScp0fhKr8xGp2u2", "YtyPwHQsErYX6KH6DYLmQn7OQgn1", "gEQMxRMVfjRLUngNJHKcIj1Impu1", "hovkAoBO4SfArjeT0A9ydAEtfnF3", "iXtCc0Ad4KYxSv4eat3EdRLGCmC3", "vr9SRkq7ofOYiOQao6aTRkkMUEp1"],
        channelId: '',
        createdAt: 1620982332610,
        updatedAt: 1620982332610,
        // deletedAt: undefined
    },
    {
        _id: "conversation-002",
        name: 'RC Truck',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/chatGroupPortraits%2Frc-military-truck.jpg?alt=media&token=6722c0cd-1a1f-4e61-a96f-bb98c936d087',
        creatorId: 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
        users: ["BzoqTn3KZCXDWScp0fhKr8xGp2u2", "YtyPwHQsErYX6KH6DYLmQn7OQgn1", "gEQMxRMVfjRLUngNJHKcIj1Impu1", "hovkAoBO4SfArjeT0A9ydAEtfnF3", "iXtCc0Ad4KYxSv4eat3EdRLGCmC3", "vr9SRkq7ofOYiOQao6aTRkkMUEp1"],
        channelId: '',
        createdAt: 1620982332610,
        updatedAt: 1620982332610,
        // deletedAt: undefined
    },
    {
        _id: "conversation-003",
        name: 'RC Engine',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/chatGroupPortraits%2Frc-engine-toyan.jpg?alt=media&token=a93093ab-6d73-4cd4-839b-6a86f41a213a',
        creatorId: 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
        users: ["BzoqTn3KZCXDWScp0fhKr8xGp2u2", "YtyPwHQsErYX6KH6DYLmQn7OQgn1", "gEQMxRMVfjRLUngNJHKcIj1Impu1", "hovkAoBO4SfArjeT0A9ydAEtfnF3", "iXtCc0Ad4KYxSv4eat3EdRLGCmC3", "vr9SRkq7ofOYiOQao6aTRkkMUEp1"],
        channelId: '',
        createdAt: 1620982332610,
        updatedAt: 1620982332610,
        // deletedAt: undefined
    },
    {
        _id: "conversation-004",
        name: 'Cartoon',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/chatGroupPortraits%2Fcartoon.png?alt=media&token=3eab5db9-1068-4d08-b5cc-8f55280dfd13',
        creatorId: 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
        users: ["BzoqTn3KZCXDWScp0fhKr8xGp2u2", "YtyPwHQsErYX6KH6DYLmQn7OQgn1", "gEQMxRMVfjRLUngNJHKcIj1Impu1", "hovkAoBO4SfArjeT0A9ydAEtfnF3", "iXtCc0Ad4KYxSv4eat3EdRLGCmC3", "vr9SRkq7ofOYiOQao6aTRkkMUEp1"],
        channelId: '',
        createdAt: 1620982332610,
        updatedAt: 1620982332610,
        // deletedAt: undefined
    },
    {
        _id: "conversation-005",
        name: 'Fashion Thinking',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/chatGroupPortraits%2Ffashion-thinking.jpg?alt=media&token=f343f266-0a95-4da4-b23e-2e3c3bc5c53f',
        creatorId: 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
        users: ["BzoqTn3KZCXDWScp0fhKr8xGp2u2", "YtyPwHQsErYX6KH6DYLmQn7OQgn1", "gEQMxRMVfjRLUngNJHKcIj1Impu1", "hovkAoBO4SfArjeT0A9ydAEtfnF3", "iXtCc0Ad4KYxSv4eat3EdRLGCmC3", "vr9SRkq7ofOYiOQao6aTRkkMUEp1"],
        channelId: '',
        createdAt: 1620982332610,
        updatedAt: 1620982332610,
        // deletedAt: undefined
    },
    {
        _id: "conversation-006",
        name: 'Mars',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/chatGroupPortraits%2Fmars.jpg?alt=media&token=0cbae91c-631b-4a24-aa18-555ebd0ea4e0',
        creatorId: 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
        users: ["BzoqTn3KZCXDWScp0fhKr8xGp2u2", "YtyPwHQsErYX6KH6DYLmQn7OQgn1", "gEQMxRMVfjRLUngNJHKcIj1Impu1", "hovkAoBO4SfArjeT0A9ydAEtfnF3", "iXtCc0Ad4KYxSv4eat3EdRLGCmC3", "vr9SRkq7ofOYiOQao6aTRkkMUEp1"],
        channelId: '',
        createdAt: 1620982332610,
        updatedAt: 1620982332610,
        // deletedAt: undefined
    },
    {
        _id: "conversation-007",
        name: 'Fashion',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/chatGroupPortraits%2Ffashion.jpg?alt=media&token=4b1853ee-4dd8-477d-9611-6689854e77c9',
        creatorId: 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
        users: ["BzoqTn3KZCXDWScp0fhKr8xGp2u2", "YtyPwHQsErYX6KH6DYLmQn7OQgn1", "gEQMxRMVfjRLUngNJHKcIj1Impu1", "hovkAoBO4SfArjeT0A9ydAEtfnF3", "iXtCc0Ad4KYxSv4eat3EdRLGCmC3", "vr9SRkq7ofOYiOQao6aTRkkMUEp1"],
        channelId: '',
        createdAt: 1620982332610,
        updatedAt: 1620982332610,
        // deletedAt: undefined
    },
    {
        _id: "conversation-008",
        name: 'Mcenany',
        avatar: 'https://xxx.com',
        creatorId: 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
        users: ["BzoqTn3KZCXDWScp0fhKr8xGp2u2", "YtyPwHQsErYX6KH6DYLmQn7OQgn1", "gEQMxRMVfjRLUngNJHKcIj1Impu1", "hovkAoBO4SfArjeT0A9ydAEtfnF3", "iXtCc0Ad4KYxSv4eat3EdRLGCmC3", "vr9SRkq7ofOYiOQao6aTRkkMUEp1"],
        channelId: '',
        createdAt: 1620982332610,
        updatedAt: 1620982332610,
        // deletedAt: undefined
    },
    {
        _id: "conversation-009",
        name: '3C',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/chatGroupPortraits%2F3c.jpg?alt=media&token=9eb660c5-18f2-49fe-890e-c98e7d743816',
        creatorId: 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
        users: ["BzoqTn3KZCXDWScp0fhKr8xGp2u2", "YtyPwHQsErYX6KH6DYLmQn7OQgn1", "gEQMxRMVfjRLUngNJHKcIj1Impu1", "hovkAoBO4SfArjeT0A9ydAEtfnF3", "iXtCc0Ad4KYxSv4eat3EdRLGCmC3", "vr9SRkq7ofOYiOQao6aTRkkMUEp1"],
        channelId: '',
        createdAt: 1620982332610,
        updatedAt: 1620982332610,
        // deletedAt: undefined
    },
    {
        _id: "conversation-010",
        name: 'Trump',
        avatar: 'https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/portraits%2Fi.jpg?alt=media&token=e51deb19-6fa4-451a-b2fc-9e92f52db343',
        creatorId: 'gEQMxRMVfjRLUngNJHKcIj1Impu1',
        users: ["BzoqTn3KZCXDWScp0fhKr8xGp2u2", "YtyPwHQsErYX6KH6DYLmQn7OQgn1", "gEQMxRMVfjRLUngNJHKcIj1Impu1", "hovkAoBO4SfArjeT0A9ydAEtfnF3", "iXtCc0Ad4KYxSv4eat3EdRLGCmC3", "vr9SRkq7ofOYiOQao6aTRkkMUEp1"],
        channelId: '',
        createdAt: 1620982332610,
        updatedAt: 1620982332610,
        // deletedAt: undefined
    }
]

export const migrateConversations = async () => {
    for (const conversation of conversations) {
        await firebase
            .firestore()
            .collection('conversations')
            .doc(conversation._id)
            .set(conversation)
    }
}

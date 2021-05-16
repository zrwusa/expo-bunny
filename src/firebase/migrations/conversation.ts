import {firebase} from "../firebase";
import {Conversation} from "../../types";

const conversations: Conversation[] = [
    {
        _id: "conversation-001",
        name: 'Conversation 001',
        icon: 'https://xxx.com',
        creatorId: 'G39wPYnspoRacDCXXGcptuEJHky2',
        users: ["G39wPYnspoRacDCXXGcptuEJHky2", "pnaJWwEpZLf0IlMZbScjh0wfDKP2", "tBINx8zZrcPrJnCP4sQV95pbFU73"],
        channelId: '',
        createdAt: 1620982332610,
        updatedAt: 1620982332610,
        // deletedAt: undefined
    },
    {
        _id: "conversation-002",
        name: 'Conversation 002',
        icon: 'https://xxx.com',
        creatorId: 'G39wPYnspoRacDCXXGcptuEJHky2',
        users: ['G39wPYnspoRacDCXXGcptuEJHky2'],
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

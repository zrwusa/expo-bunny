import {firebase} from "../firebase";

const demoVideo = "https://raw.githubusercontent.com/zrwusa/assets/master/videos/big-buck-bunny.mp4";
const demoAudio = "https://www.kozco.com/tech/LRMonoPhase4.wav";

const chatMessagesDev = {
    "78437f40-bbca-48a8-8fbd-e30a660bec65": {
        "_id": "78437f40-bbca-48a8-8fbd-e30a660bec65",
        "audio": demoAudio,
        "createdAt": 1620726541122,
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "user": {
            "_id": "pnaJWwEpZLf0IlMZbScjh0wfDKP2",
            "avatar": "https://lh3.googleusercontent.com/a-/AOh14GgkbmDGHEhu-V3uLunUJ0IBCBnO5ll-VL8RBnCU=s96-c",
            "name": "Pablo Rios"
        }
    },
    "86fbff89-ee32-41cf-8133-a28c1131d1f8": {
        "_id": "86fbff89-ee32-41cf-8133-a28c1131d1f8",
        "createdAt": 1620727083967,
        "image": "https://asset.kompas.com/crops/Y51dQ3fy_sACbi7JJnAj5KOkQfc=/0x0:960x640/750x500/data/photo/2021/01/10/5ffb167d0af9b.jpg",
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "user": {
            "_id": "64qQ5XaPLZeTsRqPdDAkjsWc9Hx2",
            "avatar": "",
            "name": "defaultName"
        }
    },
    "9211b9a5-9c7e-472b-b27a-049358c65852": {
        "_id": "9211b9a5-9c7e-472b-b27a-049358c65852",
        "createdAt": 1620726660536,
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "text": "This is a text",
        "user": {
            "_id": "64qQ5XaPLZeTsRqPdDAkjsWc9Hx2",
            "avatar": "",
            "name": "defaultName"
        }
    },
    "9e100c14-f821-47aa-b040-52c500790297": {
        "_id": "9e100c14-f821-47aa-b040-52c500790297",
        "audio": "",
        "createdAt": 1620812496797,
        "image": "",
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "sticker": "",
        "text": "",
        "type": "VIDEO",
        "user": {
            "_id": "64qQ5XaPLZeTsRqPdDAkjsWc9Hx2",
            "avatar": "",
            "name": "defaultName"
        },
        "video": demoVideo
    },
    "e8d2ad0d-d823-4ef2-a651-675833d76f21": {
        "_id": "e8d2ad0d-d823-4ef2-a651-675833d76f21",
        "audio": demoAudio,
        "createdAt": 1620813062008,
        "image": "",
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "sticker": "",
        "text": "",
        "type": "AUDIO",
        "user": {
            "_id": "pnaJWwEpZLf0IlMZbScjh0wfDKP2",
            "avatar": "https://lh3.googleusercontent.com/a-/AOh14GgkbmDGHEhu-V3uLunUJ0IBCBnO5ll-VL8RBnCU=s96-c",
            "name": "Pablo Rios"
        },
        "video": ""
    },
    "f8952842-f38d-42f1-8e26-4285adccb3d5": {
        "_id": "f8952842-f38d-42f1-8e26-4285adccb3d5",
        "audio": demoAudio,
        "createdAt": 1620813106371,
        "image": "",
        "pending": false,
        "received": false,
        "roomKey": "room_b",
        "sent": true,
        "sticker": "",
        "text": "",
        "type": "AUDIO",
        "user": {
            "_id": "tBINx8zZrcPrJnCP4sQV95pbFU73",
            "avatar": "",
            "name": "defaultName"
        },
        "video": ""
    }
}


const chatMessagesTest = {
    "29f3d16e-0687-4cb4-9af6-6814a45accd7": {
        "_id": "29f3d16e-0687-4cb4-9af6-6814a45accd7",
        "audio": "",
        "createdAt": 1620818998723,
        "image": "",
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "sticker": "",
        "text": "How about this afternoon",
        "type": "MESSAGE",
        "user": {
            "_id": "tBINx8zZrcPrJnCP4sQV95pbFU73",
            "avatar": "",
            "name": "defaultName"
        },
        "video": ""
    },
    "66b49ff5-5134-426d-9d38-0bf22d7a0b58": {
        "_id": "66b49ff5-5134-426d-9d38-0bf22d7a0b58",
        "audio": "",
        "createdAt": 1620819022563,
        "image": "",
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "sticker": "",
        "text": "How about this afternoon 👌",
        "type": "MESSAGE",
        "user": {
            "_id": "tBINx8zZrcPrJnCP4sQV95pbFU73",
            "avatar": "",
            "name": "defaultName"
        },
        "video": ""
    },
    "70316c15-a5d8-4e38-bb0b-5f4a852bb101": {
        "_id": "70316c15-a5d8-4e38-bb0b-5f4a852bb101",
        "audio": "",
        "createdAt": 1620819322586,
        "image": "",
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "sticker": "",
        "text": "I will go there tomorrow😀",
        "type": "MESSAGE",
        "user": {
            "_id": "pnaJWwEpZLf0IlMZbScjh0wfDKP2",
            "avatar": "https://lh3.googleusercontent.com/a-/AOh14GgkbmDGHEhu-V3uLunUJ0IBCBnO5ll-VL8RBnCU=s96-c",
            "name": "Ruiwen Zeng"
        },
        "video": ""
    },
    "78437f40-bbca-48a8-8fbd-e30a660bec65": {
        "_id": "78437f40-bbca-48a8-8fbd-e30a660bec65",
        "audio": "https://www.kozco.com/tech/LRMonoPhase4.wav",
        "createdAt": 1620726541122,
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "user": {
            "_id": "pnaJWwEpZLf0IlMZbScjh0wfDKP2",
            "avatar": "https://lh3.googleusercontent.com/a-/AOh14GgkbmDGHEhu-V3uLunUJ0IBCBnO5ll-VL8RBnCU=s96-c",
            "name": "Pablo Rios"
        }
    },
    "86fbff89-ee32-41cf-8133-a28c1131d1f8": {
        "_id": "86fbff89-ee32-41cf-8133-a28c1131d1f8",
        "createdAt": 1620727083967,
        "image": "https://asset.kompas.com/crops/Y51dQ3fy_sACbi7JJnAj5KOkQfc=/0x0:960x640/750x500/data/photo/2021/01/10/5ffb167d0af9b.jpg",
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "user": {
            "_id": "64qQ5XaPLZeTsRqPdDAkjsWc9Hx2",
            "avatar": "",
            "name": "defaultName"
        }
    },
    "9211b9a5-9c7e-472b-b27a-049358c65852": {
        "_id": "9211b9a5-9c7e-472b-b27a-049358c65852",
        "createdAt": 1620726660536,
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "text": "This is a text",
        "user": {
            "_id": "64qQ5XaPLZeTsRqPdDAkjsWc9Hx2",
            "avatar": "",
            "name": "defaultName"
        }
    },
    "9e100c14-f821-47aa-b040-52c500790297": {
        "_id": "9e100c14-f821-47aa-b040-52c500790297",
        "audio": "",
        "createdAt": 1620812496797,
        "image": "",
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "sticker": "",
        "text": "",
        "type": "VIDEO",
        "user": {
            "_id": "64qQ5XaPLZeTsRqPdDAkjsWc9Hx2",
            "avatar": "",
            "name": "defaultName"
        },
        "video": "https://raw.githubusercontent.com/zrwusa/assets/master/videos/big-buck-bunny.mp4"
    },
    "e5f1fcad-739a-4060-ae1a-28c6a255d821": {
        "_id": "e5f1fcad-739a-4060-ae1a-28c6a255d821",
        "audio": "",
        "createdAt": 1620819298786,
        "image": "",
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "sticker": "",
        "text": "Today I will be busy",
        "type": "MESSAGE",
        "user": {
            "_id": "pnaJWwEpZLf0IlMZbScjh0wfDKP2",
            "avatar": "https://lh3.googleusercontent.com/a-/AOh14GgkbmDGHEhu-V3uLunUJ0IBCBnO5ll-VL8RBnCU=s96-c",
            "name": "Ruiwen Zeng"
        },
        "video": ""
    },
    "e8d2ad0d-d823-4ef2-a651-675833d76f21": {
        "_id": "e8d2ad0d-d823-4ef2-a651-675833d76f21",
        "audio": "https://www.kozco.com/tech/LRMonoPhase4.wav",
        "createdAt": 1620813062008,
        "image": "",
        "pending": false,
        "received": true,
        "roomKey": "room_b",
        "sent": true,
        "sticker": "",
        "text": "",
        "user": {
            "_id": "pnaJWwEpZLf0IlMZbScjh0wfDKP2",
            "avatar": "https://lh3.googleusercontent.com/a-/AOh14GgkbmDGHEhu-V3uLunUJ0IBCBnO5ll-VL8RBnCU=s96-c",
            "name": "Ruiwen Zeng"
        },
        "video": ""
    },
    "f8952842-f38d-42f1-8e26-4285adccb3d5": {
        "_id": "f8952842-f38d-42f1-8e26-4285adccb3d5",
        "audio": "https://www.kozco.com/tech/LRMonoPhase4.wav",
        "createdAt": 1620813106371,
        "image": "",
        "pending": true,
        "received": false,
        "roomKey": "room_b",
        "sent": false,
        "sticker": "",
        "text": "",
        "type": "AUDIO",
        "user": {
            "_id": "tBINx8zZrcPrJnCP4sQV95pbFU73",
            "avatar": "",
            "name": "defaultName"
        },
        "video": ""
    }
}


export const migrateChatMessages = async () => {
    await firebase
        .database()
        .ref('chatMessages')
        .set(chatMessagesDev);
}

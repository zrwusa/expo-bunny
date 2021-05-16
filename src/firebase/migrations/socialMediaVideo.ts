import {uuidV4} from "../../utils";
import {firebase} from "../firebase";

const socialMediaVideos = [
    {
        _id: 'social-media-video-001',
        category: 'VIDEO',
        user: 'aladdin',
        userAvatar: {uri: 'https://i.pinimg.com/236x/a6/cd/0a/a6cd0a15d5b2909539dd7944201127d2.jpg'},
        avSource: {uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'},
        likes: 6218,
        comments: [
            {
                id: uuidV4(),
                text: 'Love from DUBAI Jimmy 😁. You are our early morning show, instead of late night 😱😂💜\n' +
                    'You and your team are doing great job 👏🏼💜'
            }
        ]
    },
    {
        _id: 'social-media-video-002',
        category: 'VIDEO',
        user: 'Cars with Ivan',
        userAvatar: {uri: 'https://i.pinimg.com/236x/44/2f/b4/442fb435dfe1ba7ee31c1ee771e5fa01.jpg'},
        avSource: {uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/videos/mini-pc.mp4'},
        likes: 87356,
        comments: [
            {
                id: uuidV4(),
                text: 'I think I can fit my aunt in this one!'
            }
        ]
    },
    {
        _id: 'social-media-video-003',
        category: 'VIDEO',
        user: 'real cop',
        userAvatar: {uri: 'https://i.pinimg.com/236x/b7/1a/09/b71a09aec5c36e3ac5d4919ca3b34076.jpg'},
        avSource: {uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/videos/pickup-truck.mp4'},
        likes: 987642,
        comments: [
            {
                id: uuidV4(),
                text: 'This is the BEST YouTube channel for watching Transformers transformations. No talking, no reviews, just step by step transformations. And a little video to show the G1 cartoon so you know who it is.Keep up it. Good work. My man. 💪👍'
            }
        ]
    },
    {
        _id: 'social-media-video-004',
        category: 'VIDEO',
        user: 'tiger finca',
        userAvatar: {uri: 'https://i.pinimg.com/236x/e4/01/38/e40138e42ba1201b3f73412f526b6cb2.jpg'},
        avSource: {uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/videos/big-buck-bunny.mp4'},
        likes: 69,
        comments: [
            {
                id: uuidV4(),
                text: 'Love from DUBAI Jimmy'
            }
        ]
    },
    {
        _id: 'social-media-video-005',
        category: 'IMAGE',
        user: 'McEnany',
        userAvatar: {uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/mcenany-avatar.jpeg'},
        imageSource: {uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/mcenany.jpeg'},
        likes: 69,
        comments: [
            {
                id: uuidV4(),
                text: 'Love from DUBAI Jimmy'
            }
        ]
    }
]

export const migrateSocialMediaVideos = async () => {

    for (const socialMediaVideo of socialMediaVideos) {
        await firebase
            .firestore()
            .collection('socialMediaVideos')
            .doc(socialMediaVideo._id)
            .set(socialMediaVideo);
    }
}

//Data models, such as database entities, api return value entities
import {ImageSourcePropType, ImageURISource} from "react-native";
import {AVPlaybackSource} from "../../packages/expo-av/src/AV";
import {SagaTodo} from "./states";
import {IMessage} from "../../packages/react-native-gifted-chat/src";
import firebase from "firebase";
import {StoredUser} from "./auth";

export type DemoEmployee = {
    _id: number,
    first_name: string,
    last_name: string,
    email: string,
}

export type NearbyFilm = {
    id: string,
    title: string,
    coordinate: {
        latitude: number,
        longitude: number,
    },
    image: ImageSourcePropType | {
        uri: string,
    },
    description: string,
}

export type Region = {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number,
}

export type DemoSaga = {
    id: number,
    text: string
}

export type SocialMediaVideoCardCommentDatum = {
    id: string,
    text: string
}
export type SocialMediaVideoCardCategory = 'IMAGE' | 'VIDEO'
export type SocialMediaMainDatum = {
    id: string,
    category: SocialMediaVideoCardCategory,
    user: string,
    userAvatar: ImageSourcePropType,
    avSource?: AVPlaybackSource,
    imageSource?: ImageSourcePropType,
    likes: number,
    comments: SocialMediaVideoCardCommentDatum[]
}

export type SocialMediaImageDatum = {
    id: string,
    text: string,
    uri: string
}

export type DemoSearchDummyDatum = { id: number, text: string }


export interface DemoNearbyFilms {
    "coordinate": { "latitude": number, "longitude": number },
    "image": { "uri": string },
    "_id": string,
    "title": string,
    "description": string,
    "__v": number
}

export interface UserProfile {
    email: string
}

export type IMMessageType = 'MESSAGE' | 'IMAGE' | 'STICKER_GIF' | 'AUDIO' | 'VIDEO' | ''

export interface IMMessage extends IMessage {
    conversationId: string,
    type: IMMessageType,
}

export interface ChatRoom {
    _id: string,
    name: string,
}

export interface UserPhoto extends ImageURISource {
}

// create schema for the DB
export interface SchemaRealtimeDB {
    todoList: SagaTodo,
    // region: Region,
    // chatRooms: ChatRoom,
    // chatMessages: IMMessage,
    // usersWithPhotos: { [key: string]: UserPhoto[] },
    // [name: string]: any
}

export interface DemoFirestore {
    name: string,
    keywords: string
}

export interface Conversation {
    _id: string,
    avatar: string,
    name: string,
    creatorId: string,
    users: string[],
    channelId: string,
    createdAt: number,
    updatedAt: number,
    deletedAt?: number
}


export interface UserContact {
    contactId: string,
    firstName: string,
    lastName: string,
    createdAt: number,
    updatedAt: number
}

export interface SchemaFirestore {
    demoFirestore: DemoFirestore,
    chatMessages: IMMessage,
    currentUserConversationsMessages: IMMessage,
    conversations: Conversation,
    storedUsers: StoredUser,
    storedUser: StoredUser,
    userContacts: UserContact,
    demoNearbyFilms: NearbyFilm,
    socialMediaVideos: SocialMediaMainDatum,
    socialMediaImages: SocialMediaImageDatum,
    users: firebase.UserInfo,
    usersWithPhotos: { [key: string]: { [key: string]: ImageURISource } }
}

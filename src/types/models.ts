//Data models, such as database entities, api return value entities
import {ImageSourcePropType, ImageURISource} from "react-native";
import {AVPlaybackSource} from "../../packages/expo-av/src/AV";
import {SagaTodo} from "./states";
import {IMessage} from "../../packages/react-native-gifted-chat/src";

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
    roomKey: string,
    type: IMMessageType,
    sticker?: string
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
    // demoNearbyFilms: NearbyFilm,
    // region: Region,
    socialMediaVideos: SocialMediaMainDatum,
    socialMediaImages: SocialMediaImageDatum,
    chatRooms: ChatRoom,
    chatMessages: IMMessage,
    usersWithPhotos: { [key: string]: UserPhoto[] },

    // [name: string]: any
}

export interface DemoFirestore {
    name: string,
    keywords: string
}

export interface SchemaFirestore {
    demoFirestore: DemoFirestore,
    usersWithPhotos: { [key: string]: { [key: string]: ImageURISource } }
}

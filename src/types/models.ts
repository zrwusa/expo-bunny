//Data models, such as database entities, api return value entities
import {ImageSourcePropType} from "react-native";
import {AVPlaybackSource} from "expo-av/src/AV";
import {SagaTodo} from "./states";

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

export interface IMMessage {
    _id: string,
    text: string,
    createdAt: Date,
    roomKey: string,
    user: {
        _id: string,
        name: string,
        avatar: string,
    },
}

export interface ChatRoom {
    _id: string,
    name: string,
}

// create schema for the DB
export interface DBSchema {
    todoList: SagaTodo,
    // demoNearbyFilms: NearbyFilm,
    // region: Region,
    socialMediaVideos: SocialMediaMainDatum,
    socialMediaImages: SocialMediaImageDatum,
    chatRooms: ChatRoom,
    chatMessages: IMMessage,
    [name: string]: any
}

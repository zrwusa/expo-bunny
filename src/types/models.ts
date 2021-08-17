//Data models, such as database entities, api return value entities
import {ImageSourcePropType, ImageURISource} from 'react-native';
import {AVPlaybackSource} from '../../packages/expo-av/src/AV';
import {SagaTodo} from './states';
import {IMessage} from '../components/BunnyChat';
import firebase from 'firebase';
import {StoredUser} from './auth';

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

// create schema for the DB
export interface SchemaRealtimeDB {
    todoList: SagaTodo,
    // [name: string]: any
}

export interface DemoFirestore {
    name: string,
    keywords: string[]
}

export interface Conversation {
    _id: string,
    type: string,
    avatar: string,
    name: string,
    creatorId: string,
    users: string[],
    channelId: string,
    createdAt: Date | number,
    updatedAt: Date | number,
    deletedAt?: Date | number,
}

export interface UserContact {
    contactId: string,
    firstName: string,
    lastName: string,
    createdAt: number,
    updatedAt: number
}

export interface Occupation {
    name: string,
    type: string,
    sort: number,
    displayLevel: number,
    category: string,
    code: string
}

export interface University {
    alphaTwoCode: string,
    domains: string[],
    webPages: string[],
    stateProvince: string | null,
    country: string,
    name: string
}

export interface Religion {
    display: string,
    code: string,
    definition: string,
    id: string,
}

export interface OccupationCategory {
    name: string,
    type: string,
    sort: number,
    displayLevel: number,
    code: string,
}

export interface Translation {
    [key: string]: string
}

export interface Timezone {
    abbreviation: string,
    gmtOffset: number,
    gmtOffsetName: string,
    tzName: string,
    zoneName: string,
}

export interface Country {
    emoji: string,
    emojiU: string,
    capital: string,
    currency_symbol: string,
    currency: string,
    id: number,
    iso2: string,
    iso3: string,
    latitude: string,
    longitude: string,
    name: string,
    native: string,
    phone_code: string,
    region: string,
    subregion: string,
    tld: string,
    timezones: Timezone[],
    translations: Translation,
}


export type OccupationTreeNode = {
    name: string,
    code: string,
    type?: string,
    sort?: number | null,
    displayLevel?: number,
    category?: string,
    children?: OccupationTreeNode[]
}

// TODO key not in Omit
export type TreeNodePickerNode = {
    name: string,
    code: string,
} & { [key in string]?: TreeNodePickerNode[] }

export interface State {
    _id: string,
    id: number,
    countryId: number,
    name: string,
    phoneCode: string,
    stateCode: string,
}

export interface City {
    _id: string,
    id: number,
    countryId: number,
    stateId: number,
    name: string,
    phoneCode: string,
    stateCode: string,
    latitude: string,
    longitude: string,
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
    usersWithPhotos: { [key: string]: { [key: string]: ImageURISource } },
    occupations: Occupation,
    occupationCategories: OccupationCategory,
}


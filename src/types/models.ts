//Data models, such as database entities, api return value entities
import {ImageSourcePropType} from "react-native";
import {AVPlaybackSource} from "expo-av/src/AV";

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

export type IGHomeCardCommentDatum = {
    id: string,
    text: string
}
export type IGHomeCardCategory = 'IMAGE'|'VIDEO'
export type IGHomeCardDatum = {
    id: string,
    category:IGHomeCardCategory,
    user: string,
    userAvatar: ImageSourcePropType,
    avSource?: AVPlaybackSource,
    imageSource?:ImageSourcePropType,
    likes: number,
    comments: IGHomeCardCommentDatum[]
}

export type IGHomeBrick = {
    id: string,
    text: string,
    uri: string
}

export type DemoSearchDummyDatum = { id: number, text: string }


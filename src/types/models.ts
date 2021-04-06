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

export type IGMediaCardCommentDatum = {
    id: string,
    text: string
}
export type IGMediaCardCategory = 'IMAGE' | 'VIDEO'
export type IGMediaCardDatum = {
    id: string,
    category: IGMediaCardCategory,
    user: string,
    userAvatar: ImageSourcePropType,
    avSource?: AVPlaybackSource,
    imageSource?: ImageSourcePropType,
    likes: number,
    comments: IGMediaCardCommentDatum[]
}

export type IGMediaBrick = {
    id: string,
    text: string,
    uri: string
}

export type DemoSearchDummyDatum = { id: number, text: string }


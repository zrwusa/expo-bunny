//Data models, such as database entities, api return value entities
import {ImageSourcePropType} from "react-native";

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

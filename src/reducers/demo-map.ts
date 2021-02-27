import {EDemoMap} from "../constants";
import BunnyConstants from "../constants/constants";
import {DemoMapState, NearbyFilm, Region} from "../types/models";
import {DemoMapActions} from "../actions";
import {uuidV4} from "../utils";

const initialState = {
    demoNearbyFilms: [
        {
            "id": uuidV4(),
            "coordinate": {
                "latitude": 5.466971669240216,
                "longitude": 100.27973582460281,
            },
            "title": "initialed title",
            "description": "This is the best place in Portland",
            "image": require('../assets/images/bunny1.jpg')
        },
        {
            "id": uuidV4(),
            "coordinate": {
                "latitude": 5.465477663942769,
                "longitude": 100.28043933880761
            },
            "title": "Best Place",
            "description": "This is the best place in Portland",
            "image": {uri: "https://raw.githubusercontent.com/zrwusa/assets/master/images/bunny2.jpg"}
        },
        {
            "id": uuidV4(),
            "coordinate": {
                "latitude": 5.463586808144262,
                "longitude": 100.28481285211431
            },
            "title": "Second Best Place",
            "description": "This is the second best place in Portland",
            "image": require('../assets/images/bunny3.jpg')
        },
        {
            "id": uuidV4(),
            "coordinate": {
                "latitude": 5.46658649635612,
                "longitude": 100.28283128710403
            },
            "title": "Third Best Place",
            "description": "This is the third best place in Portland",
            "image": require('../assets/images/bunny4.jpg')
        }
    ],
    region: {
        latitude: 5.466971669240216,
        longitude: 100.27973582460281,
        ...BunnyConstants.latLngDeltaGrace
    }
};

export function demoMapStateReducer(prevState: DemoMapState = initialState, {type, payload}: DemoMapActions): DemoMapState {
    switch (type) {
        case EDemoMap.RESTORE_NEARBY_FILMS: {
            for (let item of payload) {
                item.id = uuidV4()
            }
            return {
                ...prevState,
                demoNearbyFilms: <NearbyFilm[]>payload,
            };
        }
        case EDemoMap.RESTORE_REGION: {
            return {
                ...prevState,
                region: <Region>payload,
            }
        }
        default:
            return prevState;
    }
}



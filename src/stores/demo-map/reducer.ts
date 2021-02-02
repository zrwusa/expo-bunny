import {EDemoMap} from "../../utils/constants";
import BunnyConstants from "../../utils/constants";
import {DemoMap, NearbyFilm, Region} from "../../types/models";
import {DemoMapActions} from "./actions";

const initialState: DemoMap = {
    demoNearbyFilms: [
        {
            "coordinate": {
                "latitude": 5.466971669240216,
                "longitude": 100.27973582460281,
            },
            "title": "initialed title",
            "description": "This is the best place in Portland",
            "image": require('../../assets/bunny1.jpg')
        },
        {
            "coordinate": {
                "latitude": 5.465477663942769,
                "longitude": 100.28043933880761
            },
            "title": "Best Place",
            "description": "This is the best place in Portland",
            "image": {uri:"https://raw.githubusercontent.com/zrwusa/assets/master/images/bunny2.jpg"}
        },
        {
            "coordinate": {
                "latitude": 5.463586808144262,
                "longitude": 100.28481285211431
            },
            "title": "Second Best Place",
            "description": "This is the second best place in Portland",
            "image": require('../../assets/bunny3.jpg')
        },
        {
            "coordinate": {
                "latitude": 5.46658649635612,
                "longitude": 100.28283128710403
            },
            "title": "Third Best Place",
            "description": "This is the third best place in Portland",
            "image": require('../../assets/bunny4.jpg')
        }
    ],
    region: {
        latitude: 5.466971669240216,
        longitude: 100.27973582460281,
        ...BunnyConstants.latLngDeltaGrace
    }
};

export function demoMapReducer(state: DemoMap = initialState, {type, payload}: DemoMapActions): DemoMap {
    switch (type) {
        case EDemoMap.RESTORE_NEARBY_FILMS: {
            return {
                ...state,
                demoNearbyFilms: <NearbyFilm[]>payload,
            };
        }
        case EDemoMap.RESTORE_REGION: {
            return {
                ...state,
                region: <Region>payload,
            }
        }
        default:
            return state;
    }
}



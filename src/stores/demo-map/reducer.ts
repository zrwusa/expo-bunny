import {DemoMapActions} from "./actions";
import {DemoMap, NearbyFilm, Region} from "../../types/models";
import {EDemoMap} from "../../types/constants";
import {latLngDeltaGrace} from "../../common/constants";

export const initialState: DemoMap = {
    demoNearbyFilms: [{
        "coordinate": {
            "latitude": 5.466971669240216,
            "longitude": 100.27973582460281,
        },
        "title": "Best Place",
        "description": "This is the best place in Portland",
        "image": {
            "uri": "https://i.imgur.com/sNam9iJ.jpg"
        }
    }],
    region: {
        latitude: 5.466971669240216,
        longitude: 100.27973582460281,
        ...latLngDeltaGrace
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



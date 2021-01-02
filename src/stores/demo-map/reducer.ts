import {DemoMapActions} from "./actions";
import {DemoMap} from "../../types/models";
import {EDemoMap} from "../../types/constants";

export const initialState: DemoMap = {
    demoNearbyFilms: [{
        "coordinate": {
            "latitude": 45.524548,
            "longitude": -122.6749817
        },
        "title": "Best Place",
        "description": "This is the best place in Portland",
        "image": {
            "uri": "https://i.imgur.com/sNam9iJ.jpg"
        }
    }],
    region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068
    }
};

export function demoMapReducer(state: DemoMap = initialState, {type, payload}: DemoMapActions): DemoMap {
    switch (type) {
        case EDemoMap.RESTORE_NEARBY_FILMS: {
            return {
                ...state,
                demoNearbyFilms:payload,
            };
        }
        default:
            return state;
    }
}



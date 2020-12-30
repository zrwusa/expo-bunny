import {EDemoHelloStateAction} from "./constants";
import {IDemoHelloState} from "./models";
import {IDemoHelloStateAction} from "./actions";

export const initialState: IDemoHelloState = {
    name: "name default",
    order: 0,
};

export function demoHelloStateReducer(state: IDemoHelloState = initialState, {type, payload}: IDemoHelloStateAction): IDemoHelloState {
    switch (type) {
        case EDemoHelloStateAction.ACTION_ONE: {
            console.log(`${EDemoHelloStateAction.ACTION_ONE} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        case EDemoHelloStateAction.ACTION_TWO: {
            console.log(`${EDemoHelloStateAction.ACTION_TWO} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        default:
            return state;
    }
}



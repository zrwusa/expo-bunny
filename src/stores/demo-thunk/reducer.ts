import {DemoThunkActions} from "./actions";
import {IDemoThunk} from "../../types/models";
import {EDemoThunk} from "../../types/constants";

export const initialState: IDemoThunk = {
    text: "text default",
    id: 0,
};

export function demoThunkReducer(state: IDemoThunk = initialState, {type, payload}: DemoThunkActions): IDemoThunk {
    switch (type) {
        case EDemoThunk.DEMO_THUNK_SUCCESS: {
            console.log(`${EDemoThunk.DEMO_THUNK_SUCCESS} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        case EDemoThunk.DEMO_THUNK_FAILED: {
            console.log(`${EDemoThunk.DEMO_THUNK_FAILED} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        default:
            return state;
    }
}



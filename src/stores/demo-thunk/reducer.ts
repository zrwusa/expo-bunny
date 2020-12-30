import {EDemoThunkAction} from "./constants";
import {IDemoThunk} from "./models";
import {IDemoThunkAction} from "./actions";

export const initialState: IDemoThunk = {
    text: "text default",
    id: 0,
};

export function demoThunkReducer(state: IDemoThunk = initialState, {type, payload}: IDemoThunkAction): IDemoThunk {
    switch (type) {
        case EDemoThunkAction.ACTION_DEMO_THUNK_SUCCESS: {
            console.log(`${EDemoThunkAction.ACTION_DEMO_THUNK_SUCCESS} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        case EDemoThunkAction.ACTION_DEMO_THUNK_FAIL: {
            console.log(`${EDemoThunkAction.ACTION_DEMO_THUNK_FAIL} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        default:
            return state;
    }
}



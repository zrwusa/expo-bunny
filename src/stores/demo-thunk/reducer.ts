import {DemoThunkActions} from "./actions";
import {DemoThunk} from "../../types/models";
import {EDemoThunk} from "../../types/constants";

export const initialState: DemoThunk = {
    text: "text default",
    id: 0,
};

export function demoThunkReducer(state: DemoThunk = initialState, {type, payload}: DemoThunkActions): DemoThunk {
    switch (type) {
        case EDemoThunk.DEMO_THUNK_SUCCESS: {
            console.log(`${EDemoThunk.DEMO_THUNK_SUCCESS} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        default:
            return state;
    }
}



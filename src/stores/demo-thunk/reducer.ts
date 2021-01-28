import {DemoThunkActions} from "./actions";
import {DemoThunk} from "../../types/models";
import {EDemoThunk} from "../../utils/constants";

const initialState: DemoThunk = {
    text: "initialed text",
    id: 0
};

export function demoThunkReducer(state: DemoThunk = initialState, {type, payload}: DemoThunkActions): DemoThunk {
    switch (type) {
        case EDemoThunk.DEMO_THUNK_SUCCESS: {
            return {
                ...state,
                ...payload,
            };
        }
        default:
            return state;
    }
}



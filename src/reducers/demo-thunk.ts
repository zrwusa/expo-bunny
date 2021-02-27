import {DemoThunkActions} from "../actions";
import {DemoThunkState} from "../types";
import {EDemoThunk} from "../constants";


export function demoThunkStateReducer(prevState: DemoThunkState = {
    text: "initialed text",
    id: 0
}, {type, payload}: DemoThunkActions): DemoThunkState {
    switch (type) {
        case EDemoThunk.DEMO_THUNK_SUCCESS: {
            return {
                ...prevState,
                ...payload,
            };
        }
        default:
            return prevState;
    }
}



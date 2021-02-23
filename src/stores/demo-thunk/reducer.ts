import {DemoThunkActions} from "./actions";
import {DemoThunk} from "../../types/models";
import {EDemoThunk} from "../../constants/constants";

const initialState: DemoThunk = {
    text: "initialed text",
    id: 0
};

export function demoThunkReducer(prevState: DemoThunk = initialState, {type, payload}: DemoThunkActions): DemoThunk {
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



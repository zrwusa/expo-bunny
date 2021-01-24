import {EDemoHello} from "../../common/constants";
import {DemoHello} from "../../types/models";
import {DemoHelloActions} from "./actions";

const initialState: DemoHello = {
    name: "initialed name",
    order: 0
};

export function demoHelloStateReducer(state: DemoHello = initialState, {type, payload}: DemoHelloActions): DemoHello {
    switch (type) {
        case EDemoHello.DEMO_HELLO: {
            return {
                ...state,
                ...payload,
            };
        }
        case EDemoHello.DEMO_HELLO2: {
            return {
                ...state,
                ...payload,
            };
        }
        default:
            return state;
    }
}



import {EDemoHello} from "../../constants";
import {DemoHello} from "../../types/models";
import {DemoHelloActions} from "./actions";

const initialState: DemoHello = {
    name: "initialed name",
    order: 0
};

export function demoHelloStateReducer(prevState: DemoHello = initialState, {type, payload}: DemoHelloActions): DemoHello {
    switch (type) {
        case EDemoHello.DEMO_HELLO: {
            return {
                ...prevState,
                ...payload,
            };
        }
        case EDemoHello.DEMO_HELLO2: {
            return {
                ...prevState,
                ...payload,
            };
        }
        default:
            return prevState;
    }
}



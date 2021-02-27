import {EDemoHello} from "../constants";
import {DemoHelloState} from "../types/models";
import {DemoHelloActions} from "../actions";


export function demoHelloStateReducer(
    prevState: DemoHelloState = {
        name: "initialed name",
        order: 0
    }, {type, payload}: DemoHelloActions): DemoHelloState {
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



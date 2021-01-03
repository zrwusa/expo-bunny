import {DemoHelloActions} from "./actions";
import {DemoHello} from "../../types/models";
import {EDemoHello} from "../../types/constants";

export const initialState: DemoHello = {
    name: "name default",
    order: 0
};

export function demoHelloStateReducer(state: DemoHello = initialState, {type, payload}: DemoHelloActions): DemoHello {
    switch (type) {
        case EDemoHello.DEMO_HELLO: {
            console.log(`${EDemoHello.DEMO_HELLO} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        case EDemoHello.DEMO_HELLO2: {
            console.log(`${EDemoHello.DEMO_HELLO2} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        default:
            return state;
    }
}



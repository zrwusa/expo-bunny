import {EDemoHello} from "../constants";
import {DemoHelloAction, DemoHello2Action, DemoHello2Payload, DemoHelloPayload} from "../types";

export const demoHello: (payload: DemoHelloPayload) => DemoHelloAction = (payload) => {
    return {
        type: EDemoHello.DEMO_HELLO,
        payload: payload,
    };
};

export const demoHello2: (payload: DemoHello2Payload) => DemoHello2Action = (payload) => {
    return {
        type: EDemoHello.DEMO_HELLO2,
        payload: payload,
    };
};

export type DemoHelloActions = DemoHelloAction | DemoHello2Action ;

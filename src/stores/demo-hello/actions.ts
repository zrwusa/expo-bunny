import {EDemoHello} from "./constants";
import {DemoHelloAction1Payload, DemoHelloAction2Payload} from "./payloads";

export interface DemoHelloAction1 {
    type: EDemoHello.ACTION_ONE;
    payload: DemoHelloAction1Payload;
}

export interface DemoHelloAction2 {
    type: EDemoHello.ACTION_TWO;
    payload: DemoHelloAction2Payload;
}

export const demoHelloAction1: (payload: DemoHelloAction1Payload) => DemoHelloAction1 = (payload) => {
    return {
        type: EDemoHello.ACTION_ONE,
        payload: payload,
    };
};

export const demoHelloAction2: (payload: DemoHelloAction2Payload) => DemoHelloAction2 = (payload) => {
    return {
        type: EDemoHello.ACTION_TWO,
        payload: payload,
    };
};


export type DemoHelloActions = DemoHelloAction1 | DemoHelloAction2 ;

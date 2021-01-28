import {EDemoHello} from "../../utils/constants";
import {DemoHello2Payload, DemoHelloPayload} from "../../types/payloads";
import {DemoHello, DemoHello2} from "../../types/actions";

export const demoHello: (payload: DemoHelloPayload) => DemoHello = (payload) => {
    return {
        type: EDemoHello.DEMO_HELLO,
        payload: payload,
    };
};

export const demoHello2: (payload: DemoHello2Payload) => DemoHello2 = (payload) => {
    return {
        type: EDemoHello.DEMO_HELLO2,
        payload: payload,
    };
};

export type DemoHelloActions = DemoHello | DemoHello2 ;

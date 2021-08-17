import {EDemoHello} from '../../constants';
import {DemoHello2Action, DemoHello2Payload, DemoHelloAction, DemoHelloPayload} from '../../types';

export const demoHello: (payload: DemoHelloPayload) => DemoHelloAction = (payload) => {
    return {
        type: EDemoHello.DEMO_HELLO,
        payload
    };
};

export const demoHello2: (payload: DemoHello2Payload) => DemoHello2Action = (payload) => {
    return {
        type: EDemoHello.DEMO_HELLO2,
        payload
    };
};

export type DemoHelloActions = DemoHelloAction | DemoHello2Action ;

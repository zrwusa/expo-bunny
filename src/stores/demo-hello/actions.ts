import {EDemoHelloStateAction} from "./constants";
import {IDemoHelloStateAction1Payload, IDemoHelloStateAction2Payload} from "./payloads";

export interface IDemoHelloStateAction1 {
    type: EDemoHelloStateAction.ACTION_ONE;
    payload: IDemoHelloStateAction1Payload;
}

export interface IDemoHelloStateAction2 {
    type: EDemoHelloStateAction.ACTION_TWO;
    payload: IDemoHelloStateAction2Payload;
}

export const demoHelloStateAction1: (payload: IDemoHelloStateAction1Payload) => IDemoHelloStateAction1 = (payload) => {
    console.log("demoHelloStateAction1 Action Creator");
    return {
        type: EDemoHelloStateAction.ACTION_ONE,
        payload: payload,
    };
};

export const demoHelloStateAction2: (payload: IDemoHelloStateAction2Payload) => IDemoHelloStateAction2 = (payload) => {
    console.log("demoHelloStateAction2 Action Creator");
    return {
        type: EDemoHelloStateAction.ACTION_TWO,
        payload: payload,
    };
};


export type IDemoHelloStateAction = IDemoHelloStateAction1 | IDemoHelloStateAction2 ;

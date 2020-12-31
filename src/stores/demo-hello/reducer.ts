import {EDemoHello} from "./constants";
import {DemoHello} from "./models";
import {DemoHelloActions} from "./actions";

export const initialState: DemoHello = {
    name: "name default",
    order: 0,
};

export function demoHelloStateReducer(state: DemoHello = initialState, {type, payload}: DemoHelloActions): DemoHello {
    switch (type) {
        case EDemoHello.ACTION_ONE: {
            console.log(`${EDemoHello.ACTION_ONE} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        case EDemoHello.ACTION_TWO: {
            console.log(`${EDemoHello.ACTION_TWO} Invoked With Payload:${JSON.stringify(payload)}`);
            return {
                ...state,
                ...payload,
            };
        }
        default:
            return state;
    }
}



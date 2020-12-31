import {DemoHello, Demo2} from "./demo-hello/models";
import {IDemoThunk} from "./demo-thunk/models";
import {Auth} from "./auth/models";

export * from "./demo-hello/models";
export * from "./demo-thunk/models";
export * from "./auth/models";

export interface IRootState {
    demoHelloState: DemoHello;
    demo2State: Demo2;
    demoThunkState: IDemoThunk;
    authState: Auth
}


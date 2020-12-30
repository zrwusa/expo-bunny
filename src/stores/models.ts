import {IDemoHelloState,IDemoState2} from "./demo-hello/models";
import {IUserState} from "./user/models";
import {IDemoThunk} from "./demo-thunk/models";
export * from "./demo-hello/models";
export * from "./demo-thunk/models";
export * from "./user/models";
export interface IRootState {
    demoHelloState: IDemoHelloState;
    demoState2: IDemoState2;
    userState:IUserState;
    demoThunkState:IDemoThunk
}


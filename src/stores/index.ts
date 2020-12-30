import { createStore, applyMiddleware, combineReducers } from "redux";
import {demoHelloStateReducer} from "./demo-hello";
import {userReducer} from "./user";
import thunkMiddleware from "redux-thunk";
import {demoThunkReducer} from "./demo-thunk";

const rootReducer = combineReducers({
    demoHelloState: demoHelloStateReducer,
    demoThunkState:demoThunkReducer,
    userState:userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

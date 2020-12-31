import { createStore, applyMiddleware, combineReducers } from "redux";
import {demoHelloStateReducer} from "./demo-hello";
import thunkMiddleware from "redux-thunk";
import {demoThunkReducer} from "./demo-thunk";
import {authReducer} from "./auth";

const rootReducer = combineReducers({
    demoHelloState: demoHelloStateReducer,
    demoThunkState:demoThunkReducer,
    authState:authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

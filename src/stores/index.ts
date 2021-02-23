import {createStore, applyMiddleware, combineReducers} from "redux";
import {demoHelloStateReducer} from "./demo-hello";
import thunkMiddleware from "redux-thunk";
import {demoThunkReducer} from "./demo-thunk";
import {sysStateReducer} from "./sys";
import {demoMapReducer} from "./demo-map";

const rootReducer = combineReducers({
    demoHelloState: demoHelloStateReducer,
    demoThunkState: demoThunkReducer,
    demoMapState: demoMapReducer,
    sysState: sysStateReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;

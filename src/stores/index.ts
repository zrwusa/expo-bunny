import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {demoHelloStateReducer, demoMapStateReducer, demoSagaReducer, demoThunkStateReducer, sysStateReducer} from "../reducers";
import {sagaDemoSagas} from "../sagas"


const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    demoHelloState: demoHelloStateReducer,
    demoThunkState: demoThunkStateReducer,
    demoMapState: demoMapStateReducer,
    sysState: sysStateReducer,
    demoSagaState: demoSagaReducer
});

// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
// you might choose one redux middleware which you prefer,just delete the demos you not prefer
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware));
sagaMiddleware.run(sagaDemoSagas);
export default store;

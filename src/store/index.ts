import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {blStateReducer, demoHelloStateReducer, demoMapStateReducer, demoSagaReducer, demoThunkStateReducer, sysStateReducer} from "./reducers";
import {sagaDemoSagas} from "./sagas"
import {demoBitcoinReducer} from "./reducers/demo-bitcoin";


const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    demoHelloState: demoHelloStateReducer,
    demoThunkState: demoThunkStateReducer,
    demoMapState: demoMapStateReducer,
    sysState: sysStateReducer,
    blResultState: blStateReducer,
    demoSagaState: demoSagaReducer,
    demoBitcoinState: demoBitcoinReducer,
});

// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
// you might choose one redux middleware which you prefer,just delete the demos you not prefer
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware));
sagaMiddleware.run(sagaDemoSagas);
// sagaMiddleware.run(saveQuickAlertSettingsSaga);
export default store;

import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {
    blStateReducer,
    demoCryptoCurrencyReducer,
    demoHelloStateReducer,
    demoMapStateReducer,
    demoSagaReducer,
    demoThunkStateReducer,
    sysStateReducer
} from "./reducers";
import {sagasGenerator} from "./sagas"
import {firebase} from "../firebase/firebase";
import {firebaseReducer} from "react-redux-firebase";
import {RootState} from "../types";
import {createFirestoreInstance, firestoreReducer} from "redux-firestore";

const rootReducer = combineReducers<RootState>({
    demoHelloState: demoHelloStateReducer,
    demoThunkState: demoThunkStateReducer,
    demoMapState: demoMapStateReducer,
    sysState: sysStateReducer,
    blResultState: blStateReducer,
    demoSagaState: demoSagaReducer,
    demoCryptoCurrencyState: demoCryptoCurrencyReducer,
    firebaseState: firebaseReducer,
    firestoreState: firestoreReducer
});

const sagaMiddleware = createSagaMiddleware()


// you might choose one redux middleware which you prefer,
// just delete the demos you not prefer,or just use them all
// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, sagaMiddleware));
sagaMiddleware.run(sagasGenerator);
// sagaMiddleware.run(saveQuickAlertSettingsSaga);

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

export const rrfProps = {
    firebase: firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
}

export default store;

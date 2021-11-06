import {applyMiddleware, combineReducers, createStore} from 'redux';

import {createDynamicMiddlewares} from '../../packages/redux-dynamic-middlewares/src';
import {
    blStateReducer,
    demoCryptoCurrencyReducer,
    demoHelloStateReducer,
    demoMapStateReducer,
    demoSagaReducer,
    demoThunkStateReducer,
    sysStateReducer
} from './reducers';
import {firebase} from '../firebase/firebase';
import {firebaseReducer} from 'react-redux-firebase';
import {RootState} from '../types';
import {createFirestoreInstance, firestoreReducer} from 'redux-firestore';

export const reduxMiddlewareManager = createDynamicMiddlewares();
const rootReducer = combineReducers<RootState>({
    demoHelloState: demoHelloStateReducer,
    demoThunkState: demoThunkStateReducer,
    demoMapState: demoMapStateReducer,
    sysState: sysStateReducer,
    bizLogicResultState: blStateReducer,
    demoSagaState: demoSagaReducer,
    demoCryptoCurrencyState: demoCryptoCurrencyReducer,
    firebaseState: firebaseReducer,
    firestoreState: firestoreReducer
});

export const store = createStore(rootReducer, applyMiddleware(reduxMiddlewareManager.enhancer));

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

export const rrfProps = {
    firebase: firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
};

export default store;

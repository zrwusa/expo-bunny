// Redux store states,different from models entities
import {InitialState} from '@react-navigation/native';
import {DemoSaga, NearbyFilm, Region, SchemaFirestore, SchemaRealtimeDB, UserProfile} from './models';
import {BizLogicResult} from './biz-logic';
import {Notification} from 'expo-notifications';
import {RequestConfig} from './payloads';
import {FirebaseReducer} from 'react-redux-firebase';
import {PickerSelectorItem} from './components';
import {FirestoreReducer} from 'redux-firestore';

export type RequestStatus = {
    status: 'LOADING' | 'SUCCESS' | 'FAILED';
} & RequestConfig

export type SysState = {
    errors: Error[],
    warns: string[],
    isReady: boolean,
    themeName: string,
    language: string,
    navInitialState?: InitialState,
    requestStatuses: RequestStatus[]
}

export type BizLogicResultState = {
    bizLogicResults: BizLogicResult[]
}

export interface DemoHelloState {
    name: string,
    order: number,
}

export type DemoThunkState = {
    id: number,
    text: string,
}

export type DemoMapState = {
    demoNearbyFilms: NearbyFilm[],
    region: Region,
}

export interface DemoSagaState {
    items: DemoSaga[];
}

export interface DemoCryptoCurrencyState {
    notification?: Notification,
    currentPrice: number,
    granularity: number,
    expoPushToken: string,
    reminder: {
        times: number,
        interval: string
    },
    dictionaries: {
        granularity: PickerSelectorItem<number>[],
        times: PickerSelectorItem<number>[],
        interval: PickerSelectorItem<string>[],
    }
}

export interface SagaTodo {
    text: string;
    done: boolean;
}

export interface RootState {
    sysState: SysState,
    bizLogicResultState: BizLogicResultState,
    demoHelloState: DemoHelloState,
    demoThunkState: DemoThunkState,
    demoMapState: DemoMapState,
    demoSagaState: DemoSagaState,
    demoCryptoCurrencyState: DemoCryptoCurrencyState,
    firebaseState: FirebaseReducer.Reducer<UserProfile, SchemaRealtimeDB>,
    firestoreState: FirestoreReducer.Reducer<SchemaFirestore>
}

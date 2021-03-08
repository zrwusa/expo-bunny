// Redux actions
import {EBL, EDemoHello, EDemoMap, EDemoSaga, EDemoThunk, ESys} from "../constants";
import {
    BLInfoClearInfosPayload,
    BLInfoPayload,
    DemoHello2Payload,
    DemoHelloPayload,
    DemoThunkSuccessPayload,
    RequestReceivedPayload,
    RequestFailedPayload,
    RequestingPayload,
    RestoreIsReadyPayload,
    RestoreNavInitialStatePayload,
    SysClearErrorPayload,
    SysErrorPayload,
    SysWarnPayload
} from "./payloads";
import {DemoSaga, NearbyFilm, Region} from "./models";

export interface DemoHelloAction {
    type: EDemoHello.DEMO_HELLO;
    payload: DemoHelloPayload;
}

export interface DemoHello2Action {
    type: EDemoHello.DEMO_HELLO2;
    payload: DemoHello2Payload;
}

export interface SysErrorAction {
    type: ESys.ERROR;
    payload: SysErrorPayload;
}

export interface CollectBLInfoAction {
    type: EBL.INFO;
    payload: BLInfoPayload;
}

export interface BLInfoClearInfosAction {
    type: EBL.CLEAR_INFOS;
    payload: BLInfoClearInfosPayload;
}

export interface SysClearErrorsAction {
    type: ESys.CLEAR_ERRORS;
    payload: SysClearErrorPayload;
}

export interface SysWarnAction {
    type: ESys.WARN;
    payload: SysWarnPayload;
}

export interface RestoreNavInitialStateAction {
    type: ESys.RESTORE_NAV_INITIAL_STATE;
    payload: RestoreNavInitialStatePayload;
}

export interface RestoreIsReadyAction {
    type: ESys.RESTORE_IS_READY;
    payload: RestoreIsReadyPayload;
}

export interface RequestingAction {
    type: ESys.REQUESTING;
    payload: RequestingPayload;
}

export interface RequestReceivedAction {
    type: ESys.REQUEST_RECEIVED;
    payload: RequestReceivedPayload;
}

export interface RequestFailedAction {
    type: ESys.REQUEST_FAILED;
    payload: RequestFailedPayload;
}


export interface DemoThunkSuccessAction {
    type: EDemoThunk.DEMO_THUNK_SUCCESS;
    payload: DemoThunkSuccessPayload;
}

export interface RestoreNearbyFilmsAction {
    type: EDemoMap.RESTORE_NEARBY_FILMS;
    payload: NearbyFilm[];
}

export interface RestoreRegionAction {
    type: EDemoMap.RESTORE_REGION;
    payload: Region;
}

export interface RequestGetDemoSagasAction {
    type: EDemoSaga.REQUEST_GET_DEMO_SAGAS,
}

export interface ReceiveGetDemoSagasAction {
    type: EDemoSaga.RECEIVE_GET_DEMO_SAGAS,
    payload: DemoSaga[]
}

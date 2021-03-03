// Redux actions
import {EBusinessLogic, EDemoHello, EDemoMap, EDemoSaga, EDemoThunk, ESys} from "../constants";
import {
    BusinessLogicInfoPayload,
    DemoHello2Payload,
    DemoHelloPayload,
    DemoThunkSuccessPayload,
    GetDemoSagaParams,
    RestoreIsReadyPayload,
    RestoreNavInitialStatePayload,
    SysClearErrorPayload,
    SysErrorPayload,
    SysWarnPayload
} from "./payloads";
import {NearbyFilm, Region} from "./models";
import {DemoSaga} from "../store/actions";

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

export interface BusinessLogicInfoAction {
    type: EBusinessLogic.INFO;
    payload: BusinessLogicInfoPayload;
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

export interface GetDemoSagasAction {
    type: EDemoSaga.GET_DEMO_SAGAS,
    params: GetDemoSagaParams
}

export interface RequestGetDemoSagasAction {
    type: EDemoSaga.REQUEST_GET_DEMO_SAGAS,
}

export interface ReceiveGetDemoSagasAction {
    type: EDemoSaga.RECEIVE_GET_DEMO_SAGAS,
    payload: DemoSaga[]
}

export interface FailedGetDemoSagasAction {
    type: EDemoSaga.FAILED_GET_DEMO_SAGAS,
}

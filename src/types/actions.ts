// Redux actions
import {EBL, EDemoCryptoCurrency, EDemoHello, EDemoMap, EDemoSaga, EDemoSagaFirebase, EDemoThunk, ESys} from "../constants";
import {
    CancelAlertSettingsParams,
    ClearBLResultPayload,
    DemoHello2Payload,
    DemoHelloPayload,
    DemoThunkSuccessPayload,
    GetDemoSagaParams,
    ReceiveGetCurrentPricePayload,
    RequestConfig,
    RestoreIsReadyPayload,
    RestoreNavInitialStatePayload,
    SaveDemoSagaFirebaseTodoParams,
    SaveQuickAlertSettingsParams,
    SysClearErrorPayload,
    SysWarnPayload
} from "./payloads";
import {DemoSaga, NearbyFilm, Region} from "./models";
import {BLResult} from "./bl";

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
    payload: Error;
}

export interface CollectBLResultAction {
    type: EBL.COLLECT_BL_RESULT;
    payload: BLResult;
}

export interface ClearBLResultAction {
    type: EBL.CLEAR_BL_RESULT;
    payload: ClearBLResultPayload;
}

export interface SetBLResultAction {
    type: EBL.SET_BL_RESULT;
    payload: BLResult;
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
    payload: RequestConfig;
}

export interface RequestReceivedAction {
    type: ESys.REQUEST_RECEIVED;
    payload: RequestConfig;
}

export interface RequestFailedAction {
    type: ESys.REQUEST_FAILED;
    payload: RequestConfig;
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
    payload: GetDemoSagaParams
}

export interface ReceiveGetDemoSagasAction {
    type: EDemoSaga.RECEIVE_GET_DEMO_SAGAS,
    payload: DemoSaga[]
}

export interface SaveQuickAlertSettingsAction {
    type: EDemoCryptoCurrency.SAVE_QUICK_ALERT_SETTINGS,
    payload: SaveQuickAlertSettingsParams
}

export interface SaveDemoSagaFirebaseTodoAction {
    type: EDemoSagaFirebase.SAVE_DEMO_SAGA_FIREBASE_TODO,
    payload: SaveDemoSagaFirebaseTodoParams
}

export interface CancelAlertSettingsAction {
    type: EDemoCryptoCurrency.CANCEL_ALL_ALERT_SETTINGS,
    payload: CancelAlertSettingsParams
}

export interface RequestGetCurrentPriceAction {
    type: EDemoCryptoCurrency.GET_CURRENT_PRICE,
}

export interface ReceiveGetCurrentPriceAction {
    type: EDemoCryptoCurrency.RECEIVE_CURRENT_PRICE,
    payload: ReceiveGetCurrentPricePayload
}

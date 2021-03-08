import {DemoSaga, GetDemoSagaParams, ReceiveGetDemoSagasAction, RequestGetDemoSagasAction} from "../../types";
import {EDemoSaga} from "../../constants";

export function getDemoSagas(params: GetDemoSagaParams) {
    return {
        type: EDemoSaga.GET_DEMO_SAGAS,
        params
    }
}

export function receiveGetDemoSagas(sagas: DemoSaga[]) {
    return {
        type: EDemoSaga.RECEIVE_GET_DEMO_SAGAS,
        payload: sagas
    }
}

export type DemoSagaActions = RequestGetDemoSagasAction | ReceiveGetDemoSagasAction;

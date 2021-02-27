import {FailedGetDemoSagasAction, GetDemoSagaParams, ReceiveGetDemoSagasAction, RequestGetDemoSagasAction} from "../types";
import {EDemoSaga} from "../constants";


export type DemoSaga = {
    id: number,
    text: string
}

export function getDemoSagas(params: GetDemoSagaParams) {
    return {
        type: EDemoSaga.GET_DEMO_SAGAS,
        params
    }
}

export function requestGetDemoSagas() {
    return {
        type: EDemoSaga.REQUEST_GET_DEMO_SAGAS,
    }
}

export function receiveGetDemoSagas(sagas: DemoSaga[]) {
    return {
        type: EDemoSaga.RECEIVE_GET_DEMO_SAGAS,
        payload: sagas
    }
}

export function failedGetDemoSagas() {
    return {
        type: EDemoSaga.FAILED_GET_DEMO_SAGAS,
    }
}

export type DemoSagaActions = RequestGetDemoSagasAction | ReceiveGetDemoSagasAction | FailedGetDemoSagasAction;

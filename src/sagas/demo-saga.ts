import {call, put, takeEvery} from "redux-saga/effects"
import * as actions from "../actions/demo-saga"
import api from "../utils/api";
import {getDemoSagas, failedGetDemoSagas} from "../actions";
import {EDemoSaga} from "../constants";
import {GetDemoSagaParams} from "../types";

export const sagaDemoSagas = function* () {
    yield takeEvery(EDemoSaga.GET_DEMO_SAGAS, function* (action: ReturnType<typeof getDemoSagas>) {
        try {
            yield put(actions.requestGetDemoSagas())
            const {data} = yield call((params: GetDemoSagaParams) => api.get('/demo-sagas'), action.params);
            yield put(actions.receiveGetDemoSagas(data))
        } catch (e) {
            yield put(failedGetDemoSagas());
        }
    });
}

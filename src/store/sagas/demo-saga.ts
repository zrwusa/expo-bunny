import {call, put, takeEvery} from "redux-saga/effects"
import api from "../../helpers/bunny-api";
import {getDemoSagas, requestReceived, receiveGetDemoSagas, requestFailed, requesting, sysError} from "../actions";
import {EDemoSaga} from "../../constants";
import {GetDemoSagaParams} from "../../types";

export const sagaDemoSagas = function* () {
    yield takeEvery(EDemoSaga.GET_DEMO_SAGAS, function* (action: ReturnType<typeof getDemoSagas>) {
        try {
            yield put(requesting({id: 'GET/demo-sagas'}))
            const {data} = yield call((params: GetDemoSagaParams) => api.get('/demo-sagas'), action.params);
            yield put(receiveGetDemoSagas(data))
            yield put(requestReceived({id: 'GET/demo-sagas'}))
        } catch (e) {
            yield put(sysError({error: e}));
            yield put(requestFailed({id: 'GET/demo-sagas'}))
        }
    });
}

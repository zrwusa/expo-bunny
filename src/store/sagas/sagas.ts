import {call, put, takeEvery} from 'redux-saga/effects';
import {bunnyAPI} from '../../helpers/bunny-api';
import {
    collectBLResult,
    collectSysError,
    getDemoSagas,
    receiveGetCurrentPrice,
    receiveGetDemoSagas,
    requestFailed,
    requesting,
    requestSuccess
} from '../actions';
import {EBizLogicMsg, EDemoCryptoCurrency, EDemoSaga, EDemoSagaFirebase} from '../../constants';
import {
    CancelAlertSettingsAction,
    RequestConfig,
    SaveDemoSagaFirebaseTodoAction,
    SaveQuickAlertSettingsAction,
} from '../../types';
import {blSuccess} from '../../helpers';
import {firebase} from '../../firebase';

export const sagasGenerator = function* () {
    yield takeEvery(EDemoSaga.GET_DEMO_SAGAS, function* (action: ReturnType<typeof getDemoSagas>) {
        const {payload} = action;
        const url = '/api/example-saga-items';
        const method = 'GET';
        const config: RequestConfig = {url, method, params: payload};
        try {
            yield put(requesting(config));
            const {data: {data}} = yield call(() => bunnyAPI.request(config));
            yield put(collectBLResult(blSuccess(data, EBizLogicMsg.GET_DEMO_SAGAS_SUCCESS, false)));
            yield put(receiveGetDemoSagas(data.items));
            yield put(requestSuccess(config));
        } catch (e: any) {
            yield put(collectSysError(e));
            yield put(requestFailed(config));
        }
    });

    yield takeEvery(EDemoCryptoCurrency.SAVE_QUICK_ALERT_SETTINGS, function* (action: SaveQuickAlertSettingsAction) {
        const {payload} = action;
        const url = '/push-service/alert-quick-settings';
        const method = 'POST';
        const config: RequestConfig = {url, method, data: payload};
        try {
            yield put(requesting(config));
            const {data} = yield call(() => bunnyAPI.request(config));
            yield put(collectBLResult(blSuccess(data, EBizLogicMsg.SAVE_QUICK_ALERT_SETTINGS_SUCCESS)));
            yield put(requestSuccess(config));
        } catch (e: any) {
            yield put(collectSysError(e));
            yield put(requestFailed(config));
        }
    });

    yield takeEvery(EDemoCryptoCurrency.CANCEL_ALL_ALERT_SETTINGS, function* (action: CancelAlertSettingsAction) {
        const {payload} = action;
        const url = '/push-service/alert-settings';
        const method = 'DELETE';
        const config: RequestConfig = {url, method, params: payload};
        try {
            yield put(requesting(config));
            const {data} = yield call(() => bunnyAPI.request(config));
            yield put(collectBLResult(blSuccess(data, EBizLogicMsg.CANCEL_ALL_ALERT_SETTINGS_SUCCESS)));
            yield put(requestSuccess(config));
        } catch (e: any) {
            yield put(collectSysError(e));
            yield put(requestFailed(config));
        }
    });

    yield takeEvery(EDemoCryptoCurrency.GET_CURRENT_PRICE, function* () {
        const url = '/crypto-currency-prices';
        const method = 'GET';
        const config: RequestConfig = {url, method};
        try {
            yield put(requesting(config));
            const {data} = yield call(() => bunnyAPI.request(config));
            yield put(receiveGetCurrentPrice({currentPrice: data}));
            yield put(collectBLResult(blSuccess(data, EBizLogicMsg.GET_CURRENT_PRICE_SUCCESS, false)));
            yield put(requestSuccess(config));
        } catch (e: any) {
            yield put(collectSysError(e));
            yield put(requestFailed(config));
        }
    });


    yield takeEvery(EDemoSagaFirebase.SAVE_DEMO_SAGA_FIREBASE_TODO, function* (action: SaveDemoSagaFirebaseTodoAction) {
        const {payload} = action;
        const url = '/todoList';
        const method = 'POST';
        const config: RequestConfig = {url, method, data: payload};
        try {
            yield put(requesting(config));
            const res = yield call(() => {
                return firebase.database().ref(url).push(payload);
            });
            yield put(requestSuccess(config));
        } catch (e: any) {
            yield put(collectSysError(e));
            yield put(requestFailed(config));
        }
    });
};

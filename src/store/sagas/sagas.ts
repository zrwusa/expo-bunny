import {call, put, takeEvery} from "redux-saga/effects"
import bunnyAPI from "../../helpers/bunny-api";
import {
    collectBLResult,
    getDemoSagas,
    receiveGetCurrentPrice,
    receiveGetDemoSagas,
    requestFailed,
    requesting,
    requestReceived,
    sysError
} from "../actions";
import {EBLMsg, EDemoCryptoCurrency, EDemoSaga, EDemoSagaFirebase} from "../../constants";
import {CancelAlertSettingsAction, RequestConfig, SaveDemoSagaFirebaseTodoAction, SaveQuickAlertSettingsAction,} from "../../types";
import {blSuccess} from "../../helpers";
import {firebase} from "../../firebase";

export const sagasGenerator = function* () {
    yield takeEvery(EDemoSaga.GET_DEMO_SAGAS, function* (action: ReturnType<typeof getDemoSagas>) {
        const {payload} = action;
        const url = '/demo-sagas';
        const method = 'GET';
        const config: RequestConfig = {url, method, params: payload}
        try {
            yield put(requesting(config))
            const {data} = yield call(() => bunnyAPI.request(config));
            yield put(collectBLResult(blSuccess(data, EBLMsg.GET_DEMO_SAGAS_SUCCESS, false)))
            yield put(receiveGetDemoSagas(data))
            yield put(requestReceived(config))
        } catch (e) {
            yield put(sysError(e));
            yield put(requestFailed(config))
        }
    });

    yield takeEvery(EDemoCryptoCurrency.SAVE_QUICK_ALERT_SETTINGS, function* (action: SaveQuickAlertSettingsAction) {
        const {payload} = action;
        const url = '/push-service/alert-quick-settings';
        const method = 'POST';
        const config: RequestConfig = {url, method, data: payload}
        try {
            yield put(requesting(config))
            const {data} = yield call(() => bunnyAPI.request(config));
            yield put(collectBLResult(blSuccess(data, EBLMsg.SAVE_QUICK_ALERT_SETTINGS_SUCCESS)))
            yield put(requestReceived(config))
        } catch (e) {
            yield put(sysError(e));
            yield put(requestFailed(config))
        }
    });

    yield takeEvery(EDemoCryptoCurrency.CANCEL_ALL_ALERT_SETTINGS, function* (action: CancelAlertSettingsAction) {
        const {payload} = action;
        const url = '/push-service/alert-settings';
        const method = 'DELETE';
        const config: RequestConfig = {url, method, params: payload}
        try {
            yield put(requesting(config))
            const {data} = yield call(() => bunnyAPI.request(config));
            yield put(collectBLResult(blSuccess(data, EBLMsg.CANCEL_ALL_ALERT_SETTINGS_SUCCESS)))
            yield put(requestReceived(config))
        } catch (e) {
            yield put(sysError(e));
            yield put(requestFailed(config))
        }
    });

    yield takeEvery(EDemoCryptoCurrency.GET_CURRENT_PRICE, function* () {
        const url = '/crypto-currency-prices';
        const method = 'GET';
        const config: RequestConfig = {url, method}
        try {
            yield put(requesting(config))
            const {data} = yield call(() => bunnyAPI.request(config));
            yield put(receiveGetCurrentPrice({currentPrice: data}))
            yield put(collectBLResult(blSuccess(data, EBLMsg.GET_CURRENT_PRICE_SUCCESS, false)))
            yield put(requestReceived(config))
        } catch (e) {
            yield put(sysError(e));
            yield put(requestFailed(config))
        }
    });


    yield takeEvery(EDemoSagaFirebase.SAVE_DEMO_SAGA_FIREBASE_TODO, function* (action: SaveDemoSagaFirebaseTodoAction) {
        const {payload} = action;
        const url = '/todoList';
        const method = 'POST';
        const config: RequestConfig = {url, method, data: payload}
        try {
            yield put(requesting(config))
            const res = yield call(() => {
                return firebase.database().ref(url).push(payload)
            });
            yield put(requestReceived(config))
        } catch (e) {
            yield put(sysError(e));
            yield put(requestFailed(config))
        }
    });
}

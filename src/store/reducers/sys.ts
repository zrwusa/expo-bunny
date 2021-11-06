import {ELanguage, ESys, EThemes} from '../../constants';
import {
    RequestConfig,
    RequestFailedPayload,
    RequestReceivedPayload,
    RestoreIsReadyPayload,
    RestoreNavInitialStatePayload,
    SysClearErrorPayload,
    SysState,
    SysWarnPayload
} from '../../types';
import {SysActions} from '../actions';
import _ from 'lodash';

const initialState: SysState = {
    isReady: false,
    errors: [],
    warns: [],
    themeName: EThemes.light,
    language: ELanguage.en,
    navInitialState: undefined,
    requestStatuses: []
};

export function sysStateReducer(prevState: SysState = initialState, {type, payload}: SysActions): SysState {
    switch (type) {
        case ESys.RESTORE_IS_READY:
            return {
                ...prevState,
                ...<RestoreIsReadyPayload>payload,
            };
        case ESys.ERROR:
            prevState.errors.push(<Error>payload);
            return {
                ...prevState,
            };

        case ESys.CLEAR_ERRORS:
            const sysClearErrorPayload = payload as SysClearErrorPayload;
            if (sysClearErrorPayload.all) {
                prevState.errors = [];
            } else if (sysClearErrorPayload.top) {
                prevState.errors.splice(0, sysClearErrorPayload.top);
            } else if (sysClearErrorPayload.last) {
                prevState.errors.splice(prevState.errors.length - sysClearErrorPayload.last, sysClearErrorPayload.last);
            }
            return {...prevState};

        case ESys.WARN:
            const sysWarnPayload = payload as SysWarnPayload;
            prevState.warns.push(sysWarnPayload.warn);
            return {
                ...prevState,
            };

        case ESys.RESTORE_NAV_INITIAL_STATE:
            return {
                ...prevState,
                ...<RestoreNavInitialStatePayload>payload
            };
        case ESys.REQUESTING:
            prevState.requestStatuses.push({...<RequestConfig>payload, status: 'LOADING'});
            return {
                ...prevState,
            };
        case ESys.REQUEST_SUCCESS:
            const receivedPayload = payload as RequestReceivedPayload;
            _.remove(prevState.requestStatuses, item => (item.url === receivedPayload.url && item.method === receivedPayload.method && item.params === receivedPayload.params));
            return {
                ...prevState,
            };
        case ESys.REQUEST_FAILED:
            const requestFailedPayload = payload as RequestFailedPayload;
            _.remove(prevState.requestStatuses, item => (item.url === requestFailedPayload.url && item.method === requestFailedPayload.method && item.params === requestFailedPayload.params));
            return {
                ...prevState,
            };
        default:
            return prevState;
    }
}

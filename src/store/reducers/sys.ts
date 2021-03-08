import {ELanguage, ESys, EThemes} from "../../constants";
import {
    RequestReceivedPayload,
    RequestFailedPayload,
    RequestingPayload,
    RestoreIsReadyPayload,
    RestoreNavInitialStatePayload,
    SysClearErrorPayload,
    SysErrorPayload,
    SysState,
    SysWarnPayload
} from "../../types";
import {SysActions} from "../actions";
import _ from "lodash";

const initialState: SysState = {
    isReady: false,
    error: [],
    warn: [""],
    themeName: EThemes.light,
    language: ELanguage.en,
    navInitialState: undefined,
    requestStatuses: []
};

export function sysStateReducer(prevState: SysState = initialState, {type, payload}: SysActions): SysState {
    switch (type) {
        case ESys.RESTORE_IS_READY:
            const restoreIsReadyPayload = payload as RestoreIsReadyPayload
            return {
                ...prevState,
                ...restoreIsReadyPayload,
            }
        case ESys.ERROR:
            const sysErrorPayload = payload as SysErrorPayload
            prevState.error.push(sysErrorPayload.error);
            return {
                ...prevState,
            };

        case ESys.CLEAR_ERRORS:
            const sysClearErrorPayload = payload as SysClearErrorPayload
            if (sysClearErrorPayload.all) {
                prevState.error = []
            } else if (sysClearErrorPayload.top) {
                prevState.error.splice(0, sysClearErrorPayload.top)
            } else if (sysClearErrorPayload.last) {
                prevState.error.splice(prevState.error.length - sysClearErrorPayload.last, sysClearErrorPayload.last)
            }
            return {...prevState};

        case ESys.WARN:
            const sysWarnPayload = payload as SysWarnPayload
            prevState.warn.push(sysWarnPayload.warn)
            return {
                ...prevState,
            };

        case ESys.RESTORE_NAV_INITIAL_STATE:
            const restoreNavInitialStatePayload = payload as RestoreNavInitialStatePayload
            return {
                ...prevState,
                ...restoreNavInitialStatePayload
            }
        case ESys.REQUESTING:
            const requestingPayload = payload as RequestingPayload
            prevState.requestStatuses.push({id: requestingPayload.id, status: 'FETCHING'})
            return {
                ...prevState,
            };
        case ESys.REQUEST_RECEIVED:
            const receivedPayload = payload as RequestReceivedPayload
            _.remove(prevState.requestStatuses,item=>item.id===receivedPayload.id)
            // prevState.requestStatuses.map(item=>{
            //     if(item.id===receivedPayload.id){
            //         item.status = 'SUCCESS'
            //     }
            // })
            return {
                ...prevState,
            };
        case ESys.REQUEST_FAILED:
            const requestFailedPayload = payload as RequestFailedPayload
            _.remove(prevState.requestStatuses,item=>item.id===requestFailedPayload.id)

            // prevState.requestStatuses.map(item=>{
            //     if(item.id===requestFailedPayload.id){
            //         item.status = 'FAILED'
            //     }
            // })

            return {
                ...prevState,
            };
        default:
            return prevState;
    }
}

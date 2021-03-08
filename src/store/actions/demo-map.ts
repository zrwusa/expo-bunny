import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {EBLInfo, EDemoMap} from "../../constants";
import {
    CollectBLInfoAction,
    DemoMapState,
    GetNearbyFilmsReqParams,
    NearbyFilm,
    Region,
    RequestFailedAction,
    RequestingAction,
    RequestReceivedAction,
    RestoreNearbyFilmsAction,
    RestoreRegionAction,
    SysErrorAction
} from "../../types";
import api from "../../helpers/bunny-api";
import {requestFailed, requesting, requestReceived, sysError} from "./sys";
import {collectBLInfo} from "./business-logic";
import {blInfo} from "../../helpers";

export const restoreNearbyFilms: (payload: NearbyFilm[]) => RestoreNearbyFilmsAction = (payload) => {
    return {
        type: EDemoMap.RESTORE_NEARBY_FILMS,
        payload: payload,
    };
};

export const getNearbyFilms: ActionCreator<ThunkAction<Promise<Action>, DemoMapState, void, RestoreNearbyFilmsAction>> = (reqParams: GetNearbyFilmsReqParams) => {
    return async (dispatch: Dispatch<RestoreNearbyFilmsAction | SysErrorAction | CollectBLInfoAction | RequestingAction | RequestReceivedAction | RequestFailedAction>): Promise<Action> => {
        let result;
        try {
            result = dispatch(requesting({id: 'GET/nearby-films'}))
            const res = await api.get(`/nearby-films`, {params: {reqParams}});
            if (res.data) {
                result = dispatch(restoreNearbyFilms(res.data));
                result = dispatch(requestReceived({id: 'GET/nearby-films'}))
            } else {
                result = dispatch(collectBLInfo({error: blInfo(EBLInfo.NO_NEARBY_FILMS)}));
            }
            return result;
        } catch (err) {
            result = dispatch(sysError({error: err}));
            result = dispatch(requestFailed({id: 'GET/nearby-films'}))
            return result;
        }
    };
};

export const restoreRegion: (payload: Region) => RestoreRegionAction = (payload) => {
    return {
        type: EDemoMap.RESTORE_REGION,
        payload: payload,
    };
};

export type DemoMapActions = RestoreNearbyFilmsAction | RestoreRegionAction;

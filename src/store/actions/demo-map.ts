import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {EBLMsg, EDemoMap} from '../../constants';
import {
    CollectBLResultAction,
    DemoMapState,
    GetNearbyFilmsReqParams,
    NearbyFilm,
    Region,
    RequestConfig,
    RequestFailedAction,
    RequestingAction,
    RequestReceivedAction,
    RestoreNearbyFilmsAction,
    RestoreRegionAction,
    SysErrorAction
} from '../../types';
import {bunnyAPI} from '../../helpers/bunny-api';
import {requestFailed, requesting, requestReceived, sysError} from './sys';
import {collectBLResult} from './bl-result';
import {blError} from '../../helpers';

export const restoreNearbyFilms: (payload: NearbyFilm[]) => RestoreNearbyFilmsAction = (payload) => {
    return {
        type: EDemoMap.RESTORE_NEARBY_FILMS,
        payload
    };
};

export const getNearbyFilms: ActionCreator<ThunkAction<Promise<Action>, DemoMapState, void, RestoreNearbyFilmsAction>> = (reqParams: GetNearbyFilmsReqParams) => {
    return async (dispatch: Dispatch<RestoreNearbyFilmsAction | SysErrorAction | CollectBLResultAction | RequestingAction | RequestReceivedAction | RequestFailedAction>): Promise<Action> => {
        let result;
        const config: RequestConfig = {method: 'GET', url: '/nearby-films', params: reqParams};
        try {
            result = dispatch(requesting(config));
            const res = await bunnyAPI.request(config);
            if (res.data) {
                result = dispatch(restoreNearbyFilms(res.data));
                result = dispatch(requestReceived(config));
            } else {
                result = dispatch(collectBLResult(blError(EBLMsg.NO_NEARBY_FILMS)));
            }
            return result;
        } catch (e: any) {
            result = dispatch(sysError(e));
            result = dispatch(requestFailed(config));
            return result;
        }
    };
};

export const restoreRegion: (payload: Region) => RestoreRegionAction = (payload) => {
    return {
        type: EDemoMap.RESTORE_REGION,
        payload
    };
};

export type DemoMapActions = RestoreNearbyFilmsAction | RestoreRegionAction;

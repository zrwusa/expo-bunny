import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {EBizLogicMsg, EDemoMap} from '../../constants';
import {
    CollectBLResultAction,
    DemoMapState,
    GetNearbyFilmsReqParams,
    NearbyFilm,
    Region,
    RequestConfig,
    RequestFailedAction,
    RequestingAction,
    RequestSuccessAction,
    RestoreNearbyFilmsAction,
    RestoreRegionAction,
    SysErrorAction
} from '../../types';
import {bunnyAPI} from '../../helpers/bunny-api';
import {collectSysError, requestFailed, requesting, requestSuccess} from './sys';
import {collectBLResult} from './bl-result';
import {blError} from '../../helpers';

export const restoreNearbyFilms: (payload: NearbyFilm[]) => RestoreNearbyFilmsAction = (payload) => {
    return {
        type: EDemoMap.RESTORE_NEARBY_FILMS,
        payload
    };
};

export const getNearbyFilms: ActionCreator<ThunkAction<Promise<Action>, DemoMapState, void, RestoreNearbyFilmsAction>> = (reqParams: GetNearbyFilmsReqParams) => {
    return async (dispatch: Dispatch<RestoreNearbyFilmsAction | SysErrorAction | CollectBLResultAction | RequestingAction | RequestSuccessAction | RequestFailedAction>): Promise<Action> => {
        let result;
        const config: RequestConfig = {method: 'GET', url: '/api/nearby-films', params: reqParams};
        try {
            result = dispatch(requesting(config));
            const {data: {data}} = await bunnyAPI.request(config);
            if (data) {
                result = dispatch(restoreNearbyFilms(data));
                result = dispatch(requestSuccess(config));
            } else {
                result = dispatch(collectBLResult(blError(EBizLogicMsg.NO_NEARBY_FILMS)));
            }
            return result;
        } catch (e: any) {
            result = dispatch(collectSysError(e));
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

import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {EDemoMap} from "../constants";
import {DemoMapState, NearbyFilm, Region} from "../types/models";
import api from "../utils/api";
import {GetNearbyFilmsReqParams} from "../types";
import {RestoreNearbyFilmsAction, RestoreRegionAction, SysErrorAction} from "../types";
import {sysError} from "./sys";
import {BusinessLogicError} from "../utils";

export const restoreNearbyFilms: (payload: NearbyFilm[]) => RestoreNearbyFilmsAction = (payload) => {
    return {
        type: EDemoMap.RESTORE_NEARBY_FILMS,
        payload: payload,
    };
};

export const getNearbyFilms: ActionCreator<ThunkAction<Promise<Action>, DemoMapState, void, RestoreNearbyFilmsAction>> = (reqParams: GetNearbyFilmsReqParams) => {
    return async (dispatch: Dispatch<RestoreNearbyFilmsAction | SysErrorAction>): Promise<Action> => {
        let result;
        try {
            const res = await api.get(`/nearby-films`, {params: {reqParams}});
            if (res.data) {
                result = dispatch(restoreNearbyFilms(res.data));
            } else {
                result = dispatch(sysError({error: new BusinessLogicError('No nearby films')}));
            }
        } catch (err) {
            result = dispatch(sysError({error: err}));
        }

        return result;
    };
};

export const restoreRegion: (payload: Region) => RestoreRegionAction = (payload) => {
    return {
        type: EDemoMap.RESTORE_REGION,
        payload: payload,
    };
};

export type DemoMapActions = RestoreNearbyFilmsAction | RestoreRegionAction;

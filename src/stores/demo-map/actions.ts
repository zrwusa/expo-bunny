import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {EDemoMap} from "../../constants";
import {DemoMap, NearbyFilm, Region} from "../../types/models";
import api from "../../utils/api";
import {GetNearbyFilmsReqParams} from "../../types";
import {RestoreNearbyFilms, RestoreRegion, SysError} from "../../types";
import {sysError} from "../sys/actions";
import {BusinessLogicError} from "../../utils";

export const restoreNearbyFilms: (payload: NearbyFilm[]) => RestoreNearbyFilms = (payload) => {
    return {
        type: EDemoMap.RESTORE_NEARBY_FILMS,
        payload: payload,
    };
};

export const getNearbyFilms: ActionCreator<ThunkAction<Promise<Action>, DemoMap, void, RestoreNearbyFilms>> = (reqParams: GetNearbyFilmsReqParams) => {
    return async (dispatch: Dispatch<RestoreNearbyFilms | SysError>): Promise<Action> => {
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

export const restoreRegion: (payload: Region) => RestoreRegion = (payload) => {
    return {
        type: EDemoMap.RESTORE_REGION,
        payload: payload,
    };
};

export type DemoMapActions = RestoreNearbyFilms | RestoreRegion;

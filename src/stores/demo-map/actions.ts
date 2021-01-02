import api from "../../common/api";
import {GetNearbyFilmsReqParams} from "../../types/payloads";
import {RestoreNearbyFilms, SysError} from "../../types/actions";
import {EDemoMap} from "../../types/constants";
import {Action, ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {DemoMap, NearbyFilm} from "../../types/models";
import {sysError} from "../sys/actions";

export const restoreNearbyFilms: (payload: NearbyFilm[]) => RestoreNearbyFilms = (payload) => {
    return {
        type: EDemoMap.RESTORE_NEARBY_FILMS,
        payload: payload,
    };
};

export const getNearbyFilms: ActionCreator<ThunkAction<Promise<Action>, DemoMap, void, RestoreNearbyFilms>> = (reqParams: GetNearbyFilmsReqParams) => {
    return async (dispatch: Dispatch<RestoreNearbyFilms | SysError>): Promise<Action> => {
        let r;
        try {
            const res = await api.get(`/nearby_films`,{params:reqParams});
            r = dispatch(restoreNearbyFilms(res.data));
        } catch (e) {
            r = dispatch(sysError({error: e.toString()}));
        }
        return r;
    };
};

export type DemoMapActions = RestoreNearbyFilms;

import {Action, ActionCreator, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {EBusinessLogicInfo, EDemoMap} from "../../constants";
import {
    BusinessLogicInfoAction,
    DemoMapState,
    GetNearbyFilmsReqParams,
    NearbyFilm,
    Region,
    RestoreNearbyFilmsAction,
    RestoreRegionAction,
    SysErrorAction
} from "../../types";
import api from "../../helpers/bunny-api";
import {sysError} from "./sys";
import {collectBusinessLogicInfo} from "./business-logic";
import {businessLogicInfo} from "../../helpers";

export const restoreNearbyFilms: (payload: NearbyFilm[]) => RestoreNearbyFilmsAction = (payload) => {
    return {
        type: EDemoMap.RESTORE_NEARBY_FILMS,
        payload: payload,
    };
};

export const getNearbyFilms: ActionCreator<ThunkAction<Promise<Action>, DemoMapState, void, RestoreNearbyFilmsAction>> = (reqParams: GetNearbyFilmsReqParams) => {
    return async (dispatch: Dispatch<RestoreNearbyFilmsAction | SysErrorAction | BusinessLogicInfoAction>): Promise<Action> => {
        let result;
        try {
            const res = await api.get(`/nearby-films`, {params: {reqParams}});
            if (res.data) {
                result = dispatch(restoreNearbyFilms(res.data));
            } else {
                result = dispatch(collectBusinessLogicInfo({error: businessLogicInfo(EBusinessLogicInfo.NO_NEARBY_FILMS)}));
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

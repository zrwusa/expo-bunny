import {BLInfoClearInfosAction, BLInfoClearInfosPayload, BusinessLogicInfoPayload, CollectBLInfoAction,} from "../../types";
import {EBusinessLogic} from "../../constants";

export const collectBusinessLogicInfo: (payload: BusinessLogicInfoPayload) => CollectBLInfoAction = (payload) => {
    return {
        type: EBusinessLogic.INFO,
        payload: payload,
    };
};

export const blInfoClearInfos: (payload: BLInfoClearInfosPayload) => BLInfoClearInfosAction = (payload) => {
    return {
        type: EBusinessLogic.CLEAR_INFOS,
        payload: payload,
    };
};

export type BusinessLogicActions = CollectBLInfoAction | BLInfoClearInfosAction;

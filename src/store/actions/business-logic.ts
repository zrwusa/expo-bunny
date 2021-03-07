import {BLInfoClearInfosAction, BLInfoClearInfosPayload, BLInfoPayload, CollectBLInfoAction,} from "../../types";
import {EBL} from "../../constants";

export const collectBLInfo: (payload: BLInfoPayload) => CollectBLInfoAction = (payload) => {
    return {
        type: EBL.INFO,
        payload: payload,
    };
};

export const blInfoClearInfos: (payload: BLInfoClearInfosPayload) => BLInfoClearInfosAction = (payload) => {
    return {
        type: EBL.CLEAR_INFOS,
        payload: payload,
    };
};

export type BLActions = CollectBLInfoAction | BLInfoClearInfosAction;

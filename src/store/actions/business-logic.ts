import {BLResult, ClearBLResultAction, ClearBLResultPayload, CollectBLResultAction,} from "../../types";
import {EBL} from "../../constants";

export const collectBLResult: (payload: BLResult) => CollectBLResultAction = (payload) => {
    return {
        type: EBL.COLLECT_BL_RESULT,
        payload: payload,
    };
};

export const clearBLResults: (payload: ClearBLResultPayload) => ClearBLResultAction = (payload) => {
    return {
        type: EBL.CLEAR_BL_RESULT,
        payload: payload,
    };
};

export type BLActions = CollectBLResultAction | ClearBLResultAction;

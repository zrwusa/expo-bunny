import {
    BLResult,
    ClearBLResultAction,
    ClearBLResultPayload,
    CollectBLResultAction,
    SetBLResultAction,
} from "../../types";
import {EBL} from "../../constants";

export const collectBLResult: (payload: BLResult) => CollectBLResultAction = (payload) => {
    return {
        type: EBL.COLLECT_BL_RESULT,
        payload
    };
};

export const clearBLResults: (payload: ClearBLResultPayload) => ClearBLResultAction = (payload) => {
    return {
        type: EBL.CLEAR_BL_RESULT,
        payload
    };
};

export const setBLResult: (payload: BLResult) => SetBLResultAction = (payload) => {
    return {
        type: EBL.SET_BL_RESULT,
        payload,
    };
};

export type BLActions = CollectBLResultAction | ClearBLResultAction | SetBLResultAction;

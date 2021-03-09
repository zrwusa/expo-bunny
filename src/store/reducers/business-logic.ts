import {EBL} from "../../constants";
import {BLResult, BLState, ClearBLResultPayload,} from "../../types";
import {BLActions} from "../actions";

const initialState: BLState = {
    results: []
};

export function blStateReducer(prevState: BLState = initialState, {type, payload}: BLActions): BLState {
    switch (type) {
        case EBL.COLLECT_BL_RESULT:
            const businessErrorPayload = payload as BLResult
            prevState.results.push(businessErrorPayload);
            return {
                ...prevState,
            };
        case EBL.CLEAR_BL_RESULT:
            const blInfoClearInfosPayload = payload as ClearBLResultPayload
            if (blInfoClearInfosPayload.all) {
                prevState.results = []
            } else if (blInfoClearInfosPayload.top) {
                prevState.results.splice(0, blInfoClearInfosPayload.top)
            } else if (blInfoClearInfosPayload.last) {
                prevState.results.splice(prevState.results.length - blInfoClearInfosPayload.last, blInfoClearInfosPayload.last)
            }
            return {...prevState};

        default:
            return prevState;
    }
}

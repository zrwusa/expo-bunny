import {EBL} from "../../constants";
import {BLResult, BLResultState, ClearBLResultPayload,} from "../../types";
import {BLActions} from "../actions";

const initialState: BLResultState = {
    blResults: []
};

export function blStateReducer(prevState: BLResultState = initialState, {type, payload}: BLActions): BLResultState {
    switch (type) {
        case EBL.COLLECT_BL_RESULT:
            const collectBLResultsPayload = payload as BLResult
            console.log('---COLLECT_BL_RESULT', collectBLResultsPayload)
            prevState.blResults.push(collectBLResultsPayload);
            return {
                ...prevState,
            };
        case EBL.CLEAR_BL_RESULT:
            const clearBLResultsPayload = payload as ClearBLResultPayload
            if (clearBLResultsPayload.all) {
                prevState.blResults = []
            } else if (clearBLResultsPayload.top) {
                prevState.blResults.splice(0, clearBLResultsPayload.top)
            } else if (clearBLResultsPayload.last) {
                prevState.blResults.splice(prevState.blResults.length - clearBLResultsPayload.last, clearBLResultsPayload.last)
            }
            return {...prevState};
        case EBL.SET_BL_RESULT:
            const blResult = payload as BLResult
            prevState.blResults.map((item) => {
                if (item.id === blResult.id) {
                    item.shouldShow = blResult.shouldShow
                }
                return item
            })
            return {...prevState};
        default:
            return prevState;
    }
}

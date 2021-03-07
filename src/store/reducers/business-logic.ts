import {EBL} from "../../constants";
import {BLInfoClearInfosPayload, BLInfoPayload, BLState,} from "../../types";
import {BLActions} from "../actions";

const initialState: BLState = {
    infos: []
};

export function blStateReducer(prevState: BLState = initialState, {type, payload}: BLActions): BLState {
    switch (type) {
        case EBL.INFO:
            const businessErrorPayload = payload as BLInfoPayload
            prevState.infos.push(businessErrorPayload.error);
            return {
                ...prevState,
            };
        case EBL.CLEAR_INFOS:
            const blInfoClearInfosPayload = payload as BLInfoClearInfosPayload
            if (blInfoClearInfosPayload.all) {
                prevState.infos = []
            } else if (blInfoClearInfosPayload.top) {
                prevState.infos.splice(0, blInfoClearInfosPayload.top)
            } else if (blInfoClearInfosPayload.last) {
                prevState.infos.splice(prevState.infos.length - blInfoClearInfosPayload.last, blInfoClearInfosPayload.last)
            }
            return {...prevState};

        default:
            return prevState;
    }
}

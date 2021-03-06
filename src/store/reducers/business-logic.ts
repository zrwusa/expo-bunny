import {EBusinessLogic} from "../../constants";
import {BLInfoClearInfosPayload, BusinessLogicInfoPayload, BusinessLogicState,} from "../../types";
import {BusinessLogicActions} from "../actions";

const initialState: BusinessLogicState = {
    infos: []
};

export function businessLogicStateReducer(prevState: BusinessLogicState = initialState, {type, payload}: BusinessLogicActions): BusinessLogicState {
    switch (type) {
        case EBusinessLogic.INFO:
            const businessErrorPayload = payload as BusinessLogicInfoPayload
            prevState.infos.push(businessErrorPayload.error);
            return {
                ...prevState,
            };
        case EBusinessLogic.CLEAR_INFOS:
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

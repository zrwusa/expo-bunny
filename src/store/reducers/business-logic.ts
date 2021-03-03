import {EBusinessLogic} from "../../constants";
import {BusinessLogicInfoPayload, BusinessLogicState,} from "../../types";
import {BusinessLogicActions} from "../actions/business-logic";

const initialState: BusinessLogicState = {
    infos: []
};

export function businessLogicStateReducer(prevState: BusinessLogicState = initialState, {type, payload}: BusinessLogicActions): BusinessLogicState {
    switch (type) {
        case EBusinessLogic.INFO:
            const businessErrorPayload = payload as BusinessLogicInfoPayload
            prevState.infos.push(businessErrorPayload.error);
            console.log('---business state', prevState)
            return {
                ...prevState,
            };

        default:
            return prevState;
    }
}

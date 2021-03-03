import {BusinessLogicInfoAction, BusinessLogicInfoPayload,} from "../../types";
import {EBusinessLogic} from "../../constants";

export const collectBusinessLogicInfo: (payload: BusinessLogicInfoPayload) => BusinessLogicInfoAction = (payload) => {
    return {
        type: EBusinessLogic.INFO,
        payload: payload,
    };
};

export type BusinessLogicActions = BusinessLogicInfoAction ;

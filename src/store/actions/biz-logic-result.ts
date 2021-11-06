import {
    BizLogicResult,
    ClearBizLogicResultAction,
    ClearBizLogicResultPayload,
    CollectBizLogicResultAction,
    SetBizLogicResultAction,
} from '../../types';
import {EBizLogic} from '../../constants';

export const collectBizLogicResult = (payload: BizLogicResult): CollectBizLogicResultAction => {
    return {
        type: EBizLogic.COLLECT_BL_RESULT,
        payload
    };
};

export const clearBizLogicResults = (payload: ClearBizLogicResultPayload): ClearBizLogicResultAction => {
    return {
        type: EBizLogic.CLEAR_BL_RESULT,
        payload
    };
};

export const setBizLogicResult = (payload: BizLogicResult): SetBizLogicResultAction => {
    return {
        type: EBizLogic.SET_BL_RESULT,
        payload,
    };
};

export type BLActions = CollectBizLogicResultAction | ClearBizLogicResultAction | SetBizLogicResultAction;

import {EBizLogic} from '../../constants';
import {BizLogicResult, BizLogicResultState, ClearBizLogicResultPayload,} from '../../types';
import {BLActions} from '../actions';

const initialState: BizLogicResultState = {
    bizLogicResults: []
};

export function blStateReducer(prevState: BizLogicResultState = initialState, {
    type,
    payload
}: BLActions): BizLogicResultState {
    switch (type) {
        case EBizLogic.COLLECT_BL_RESULT:
            const collectBizLogicResultsPayload = payload as BizLogicResult;
            prevState.bizLogicResults.push(collectBizLogicResultsPayload);
            return {
                ...prevState,
            };
        case EBizLogic.CLEAR_BL_RESULT:
            const clearBizLogicResultsPayload = payload as ClearBizLogicResultPayload;
            if (clearBizLogicResultsPayload.all) {
                prevState.bizLogicResults = [];
            } else if (clearBizLogicResultsPayload.top) {
                prevState.bizLogicResults.splice(0, clearBizLogicResultsPayload.top);
            } else if (clearBizLogicResultsPayload.last) {
                prevState.bizLogicResults.splice(prevState.bizLogicResults.length - clearBizLogicResultsPayload.last, clearBizLogicResultsPayload.last);
            }
            return {...prevState};
        case EBizLogic.SET_BL_RESULT:
            const bizLogicResult = payload as BizLogicResult;
            prevState.bizLogicResults.map((item) => {
                if (item.id === bizLogicResult.id) {
                    item.shouldShow = bizLogicResult.shouldShow;
                }
                return item;
            });
            return {...prevState};
        default:
            return prevState;
    }
}

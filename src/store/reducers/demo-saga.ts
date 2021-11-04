import {EDemoSaga} from '../../constants';
import {DemoSagaActions} from '../actions';
import {DemoSaga, DemoSagaState} from '../../types';


export function demoSagaReducer(
    prevState: DemoSagaState = {
        items: [],
    }, {type, payload}: DemoSagaActions): DemoSagaState {
    switch (type) {
        case EDemoSaga.RECEIVE_GET_DEMO_SAGAS:
            const payloadNow = payload as DemoSaga[];
            return {
                ...prevState,
                items: payloadNow
            };
        default:
            return prevState;
    }
}

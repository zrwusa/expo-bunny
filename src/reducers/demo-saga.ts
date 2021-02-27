import {EDemoSaga} from "../constants";
import {DemoSagaActions} from "../actions";

export const demoSagaReducer = (
    prevState = {
        isFetching: false,
        items: [],
    },
    action: DemoSagaActions,
) => {
    switch (action.type) {
        case EDemoSaga.REQUEST_GET_DEMO_SAGAS:
            return {
                ...prevState,
                isFetching: true
            }
        case EDemoSaga.RECEIVE_GET_DEMO_SAGAS:
            return {
                ...prevState,
                isFetching: false,
                items: action.payload
            }
        case EDemoSaga.FAILED_GET_DEMO_SAGAS:
            return {
                ...prevState,
                isFetching: false,
            }
        default:
            return prevState
    }
}


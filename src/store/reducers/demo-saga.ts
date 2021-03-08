import {EDemoSaga} from "../../constants";
import {DemoSagaActions} from "../actions";

export const demoSagaReducer = (
    prevState = {
        items: [],
    },
    action: DemoSagaActions,
) => {
    switch (action.type) {
        case EDemoSaga.RECEIVE_GET_DEMO_SAGAS:
            return {
                ...prevState,
                items: action.payload
            }
        default:
            return prevState
    }
}


import {DemoBitcoinActions} from "../actions";
import {EDemoBitcoin} from "../../constants";

export const demoBitcoinReducer = (
    prevState = {
        currentPrice: 0,
        dictionaries: {
            granularity: [
                {label: '0.1%', value: 0.001},
                {label: '1%', value: 0.01},
                {label: '5%', value: 0.05},
                {label: '10%', value: 0.1},
                {label: '20%', value: 0.2},
                {label: '30%', value: 0.3},
            ],
            times: [
                {label: '1', value: 1},
                {label: '2', value: 2},
                {label: '3', value: 3},
                {label: '5', value: 5},
                {label: '10', value: 10},
                {label: '20', value: 20},
            ],
            interval: [
                {label: '1s', value: '1s'},
                {label: '10s', value: '10s'},
                {label: '1m', value: '1m'},
                {label: '5m', value: '5m'},
                {label: '10m', value: '10m'},
                {label: '30m', value: '30m'},
                {label: '1h', value: '1h'},
                {label: '2h', value: '2h'},
            ],
        }
    },
    action: DemoBitcoinActions,
) => {
    switch (action.type) {
        case EDemoBitcoin.RECEIVE_CURRENT_PRICE:
            return {...prevState, ...action.payload}
        default:
            return prevState
    }
}


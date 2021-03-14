import {
    CancelAlertSettingsAction,
    CancelAlertSettingsParams,
    ReceiveGetCurrentPriceAction,
    ReceiveGetCurrentPricePayload,
    RequestGetCurrentPriceAction,
    SaveQuickAlertSettingsAction,
    SaveQuickAlertSettingsParams
} from "../../types";
import {EDemoCryptoCurrency} from "../../constants";

export function saveQuickAlertSettings(params: SaveQuickAlertSettingsParams): SaveQuickAlertSettingsAction {
    return {
        type: EDemoCryptoCurrency.SAVE_QUICK_ALERT_SETTINGS,
        payload: params
    }
}

export function cancelAlertSettings(params: CancelAlertSettingsParams): CancelAlertSettingsAction {
    return {
        type: EDemoCryptoCurrency.CANCEL_ALL_ALERT_SETTINGS,
        payload: params
    }
}

export function getCurrentPrice(): RequestGetCurrentPriceAction {
    return {
        type: EDemoCryptoCurrency.GET_CURRENT_PRICE,
    }
}

export function receiveGetCurrentPrice(payload: ReceiveGetCurrentPricePayload): ReceiveGetCurrentPriceAction {
    return {
        type: EDemoCryptoCurrency.RECEIVE_CURRENT_PRICE,
        payload
    }
}

export type DemoCryptoCurrencyActions = SaveQuickAlertSettingsAction | RequestGetCurrentPriceAction | ReceiveGetCurrentPriceAction;

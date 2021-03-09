import {
    CancelAlertSettingsAction,
    CancelAlertSettingsParams,
    ReceiveGetCurrentPriceAction,
    ReceiveGetCurrentPricePayload,
    RequestGetCurrentPriceAction,
    SaveQuickAlertSettingsAction,
    SaveQuickAlertSettingsParams
} from "../../types";
import {EDemoBitcoin} from "../../constants";

export function saveQuickAlertSettings(params: SaveQuickAlertSettingsParams): SaveQuickAlertSettingsAction {
    return {
        type: EDemoBitcoin.SAVE_QUICK_ALERT_SETTINGS,
        payload: params
    }
}

export function cancelAlertSettings(params: CancelAlertSettingsParams): CancelAlertSettingsAction {
    return {
        type: EDemoBitcoin.CANCEL_ALL_ALERT_SETTINGS,
        payload: params
    }
}

export function getCurrentPrice(): RequestGetCurrentPriceAction {
    return {
        type: EDemoBitcoin.GET_CURRENT_PRICE,
    }
}

export function receiveGetCurrentPrice(payload: ReceiveGetCurrentPricePayload): ReceiveGetCurrentPriceAction {
    return {
        type: EDemoBitcoin.RECEIVE_CURRENT_PRICE,
        payload: payload,
    }
}

export type DemoBitcoinActions = SaveQuickAlertSettingsAction | RequestGetCurrentPriceAction | ReceiveGetCurrentPriceAction;

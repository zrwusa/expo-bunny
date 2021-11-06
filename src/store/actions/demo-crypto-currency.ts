import {
    CancelAlertSettingsAction,
    CancelAlertSettingsParams,
    ReceiveGetCurrentPriceAction,
    ReceiveGetCurrentPricePayload,
    RequestGetCurrentPriceAction,
    SaveQuickAlertSettingsAction,
    SaveQuickAlertSettingsParams
} from '../../types';
import {EDemoCryptoCurrency} from '../../constants';

export const saveQuickAlertSettings = (params: SaveQuickAlertSettingsParams): SaveQuickAlertSettingsAction => {
    return {
        type: EDemoCryptoCurrency.SAVE_QUICK_ALERT_SETTINGS,
        payload: params
    };
};

export const cancelAlertSettings = (params: CancelAlertSettingsParams): CancelAlertSettingsAction => {
    return {
        type: EDemoCryptoCurrency.CANCEL_ALL_ALERT_SETTINGS,
        payload: params
    };
};

export const getCurrentPrice = (): RequestGetCurrentPriceAction => {
    return {
        type: EDemoCryptoCurrency.GET_CURRENT_PRICE,
        payload: undefined
    };
};

export const receiveGetCurrentPrice = (payload: ReceiveGetCurrentPricePayload): ReceiveGetCurrentPriceAction => {
    return {
        type: EDemoCryptoCurrency.RECEIVE_CURRENT_PRICE,
        payload
    };
};

export type DemoCryptoCurrencyActions =
    SaveQuickAlertSettingsAction
    | RequestGetCurrentPriceAction
    | ReceiveGetCurrentPriceAction;

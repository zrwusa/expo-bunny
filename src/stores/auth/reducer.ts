import {AuthActions} from "./actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Auth} from "../../types/models";
import {AuthFailedPayload, RestoreTokenPayload} from "../../types/payloads";

export const initialAuthState: Auth = {
    isLoading: true,
    isSignOut: false,
    accessToken: undefined,
    error:"",
};
export function authReducer(state: Auth = initialAuthState, {type, payload}: AuthActions): Auth {
    switch (type) {
        case 'RESTORE_TOKEN':
            AsyncStorage.setItem('accessToken', (<RestoreTokenPayload>payload).access_token)
            return {
                ...state,
                accessToken: (<RestoreTokenPayload>payload).access_token,
                isLoading: false,
            };
        case 'AUTH_FAIL':
            return {
                ...state,
                isSignOut: false,
                error: JSON.stringify((<AuthFailedPayload>payload).error),
            };
        case 'SIGN_OUT':
            AsyncStorage.removeItem('accessToken')
            return {
                ...state,
                isSignOut: true,
                accessToken: undefined,
            };
        default:
            return state;
    }
}





import {AuthState} from "./models";
import {AuthAction} from "./actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IAuthFailPayload, IRestoreTokenPayload} from "./payloads";

export const initialAuthState: AuthState = {
    isLoading: true,
    isSignOut: false,
    accessToken: undefined,
    error:"",
};
export function authReducer(state: AuthState = initialAuthState, {type, payload}: AuthAction): AuthState {
    switch (type) {
        case 'RESTORE_TOKEN':
            AsyncStorage.setItem('accessToken', (<IRestoreTokenPayload>payload).access_token)
            return {
                ...state,
                accessToken: (<IRestoreTokenPayload>payload).access_token,
                isLoading: false,
            };
        case 'AUTH_FAIL':
            return {
                ...state,
                isSignOut: false,
                error: JSON.stringify((<IAuthFailPayload>payload).error),
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





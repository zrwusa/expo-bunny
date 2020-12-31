import {AuthActions} from "./actions";
import {Auth} from "../../types/models";
import {EAuth} from "../../types/constants";

export const initialAuthState: Auth = {
    isLoading: true,
    isSignOut: false,
    accessToken: undefined,
    error: "",
    warn: "",
};

export function authReducer(state: Auth = initialAuthState, {type, payload}: AuthActions): Auth {
    switch (type) {
        case EAuth.RESTORE_TOKEN :
            return {
                ...state,
                accessToken: payload.access_token,
                isLoading: false,
            };
        case EAuth.AUTH_FAIL:
            return {
                ...state,
                isSignOut: false,
                error: payload.error,
            };
        case EAuth.AUTH_WARN:
            return {
                ...state,
                isSignOut: false,
                warn: payload.warn,
            };
        case EAuth.SIGN_OUT:
            return {
                ...state,
                isSignOut: true,
                accessToken: undefined,
            };
        case EAuth.RESTORE_TOKEN_GOOGLE:
            return {
                ...state,
                accessToken: payload.accessToken,
                isLoading: false,
            };

        default:
            return state;
    }
}





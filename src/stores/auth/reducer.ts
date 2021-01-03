import {AuthActions} from "./actions";
import {Auth} from "../../types/models";
import {EAuth} from "../../types/constants";
import {RestoreTokenGooglePayload, RestoreTokenPayload} from "../../types/payloads";

export const initialAuthState: Auth = {
    isLoading: true,
    isSignOut: false,
    accessToken: undefined,
};

export function authReducer(state: Auth = initialAuthState, {type, payload}: AuthActions): Auth {
    switch (type) {
        case EAuth.RESTORE_TOKEN :
            return {
                ...state,
                accessToken: (<RestoreTokenPayload>payload).access_token,
                isLoading: false,
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
                accessToken: (<RestoreTokenGooglePayload>payload).accessToken,
                isLoading: false,
            };
        default:
            return state;
    }
}





import {EAuth} from "../../utils/constants";
import {AuthActions} from "./actions";
import {Auth} from "../../types/models";
import {RestoreAuthPayload, RestoreAuthGooglePayload} from "../../types/payloads";

export const initialAuthState: Auth = {
    isLoading: true,
    isSignOut: false,
    accessToken: undefined,
};

export function authReducer(state: Auth = initialAuthState, {type, payload}: AuthActions): Auth {
    switch (type) {
        case EAuth.RESTORE_AUTH :
            return {
                ...state,
                accessToken: (<RestoreAuthPayload>payload).access_token,
                user: (<RestoreAuthPayload>payload).user,
                isLoading: false,
            };
        case EAuth.SIGN_OUT:
            return {
                ...state,
                isSignOut: true,
                accessToken: undefined,
                user: undefined,
            };
        case EAuth.RESTORE_AUTH_GOOGLE:
            return {
                ...state,
                accessToken: (<RestoreAuthGooglePayload>payload).accessToken,
                isLoading: false,
                user: (<RestoreAuthGooglePayload>payload).user
            };
        default:
            return state;
    }
}





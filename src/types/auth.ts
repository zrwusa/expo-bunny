// The Auth is brought out to integrate with the passport service in the future
import {ReactNode} from "react";
import {GoogleUser} from "expo-google-app-auth";

export type UserRes = {
    email: string,
    nickname: string
}

export type AuthRes = {
    access_token: string | undefined,
    refresh_token: string | undefined,
    user?: UserRes | null,
}

export type AuthedResult = {
    isLoading: boolean,
    isSignOut: boolean,
    accessToken: undefined | string | null,
    user?: (UserRes | null) | GoogleUser,
    redirection?: string | void
}
export type AuthLaborContextTypePartial = Partial<AuthLaborContextType>
export type AuthLaborContextType = {
    authFunctions: {
        signIn: Function,
        signInGoogle: Function,
        signInDummy: Function,
        signOutAndRemove: Function,
        signUp: Function,
        refreshAuth: Function
    },
    authedResult: AuthedResult
}

export type AuthLaborProviderProps = {
    children: ReactNode,
} & Partial<AuthLaborContextType>;




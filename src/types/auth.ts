import {ReactNode} from "react";
import {GoogleUser} from "expo-google-app-auth";

export type UserRes = {
    email: string,
    nickname: string
}

export type AuthRes = {
    access_token: string | undefined,
    user?: UserRes | null,
}
export type AuthedResult = {
    isLoading: boolean,
    isSignOut: boolean,
    accessToken: undefined | string | null,
    user?: (UserRes | null) | GoogleUser,
    redirection?: string | void
}

export type AuthLaborContextType = {
    authFunctions: {
        signIn: Function,
        signInGoogle: Function,
        signInDummy: Function,
        signOutAndRemove: Function,
        signUp: Function,
    },
    authedResult: AuthedResult
}

export type AuthLaborProviderProps = {
    children: ReactNode,
} & Partial<AuthLaborContextType>;




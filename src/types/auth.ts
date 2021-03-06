// The Auth is brought out to integrate with the passport service in the future
import {ReactNode} from "react";
import {GoogleUser} from "expo-google-app-auth";
import {SignInParams, SignUpParams} from "./payloads";
import {BusinessLogicReturn} from "./business";
import {Method} from "axios";

export type UserRes = {
    email: string,
    nickname: string
}

export type AuthRes = {
    accessToken: string | undefined,
    refreshToken: string | undefined,
    user?: UserRes | null,
}

export type AuthResult = {
    isSignedIn: boolean,
    accessToken: string | null,
    refreshToken: string | null,
    user?: (UserRes | null) | GoogleUser,
}
export type AuthLaborContextTypePartial = Partial<AuthLaborContextType>
export type AuthFunctions = {
    signIn: (params: SignInParams) => Promise<BusinessLogicReturn>,
    signInGoogle: () => Promise<BusinessLogicReturn>,
    signInDummy: () => Promise<BusinessLogicReturn>,
    signOut: () => Promise<BusinessLogicReturn>,
    signUp: (params: SignUpParams) => Promise<BusinessLogicReturn>,
    getAccessToken: () => Promise<string | null>,
    refreshAuth: () => Promise<BusinessLogicReturn>
}
export type AuthLaborContextType = {
    authFunctions: AuthFunctions,
    authResult: AuthResult,
}

export type AuthLaborProviderProps = {
    children: ReactNode
};

export type AuthContextConfig = {
    signInAPIMethod: Method,
    signInAPIPath: string,
    registerAPIMethod: Method,
    registerAPIPath: string,
    refreshAPIMethod: Method,
    refreshAPIPath: string,
    accessTokenValuePath: string,
    refreshTokenValuePath: string,
    userValuePath: string,
    accessTokenPersistenceKey: string,
    refreshTokenPersistenceKey: string,
    userPersistenceKey: string,
    storageType?: 'LOCAL_STORAGE' | 'NONE'
}


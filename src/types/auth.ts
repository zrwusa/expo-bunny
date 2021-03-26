// The Auth is brought out to integrate with the passport service in the future
import {ReactNode} from "react";
import {GoogleUser} from "expo-google-app-auth";
import {SignInParams, SignUpParams} from "./payloads";
import {BLResult} from "./bl";
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

export type TriggerType = 'SCREEN' | 'API' | 'MANUAL' | 'AUTO' | 'OTHERS' | undefined
export type TriggerReference = string | undefined

export type User = (UserRes | null) | GoogleUser
export type AccessToken = string | null;
export type RefreshToken = string | null;
export type TokenExp = string | null;
export type AuthResult = {
    isSignedIn: boolean,
    accessToken: AccessToken,
    refreshToken: RefreshToken,
    user?: User,
    triggerUUID: string,
    triggerType: TriggerType,
    triggerReference: TriggerReference
}

export type PersistenceAuthInfo = {
    accessToken: AccessToken,
    refreshToken?: RefreshToken,
    accessTokenExp?: TokenExp,
    refreshTokenExp?: TokenExp,
    user?: User
}

export type AuthLaborContextTypePartial = Partial<AuthLaborContextType>
export type AuthFunctions = {
    signIn: (params: SignInParams) => Promise<BLResult>,
    signInGoogle: () => Promise<BLResult>,
    signInDummy: () => Promise<BLResult>,
    signOut: (triggerType?: TriggerType) => Promise<BLResult>,
    signUp: (params: SignUpParams) => Promise<BLResult>,
    getPersistenceAuthInfo: () => Promise<PersistenceAuthInfo>,
    refreshAuth: () => Promise<BLResult>
    authTrigger: (triggerType: TriggerType) => void
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
    accessTokenExpValuePath: string,
    refreshTokenValuePath: string,
    refreshTokenExpValuePath: string,
    userValuePath: string,
    accessTokenPersistenceKey: string,
    accessTokenExpPersistenceKey: string,
    refreshTokenPersistenceKey: string,
    refreshTokenExpPersistenceKey: string,
    userPersistenceKey: string,
    storageType?: 'LOCAL_STORAGE' | 'NONE'
}


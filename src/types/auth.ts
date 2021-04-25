// The Auth is brought out to integrate with the passport service in the future
import {ReactNode} from "react";
import {GoogleUser} from "expo-google-app-auth";
import {LoginParams, SignUpParams} from "./payloads";
import {BLResult} from "./bl";
import {Method} from "axios";
import {firebase} from "../firebase/firebase";

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
export type FacebookUser = {
    id: string,
    name: string
}
export type User = (UserRes | null) | GoogleUser | FacebookUser
export type AccessToken = string | null;
export type RefreshToken = string | null;
export type TokenExp = string | null;
export type AuthResult = {
    isLogin: boolean,
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
    bunnyLogin: (params: LoginParams) => Promise<BLResult>,
    googleLogin: (isFirebase: boolean) => Promise<BLResult>,
    facebookLogin: (isFirebase: boolean) => Promise<BLResult>,
    firebaseSendOTP: (phoneInfoOptions: firebase.auth.PhoneInfoOptions | string,
                      applicationVerifier: firebase.auth.ApplicationVerifier) => Promise<BLResult>,
    firebaseConfirmOTP: (verificationId: string, verificationCode: string) => Promise<BLResult>,
    firebaseEmailLogin: (email: string, password: string) => Promise<BLResult>,
    firebaseEmailSignUp: (email: string, password: string) => Promise<BLResult>,
    firebaseResetPassword: (email: string) => Promise<BLResult>,
    dummyLogin: () => Promise<BLResult>,
    logOut: (triggerType?: TriggerType) => Promise<BLResult>,
    bunnySignUp: (params: SignUpParams) => Promise<BLResult>,
    getPersistenceAuth: () => Promise<PersistenceAuthInfo>,
    bunnyRefreshAuth: () => Promise<BLResult>
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
    loginAPIMethod: Method,
    loginAPIPath: string,
    signUpAPIMethod: Method,
    signUpAPIPath: string,
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

export type PersistenceAuthParamKey = 'accessToken' | 'accessTokenExp' | 'refreshToken' | 'refreshTokenExp' | 'user'
export type PersistenceAuthParam = Partial<{
    accessToken: string,
    accessTokenExp: string,
    refreshToken: string,
    refreshTokenExp: string
    user: any,
}>


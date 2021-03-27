// todo description this provider
import * as React from "react";
import {useEffect, useState} from "react";
import {AuthLaborProviderProps} from "../../types";
import {AuthLaborContext, authLaborContext} from "./AuthLaborContext";
import {Preparing} from "../../components/Preparing";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../i18n-labor";
import {EventRegister} from "react-native-event-listeners";
import {uuidV4} from "../../utils";

function AuthLaborProvider(props: AuthLaborProviderProps): JSX.Element {
    const {children} = props;
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'sys');
    const {authFunctions, authResult} = authLaborContext;
    const [isReady, setIsReady] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(authResult.isSignedIn)
    const [accessToken, setAccessToken] = useState(authResult.accessToken)
    const [refreshToken, setRefreshToken] = useState(authResult.refreshToken)
    const [user, setUser] = useState(authResult.user)
    const [triggerUUID, setTriggerUUID] = useState(authResult.triggerUUID)
    const [triggerType, setTriggerType] = useState(authResult.triggerType)
    const [triggerReference, setTriggerReference] = useState(authResult.triggerReference)

    useEffect(() => {
        const bootstrapAsync = async () => {
            const {accessToken, refreshToken, user} = await authFunctions.getPersistenceAuthInfo()
            if (refreshToken) {
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
                setUser(user)
                setIsSignedIn(true)
            } else {
                setAccessToken('')
                setRefreshToken('')
                setUser({})
                setIsSignedIn(false)
            }
        }
        bootstrapAsync()
            .then(() => {
                setIsReady(true)
            })
    }, [])

    useEffect(() => {
        const signInSuccessID = EventRegister.on('signInSuccess',
            (data) => {
                const {accessToken, refreshToken, user} = data;
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
                setUser(user)
                setIsSignedIn(true)
            })

        const signUpSuccessID = EventRegister.on('signUpSuccess',
            (data) => {
                const {accessToken, refreshToken, user} = data;
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
                setUser(user)
                setIsSignedIn(true)
            })

        const signInDummySuccessID = EventRegister.on('signInDummySuccess',
            (data) => {
                const {accessToken, refreshToken, user} = data;
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
                setUser(user)
                setIsSignedIn(true)
            })

        const signInGoogleSuccessID = EventRegister.on('signInGoogleSuccess',
            (data) => {
                const {accessToken, refreshToken, user} = data;
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
                setUser(user)
                setIsSignedIn(true)
            })

        const signOutSuccessID = EventRegister.on('signOutSuccess',
            () => {
                setAccessToken('')
                setRefreshToken('')
                setUser({})
                setIsSignedIn(false)
            })

        const refreshAuthSuccessID = EventRegister.on('refreshAuthSuccess',
            (accessToken) => {
                setAccessToken(accessToken)
            })

        const authTriggerID = EventRegister.on('authTrigger',
            (triggerType) => {
                setTriggerType(triggerType)
                setTriggerUUID(uuidV4())
            })

        const checkAuthID = EventRegister.on('checkIsSignedInAndSyncToProvider',
            (isSignedIn) => {
                setIsSignedIn(isSignedIn)
            })

        return () => {
            if (typeof signInSuccessID === 'string') {
                EventRegister.rm(signInSuccessID)
            }
            if (typeof signUpSuccessID === 'string') {
                EventRegister.rm(signUpSuccessID)
            }
            if (typeof signInDummySuccessID === 'string') {
                EventRegister.rm(signInDummySuccessID)
            }
            if (typeof signInGoogleSuccessID === 'string') {
                EventRegister.rm(signInGoogleSuccessID)
            }

            if (typeof signOutSuccessID === 'string') {
                EventRegister.rm(signOutSuccessID)
            }
            if (typeof refreshAuthSuccessID === 'string') {
                EventRegister.rm(refreshAuthSuccessID)
            }
            if (typeof authTriggerID === 'string') {
                EventRegister.rm(authTriggerID)
            }
            if (typeof checkAuthID === 'string') {
                EventRegister.rm(checkAuthID)
            }
        }
    }, [])

    return (
        isReady
            ? <AuthLaborContext.Provider
                value={{
                    authResult: {
                        isSignedIn,
                        accessToken,
                        refreshToken,
                        user,
                        triggerType,
                        triggerUUID,
                        triggerReference
                    },
                    authFunctions
                }}>
                {children}
            </AuthLaborContext.Provider>
            : <Preparing text={st(`AuthLaborProviderLoading`)}/>
    );
}

export {AuthLaborProvider};

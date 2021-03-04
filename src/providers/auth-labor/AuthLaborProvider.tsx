// todo description this provider
import * as React from "react";
import {useEffect, useState} from "react";
import {AuthLaborProviderProps} from "../../types";
import {AuthLaborContext, authLaborContext} from "./AuthLaborContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants from "../../constants/constants";
import {Preparing} from "../../components/Preparing";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../i18n-labor";
import {EventRegister} from 'react-native-event-listeners'

function AuthLaborProvider(props: AuthLaborProviderProps): JSX.Element {
    const {children} = props;
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'sys');
    const {authFunctions, authResult} = authLaborContext;
    const [isReady, setIsReady] = useState(false);
    const [authState, setAuthState] = useState(authResult);

    useEffect(() => {
        const bootstrapAsync = async () => {
            EventRegister.addEventListener("signInSuccess", (data) => {
                setAuthState({...authResult, ...data});
            })
            // authLaborContext.eventTarget.addEventListener('signInSuccess', ((e: CustomEvent) => {
            //     setAuthState({...authResult, ...e.detail});
            // }) as EventListener)

            EventRegister.addEventListener('signInDummySuccess', (data) => {
                setAuthState({...authResult, ...data});
            })

            EventRegister.addEventListener('signInGoogleSuccess', (data) => {
                setAuthState({...authResult, ...data});
            })

            EventRegister.addEventListener('signUpSuccess', (data) => {
                setAuthState({...authResult, ...data});
            })

            EventRegister.addEventListener('signOutSuccess', (data) => {
                setAuthState({...authResult, accessToken: '', user: {},isSignedIn:false})
            })

            EventRegister.addEventListener('refreshAuthSuccess', (data) => {
                setAuthState({...authResult, accessToken: data})
            })

            const accessToken = await AsyncStorage.getItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY);
            const refreshToken = await AsyncStorage.getItem(BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY);
            const user = await AsyncStorage.getItem(BunnyConstants.USER_PERSISTENCE_KEY);
            setAuthState({...authResult, accessToken,refreshToken, user: user ? JSON.parse(user) : {}})
        }
        bootstrapAsync()
            .then(() => {
            setIsReady(true)
        })
    }, [])

    return (
        isReady
            ? <AuthLaborContext.Provider
                value={{authResult: authState, authFunctions}}>
                {children}
            </AuthLaborContext.Provider>
            : <Preparing text={st(`AuthLaborProviderLoading`)}/>
    );
}

export {AuthLaborProvider};

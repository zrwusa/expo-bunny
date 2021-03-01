// todo description this provider
import * as React from "react";
import {useEffect, useState} from "react";
import {AuthLaborProviderProps, SignInPayload, SignUpPayload} from "../../types";
import {AuthLaborContext, authLaborContext} from "./AuthLaborContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants from "../../constants/constants";
import {sysError} from "../../store/actions";
import {useDispatch} from "react-redux";
import {Preparing} from "../../components/Preparing";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../i18n-labor";

function AuthLaborProvider(props: AuthLaborProviderProps): JSX.Element {
    const {children, authFunctions, authedResult} = props;
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'sys');

    const [isReady, setIsReady] = useState(false);
    const [authState, setAuthLaborState] = useState(authedResult || authLaborContext.authedResult);
    const signIn = async (reqParams: SignInPayload) => {
        let result;
        try {
            const signInResult = await authLaborContext.authFunctions.signIn(reqParams)
            setAuthLaborState({...authState, ...signInResult});
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };

    const signInDummy = async () => {
        let result;
        try {
            result = await authLaborContext.authFunctions.signInDummy();
            setAuthLaborState({...authState, ...result});
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };

    const signInGoogle = async () => {
        let result;
        try {
            result = await authLaborContext.authFunctions.signInGoogle()
            if (result) {
                setAuthLaborState({...authState, accessToken: result.accessToken, user: result.user});
            }
        } catch (e) {
            result = dispatch(sysError({error: e}))
        }
        return result;
    };

    const signUp = async (reqParams: SignUpPayload) => {
        let result;
        try {
            let res = await authLaborContext.authFunctions.signUp(reqParams)
            if (res) {
                result = res
                setAuthLaborState({...authState, accessToken: result.access_token, user: result.user});
            } else {

            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };

    const signOutAndRemove = async () => {
        let result;
        try {
            let res = await authLaborContext.authFunctions.signOutAndRemove()
            // await AsyncStorage.removeItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY);
            // await AsyncStorage.removeItem(BunnyConstants.USER_PERSISTENCE_KEY);
            if(res){
                setAuthLaborState({...authState, accessToken: '', user: {}})
                result = true;
            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };

    const refreshAuth = async () => {
        let result;
        try {
            const accessTokenNew = await authLaborContext.authFunctions.refreshAuth()
            if(accessTokenNew){
                setAuthLaborState({...authState, accessToken: accessTokenNew})
                result = true;
            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };
    const [authFunctionsState, setAuthLaborFunctionsState] = useState(authFunctions || {
        signIn,
        signInGoogle,
        signInDummy,
        signOutAndRemove,
        signUp,
        refreshAuth
    });

    useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const accessToken = await AsyncStorage.getItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY);
                const user = await AsyncStorage.getItem(BunnyConstants.USER_PERSISTENCE_KEY);
                setAuthLaborState({...authState, accessToken: accessToken, user: user ? JSON.parse(user) : {}})
            } catch (err) {
                dispatch(sysError(err.toString()));
            }
        }
        bootstrapAsync().then(() => {
            setIsReady(true)
        })
    }, [])

    return (
        isReady
            ? <AuthLaborContext.Provider value={{authedResult: authState, authFunctions: authFunctionsState}}>
                {children}
            </AuthLaborContext.Provider>
            : <Preparing text={st(`AuthLaborProviderLoading`)}/>
    );
}

export {AuthLaborProvider};

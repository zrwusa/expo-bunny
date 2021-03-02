// todo description this provider
import * as React from "react";
import {useEffect, useState} from "react";
import {AuthLaborProviderProps, SignInParams, SignUpParams} from "../../types";
import {AuthLaborContext, authLaborContext} from "./AuthLaborContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants from "../../constants/constants";
import {sysError} from "../../store/actions";
import {useDispatch} from "react-redux";
import {Preparing} from "../../components/Preparing";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../i18n-labor";
import {BusinessLogicError} from "../../utils";

function AuthLaborProvider(props: AuthLaborProviderProps): JSX.Element {
    const {children, authFunctions, authedResult} = props;
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'sys');

    const [isReady, setIsReady] = useState(false);
    const [authState, setAuthLaborState] = useState(authedResult || authLaborContext.authedResult);
    const signIn = async (reqParams: SignInParams) => {
        let result;
        try {
            result = await authLaborContext.authFunctions.signIn(reqParams)
            const {success, data} = result;
            if (success) {
                setAuthLaborState({...authState, ...data});
            } else {
                result = dispatch(sysError({error: new BusinessLogicError(result.message)}))
            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };

    const signInDummy = async () => {
        let result;
        try {
            result = await authLaborContext.authFunctions.signInDummy();
            const {success, data} = result;
            if (success) {
                setAuthLaborState({...authState, ...data});
            } else {
                result = dispatch(sysError({error: new BusinessLogicError(result.message)}))
            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };

    const signInGoogle = async () => {
        let result;
        try {
            result = await authLaborContext.authFunctions.signInGoogle()
            const {success, data} = result;
            if (success) {
                setAuthLaborState({...authState, ...data});
            } else {
                result = dispatch(sysError({error: new BusinessLogicError(result.message)}))
            }
        } catch (e) {
            result = dispatch(sysError({error: e}))
        }
        return result;
    };

    const signUp = async (params: SignUpParams) => {
        let result;
        try {
            let result = await authLaborContext.authFunctions.signUp(params)
            const {success, data, message} = result;
            if (success) {
                setAuthLaborState({...authState, accessToken: data.access_token, user: data.user});
            } else {
                result = dispatch(sysError({error: new BusinessLogicError(message)}))
            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };

    const signOutAndRemove = async () => {
        let result;
        try {
            let result = await authLaborContext.authFunctions.signOutAndRemove()
            const {success, message} = result;
            if (success) {
                setAuthLaborState({...authState, accessToken: '', user: {}})
            } else {
                result = dispatch(sysError({error: new BusinessLogicError(message)}))
            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };

    const refreshAuth = async () => {
        let result;
        try {
            result = await authLaborContext.authFunctions.refreshAuth()
            const {success, data, message} = result;
            if (success) {
                setAuthLaborState({...authState, accessToken: data})
            } else {
                result = dispatch(sysError({error: new BusinessLogicError(message)}))
            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };
    const [authFunctionsState] = useState(authFunctions || {
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

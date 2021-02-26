import * as React from "react";
import {AuthLaborProviderProps, AuthRes, SignInPayload, SignUpPayload} from "../../types";
import {AuthLaborContext, authLaborContext} from "./AuthLaborContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants from "../../constants/constants";
import {sysError, sysWarn} from "../../stores/sys/actions";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {Preparing} from "../../components/Preparing";
import {useTranslation} from "react-i18next";
import {stFactory} from "../i18nLabor/short-t";
import api from "../../utils/api";
import {AxiosResponse} from "axios";
import * as Google from "expo-google-app-auth";
import {ANDROID_CLIENT_ID, ANDROID_CLIENT_ID_FOR_EXPO, IOS_CLIENT_ID, IOS_CLIENT_ID_FOR_EXPO} from "@env";
import {BusinessLogicError} from "../../utils";

function AuthLaborProvider(props: AuthLaborProviderProps): JSX.Element {
    const {children, authFunctions, authedResult} = props;
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const st = stFactory(t, 'sys');

    const [isReady, setIsReady] = useState(false);
    const [authState, setAuthLaborState] = useState(authedResult || authLaborContext.authedResult);
    const signIn = async (reqParams: SignInPayload) => {
        let result;
        try {
            const {data} = await api.post<SignInPayload, AxiosResponse<AuthRes>>(`/auth/login`, reqParams)
            if (data.access_token) {
                await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, data.access_token)
            } else {
                result = dispatch(sysError({error: new BusinessLogicError('No access_token responded')}))
            }
            if (data.user) {
                await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(data.user))
            } else {
                result = dispatch(sysError({error: new BusinessLogicError('No user info responded')}))
            }
            setAuthLaborState({...authState, accessToken: data.access_token, user: data.user});
            result = data;
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };

    const signInDummy = async () => {
        let result;
        try {
            await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, 'access_token_dummy')
            const userDummy = {email: 'dummy@dummy.com', nickname: 'dummy nickname'}
            await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(userDummy))
            result = {
                accessToken: 'access_token_dummy',
                user: userDummy
            };
            setAuthLaborState({...authState, ...result});
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };

    const signInGoogle = async () => {
        let result;
        try {
            const loginResult = await Google.logInAsync({
                iosClientId: `${IOS_CLIENT_ID_FOR_EXPO}`,
                androidClientId: `${ANDROID_CLIENT_ID_FOR_EXPO}`,
                iosStandaloneAppClientId: `${IOS_CLIENT_ID}`,
                androidStandaloneAppClientId: `${ANDROID_CLIENT_ID}`,
            });
            if (loginResult) {
                switch (loginResult.type) {
                    case "cancel":
                        result = dispatch(sysWarn({warn: "Google login canceled"}));
                        break
                    case "success":
                        const {accessToken, user} = loginResult;
                        if (accessToken) {
                            try {
                                await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, accessToken)
                                await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(user))
                                result = loginResult;
                                setAuthLaborState({...authState, accessToken: result.accessToken, user: result.user});
                            } catch (err) {
                                result = dispatch(sysError({error: err}))
                            }
                        } else {
                            result = dispatch(sysError({error: new BusinessLogicError('accessToken is null')}))
                        }
                        break
                    default:
                        result = dispatch(sysError({error: new BusinessLogicError('Google loginResult has returned type neither success nor cancel')}));
                }
            } else {
                result = dispatch(sysError({error: new BusinessLogicError('No login result')}))
            }
        } catch (e) {
            result = dispatch(sysError({error: e}))
        }
        return result;
    };

    const signUp = async (reqParams: SignUpPayload) => {
        let result;
        try {
            const res = await api.post<SignUpPayload, AxiosResponse<AuthRes>>(`/auth/register`, reqParams)
            const {data} = res;
            if (data) {
                data.access_token
                    ? await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, data.access_token)
                    : dispatch(sysError({error: new BusinessLogicError('No access_token responded')}))
                data.user
                    ? await AsyncStorage.setItem(BunnyConstants.USER_PERSISTENCE_KEY, JSON.stringify(data.user))
                    : dispatch(sysError({error: new BusinessLogicError('No user info responded')}))
                result = data
                setAuthLaborState({...authState, accessToken: result.access_token, user: result.user});
            } else {
                result = dispatch(sysError({error: new BusinessLogicError('No data')}))
            }
        } catch (err) {
            result = dispatch(sysError({error: err}))
        }
        return result;
    };

    const signOutAndRemove = async () => {
        let result;
        try {
            await AsyncStorage.removeItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY);
            await AsyncStorage.removeItem(BunnyConstants.USER_PERSISTENCE_KEY);
            setAuthLaborState({...authState, accessToken: '', user: {}})
            result = true;
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
        signUp
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

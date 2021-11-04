// todo description this provider
import * as React from 'react';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {AuthLaborProviderProps, AuthResult, BLResult} from '../../types';
import {AuthLaborContext, authLaborContext} from './AuthLaborContext';
import {Preparing} from '../../components';
import {useTranslation} from 'react-i18next';
import {shortenTFunctionKey} from '../i18n-labor';
import {EventRegister} from 'react-native-event-listeners';
import {uuidV4} from '../../utils';

export const AuthLaborProvider = (props: AuthLaborProviderProps): JSX.Element => {
    const {children} = props;
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'sys');
    const {authFunctions, authResult} = authLaborContext;
    const [isReady, setIsReady] = useState(false);
    const [authResultState, setAuthResultState] = useState<AuthResult>(authResult);

    const memoizedAuthResultState = useMemo(() => {
        return authResultState;
    }, [JSON.stringify(authResultState)]);

    const handleLogin = useCallback((blResult: BLResult) => {
            const {success, data} = blResult;
            if (success) {
                const {accessToken, refreshToken, user} = data;
                setAuthResultState({
                    accessToken,
                    refreshToken,
                    user,
                    isLogin: true,
                });
            } else {
                setAuthResultState({
                    accessToken: '',
                    refreshToken: '',
                    user: undefined,
                    isLogin: false,
                });
            }
        },
        []);

    const handleCheckIsLogin = useCallback(({data}: BLResult) => {
        setAuthResultState((preState) => ({...preState, isLogin: data}));
    }, []);

    const handleAuthTrigger = useCallback((triggerType) => {
        setAuthResultState((preState) => ({...preState, triggerType, triggerUUID: uuidV4()}));
    }, []);

    const handleLogOut = useCallback(({success, message}: BLResult) => {
        if (success) {
            setAuthResultState({
                accessToken: '',
                refreshToken: '',
                user: undefined,
                isLogin: false,
            });
        } else {

        }

    }, []);

    const handleBunnyRefreshAuth = useCallback(({success, data, message}: BLResult) => {
        if (success) {
            const {accessToken} = data;
            setAuthResultState((preState) => ({...preState, accessToken}));
        } else {
            setAuthResultState((preState) => ({...preState, accessToken: ''}));
        }
    }, []);

    useEffect(() => {
        const bootstrapAsync = async () => {
            const {accessToken, refreshToken, user} = await authFunctions.getPersistenceAuth();
            if (accessToken) {
                setAuthResultState({
                    accessToken,
                    refreshToken,
                    user,
                    isLogin: true,
                });
            } else {
                setAuthResultState({
                    accessToken: '',
                    refreshToken: '',
                    user: undefined,
                    isLogin: false,
                });
            }
        };
        bootstrapAsync()
            .then(() => {
                setIsReady(true);
            });
    }, []);


    useEffect(() => {
        const loginID = EventRegister.on('login', handleLogin);

        const LogOutID = EventRegister.on('LogOut', handleLogOut);

        const bunnyRefreshAuthID = EventRegister.on('bunnyRefreshAuth', handleBunnyRefreshAuth);

        const authTriggerID = EventRegister.on('authTrigger', handleAuthTrigger);

        const checkAuthID = EventRegister.on('checkIsLogin', handleCheckIsLogin);

        return () => {
            if (typeof loginID === 'string') {
                EventRegister.rm(loginID);
            }
            if (typeof LogOutID === 'string') {
                EventRegister.rm(LogOutID);
            }
            if (typeof bunnyRefreshAuthID === 'string') {
                EventRegister.rm(bunnyRefreshAuthID);
            }
            if (typeof authTriggerID === 'string') {
                EventRegister.rm(authTriggerID);
            }
            if (typeof checkAuthID === 'string') {
                EventRegister.rm(checkAuthID);
            }
        };
    }, []);

    return (
        isReady
            ? <AuthLaborContext.Provider
                value={{
                    authResult: memoizedAuthResultState,
                    authFunctions
                }}>
                {children}
            </AuthLaborContext.Provider>
            : <Preparing text={st(`AuthLaborProviderLoading`)}/>
    );
};

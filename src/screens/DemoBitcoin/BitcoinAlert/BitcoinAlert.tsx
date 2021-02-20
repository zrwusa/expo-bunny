import * as React from "react";
import {Platform, View} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoBitcoinStackParam} from "../../../types/stacks";
import {ButtonTO, Text, TextBtn} from "../../../components/base-ui";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import getContainerStyles from "../../../containers";
import {useSizer} from "../../../styles/sizer";
import {useTheme} from "../../../styles/theme";
import * as Notifications from "expo-notifications";
import {useEffect, useState} from "react";
import {useRequest} from "../../../utils/requestHooks";
import {
    initialedNotification,
    registerForPushNotificationsAsync
} from "../../../utils/expoNotification";
import {sysError} from "../../../stores/sys/actions";
import {useDispatch} from "react-redux";

type BitcoinAlertRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
type BitcoinAlertNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
export type BitcoinAlertProps = { route?: BitcoinAlertRouteProp, navigation?: BitcoinAlertNavigationProp }

export default function BitcoinAlertScreen({}: BitcoinAlertProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.BitcoinAlert';
    const st = stFactory(t, i18nPrefix);
    const i18nSysPrefix = 'sys';
    const stSys = stFactory(t, i18nSysPrefix);
    const sizer = useSizer();
    const theme = useTheme();
    const containerStyles = getContainerStyles(sizer, theme);
    const dispatch = useDispatch()

    let notificationReceivedListener = {
        remove: () => {
        }
    };
    let notificationRespondedListener = {
        remove: () => {
        }
    };


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(initialedNotification);
    const [granularity, setGranularity] = useState(0.05)
    const request = useRequest();

    const saveAlertSetting = async function () {
        try {
            await request.post('/push-notification/alert-setting', {toke: expoPushToken})
        } catch (err) {
            dispatch(sysError({error: err}))
        }
    }

    const saveQuickAlertSettings = async function () {
        try {
            await request.post('/push-notification/alert-quick-setting', {token: expoPushToken,granularity})
        } catch (err) {
            console.log('---saveQuickAlertSettings err',err)
            dispatch(sysError({error: err}))
        }
    }

    const cancelAllAlertSettings = async function () {
        try {
            await request.put('/push-notification/cancel-all-alert-settings', {token: expoPushToken})
        } catch (err) {
            dispatch(sysError({error: err}))
        }
    }

    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });
        const initPushNotification = async () => {
            const token = await registerForPushNotificationsAsync({
                failedToGetToken: stSys(`failedToGetToken`),
                mustUsePhysicalDevice: stSys(`mustUsePhysicalDevice`)
            })
            if (token) {
                setExpoPushToken(token);
            }
            try {
                await request.post('/push-notification/register-device', {type: "BITCOIN_ALERT", token})
            } catch (err) {
                dispatch(sysError({error: err}))
            }

            notificationReceivedListener = Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

            notificationRespondedListener = Notifications.addNotificationResponseReceivedListener(response => {
                console.log('---response', response);
            });
        }
        initPushNotification().then();
        return () => {
            Notifications.removeNotificationSubscription(notificationReceivedListener);
            Notifications.removeNotificationSubscription(notificationRespondedListener);
        };
    }, []);


    return Platform.OS !== 'web' ? (
        <View style={containerStyles.screen}>
            <View>
                <RNPickerSelect
                    value={granularity}
                    items={[
                        {label: '0.1%', value: 0.001},
                        {label: '1%', value: 0.01},
                        {label: '5%', value: 0.05},
                        {label: '10%', value: 0.1},
                        {label: '20%', value: 0.2},
                        {label: '30%', value: 0.3},
                    ]}
                    onValueChange={(itemValue) => setGranularity(itemValue)}
                >
                </RNPickerSelect>
            </View>
            <View>
                <Text>Your expo push token: {expoPushToken}</Text>
                {notification
                    ? <View style={containerStyles.centralized}>
                        <Text>Title: {notification.request.content.title} </Text>
                        <Text>Body: {notification.request.content.body}</Text>
                        <Text>Data: {JSON.stringify(notification.request.content.data)}</Text>
                    </View>
                    : null}
            </View>


            <ButtonTO onPress={saveAlertSetting}>
                <TextBtn>{st(`saveAlertSetting`)}</TextBtn>
            </ButtonTO>
            <ButtonTO onPress={saveQuickAlertSettings}>
                <TextBtn>{st(`saveQuickSettings`)}</TextBtn>
            </ButtonTO>
            <ButtonTO onPress={cancelAllAlertSettings}>
                <TextBtn>{st(`cancelAllAlertSettings`)}</TextBtn>
            </ButtonTO>
        </View>
    ) : (<Text>Dummy BitcoinAlert</Text>)
}

// export default BitcoinAlertScreen;
// import {View,Text} from "../../../components/base-ui";
// import React from 'react';
// export default function BitcoinAlertScreen(){
//     return (<View><Text>xxx</Text></View>)
// }

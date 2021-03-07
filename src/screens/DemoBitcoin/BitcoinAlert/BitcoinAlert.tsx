import * as React from "react";
import {useEffect, useState} from "react";
import {Platform, View} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoBitcoinStackParam} from "../../../types";
import {ButtonTO, Text, TextBtn} from "../../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey, useRequest} from "../../../providers";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import * as Notifications from "expo-notifications";
import {initialedNotification, registerForPushNotificationsAsync} from "../../../utils/expo-notification";
import {collectBLInfo, sysError} from "../../../store/actions";
import {useDispatch} from "react-redux";
import {blInfo} from "../../../helpers";
import {createStyles} from "./styles";

type BitcoinAlertRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
type BitcoinAlertNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinAlert'>;

export interface BitcoinAlertProps {
    route?: BitcoinAlertRouteProp,
    navigation?: BitcoinAlertNavigationProp
}

export default function BitcoinAlertScreen({route, navigation}: BitcoinAlertProps) {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.BitcoinAlert');
    const i18nSysPrefix = 'sys';
    const stSys = shortenTFuciontKey(t, i18nSysPrefix);
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = createStyles(sizeLabor, themeLabor)
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
    const [reminder, setReminder] = useState({times: 3, interval: '1m'})
    const [currentPrice,setCurrentPrice] = useState(0)

    const request = useRequest();

    const saveAlertSetting = async function () {
        try {
            await request.post('/push-service/alert-settings', {toke: expoPushToken})
        } catch (err) {
            dispatch(sysError({error: err}))
        }
    }

    const saveQuickAlertSettings = async function () {
        if (!expoPushToken) {
            dispatch(collectBLInfo({error: blInfo('no expoPushToken')}))
        } else {
            try {
                await request.post('/push-service/alert-quick-settings', {token: expoPushToken, granularity,reminder})
            } catch (err) {
                dispatch(sysError({error: err}))
            }
        }

    }

    const cancelAllAlertSettings = async function () {
        try {
            await request.delete(`/push-service/alert-settings?cancel_all=true&token=${expoPushToken}`)
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
                await request.post('/push-service/devices', {type: "BITCOIN_ALERT", token})

            } catch (err) {
                dispatch(sysError({error: err}))
            }
            try{
                const {data} = await request.get('/bitcoin-prices')
                setCurrentPrice(data)
            }catch (err) {
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
                <Text style={styles.granularity.label}>{st(`currentPriceLabel`)}</Text>
                <Text>{currentPrice}</Text>
                <Text style={styles.granularity.label}>{st(`granularity`)}</Text>
                <RNPickerSelect style={styles.pickerSelector}
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
                />
                <Text style={styles.reminder.label}>{st(`remindTimesLabel`)}</Text>
                <RNPickerSelect style={styles.pickerSelector}
                                value={reminder.times}
                                items={[
                                    {label: '1', value: 1},
                                    {label: '2', value: 2},
                                    {label: '3', value: 3},
                                    {label: '5', value: 5},
                                    {label: '10', value: 10},
                                    {label: '20', value: 20},
                                ]}
                                onValueChange={(itemValue) => setReminder({...reminder, times: itemValue})}
                />
                <Text style={styles.reminder.label}>{st(`remindIntervalLabel`)}</Text>
                <RNPickerSelect style={styles.pickerSelector}
                                value={reminder.interval}
                                items={[
                                    {label: '1s', value: '1s'},
                                    {label: '10s', value: '10s'},
                                    {label: '1m', value: '1m'},
                                    {label: '5m', value: '5m'},
                                    {label: '10m', value:'10m'},
                                    {label: '30m', value:'30m'},
                                    {label: '1h', value: '1h'},
                                    {label: '2h', value: '2h'},
                                ]}
                                onValueChange={(itemValue) => setReminder({...reminder, interval: itemValue})}
                />
            </View>
            <View>
                {/*<Text>Your expo push token: {expoPushToken}</Text>*/}
                {
                    notification
                        ? <View style={containerStyles.centralized}>
                            <Text>Title: {notification.request.content.title} </Text>
                            <Text>Body: {notification.request.content.body}</Text>
                            {/*<Text>Data: {JSON.stringify(notification.request.content.data)}</Text>*/}
                        </View>
                        : null
                }
            </View>
            {/*<ButtonTO onPress={saveAlertSetting}>*/}
            {/*    <TextBtn>{st(`saveAlertSetting`)}</TextBtn>*/}
            {/*</ButtonTO>*/}
            <ButtonTO onPress={saveQuickAlertSettings}>
                <TextBtn>{st(`saveQuickSettings`)}</TextBtn>
            </ButtonTO>
            <ButtonTO onPress={cancelAllAlertSettings}>
                <TextBtn>{st(`cancelAllAlertSettings`)}</TextBtn>
            </ButtonTO>
        </View>
    ) : (<Text>Dummy BitcoinAlert</Text>)
}

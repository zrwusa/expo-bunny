import * as React from "react";
import {useEffect, useState} from "react";
import {Platform, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoBitcoinStackParam} from "../../../types";
import {ButtonTO, RNPickerSelect, Text, TextBtn} from "../../../components/UI";
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
import {createSmartStyles} from "../../../utils";

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
    const smartStyles = createSmartStyles(sizeLabor, themeLabor);
    const {row,col1,col4,colLast} = smartStyles;
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
    const [currentPrice, setCurrentPrice] = useState(0)

    const request = useRequest();

    const saveQuickAlertSettings = async function () {
        if (!expoPushToken) {
            dispatch(collectBLInfo({error: blInfo('no expoPushToken')}))
        } else {
            try {
                await request.post('/push-service/alert-quick-settings', {token: expoPushToken, granularity, reminder})
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
            try {
                const {data} = await request.get('/bitcoin-prices')
                setCurrentPrice(data)
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

    const granularityLabelPrefix = st(`granularity`).padEnd(35, '\u2004');
    const remindTimesLabelPrefix = st(`remindTimesLabel`).padEnd(35, '\u2004');
    const remindIntervalLabelPrefix = st(`remindIntervalLabel`).padEnd(35, '\u2004');
    const currentPriceLabelPrefix = st(`currentPriceLabel`).padEnd(35, '\u2004');
    return Platform.OS !== 'web' ? (
        <View style={containerStyles.Screen}>
            <View style={containerStyles.Card}>
                <View style={styles.currentPrice.box}>
                    <Text style={styles.currentPrice.text}>{currentPriceLabelPrefix + currentPrice}</Text>
                </View>
                <RNPickerSelect
                    value={granularity}
                    placeholder={{label: "Select " + granularityLabelPrefix, value: 0}}
                    items={[
                        {label: '0.1%', value: 0.001, inputLabel: granularityLabelPrefix + '0.1%'},
                        {label: '1%', value: 0.01, inputLabel: granularityLabelPrefix + '1%'},
                        {label: '5%', value: 0.05, inputLabel: granularityLabelPrefix + '5%'},
                        {label: '10%', value: 0.1, inputLabel: granularityLabelPrefix + '10%'},
                        {label: '20%', value: 0.2, inputLabel: granularityLabelPrefix + '20%'},
                        {label: '30%', value: 0.3, inputLabel: granularityLabelPrefix + '30%'},
                    ]}
                    onValueChange={(itemValue) => setGranularity(itemValue)}

                />
                <RNPickerSelect
                    value={reminder.times}
                    placeholder={{label: "Select " + remindTimesLabelPrefix, value: 0}}
                    items={[
                        {label: '1', value: 1, inputLabel: remindTimesLabelPrefix + ' 1 time'},
                        {label: '2', value: 2, inputLabel: remindTimesLabelPrefix + ' 2 times'},
                        {label: '3', value: 3, inputLabel: remindTimesLabelPrefix + ' 3 times'},
                        {label: '5', value: 5, inputLabel: remindTimesLabelPrefix + ' 5 times'},
                        {label: '10', value: 10, inputLabel: remindTimesLabelPrefix + ' 10 times'},
                        {label: '20', value: 20, inputLabel: remindTimesLabelPrefix + ' 20 times'},
                    ]}
                    onValueChange={(itemValue) => setReminder({...reminder, times: itemValue})}
                />
                <RNPickerSelect
                    value={reminder.interval}
                    placeholder={{label: "Select " + remindIntervalLabelPrefix, value: ''}}
                    items={[
                        {label: '1s', value: '1s', inputLabel: remindIntervalLabelPrefix + ' 1s'},
                        {label: '10s', value: '10s', inputLabel: remindIntervalLabelPrefix + ' 10s'},
                        {label: '1m', value: '1m', inputLabel: remindIntervalLabelPrefix + ' 1m'},
                        {label: '5m', value: '5m', inputLabel: remindIntervalLabelPrefix + ' 5m'},
                        {label: '10m', value: '10m', inputLabel: remindIntervalLabelPrefix + ' 10m'},
                        {label: '30m', value: '30m', inputLabel: remindIntervalLabelPrefix + ' 30m'},
                        {label: '1h', value: '1h', inputLabel: remindIntervalLabelPrefix + ' 1h'},
                        {label: '2h', value: '2h', inputLabel: remindIntervalLabelPrefix + ' 2h'},
                    ]}
                    onValueChange={(itemValue) => setReminder({...reminder, interval: itemValue})}
                />
            </View>
            <View style={containerStyles.Card}>
                {/*<Text>Your expo push token: {expoPushToken}</Text>*/}
                {
                    notification
                        ? <View>
                            <View style={row}>
                                <View style={col1}>
                                    <Text>Title:</Text>
                                </View>
                                <View style={col4}>
                                    <Text>{notification.request.content.title} </Text>
                                </View>
                                {/*<Text>Data: {JSON.stringify(notification.request.content.data)}</Text>*/}
                            </View>
                            <View style={row}>
                                <View style={col1}>
                                    <Text>Body:</Text>
                                </View>
                                <View style={col4}>
                                    <Text>{notification.request.content.body} </Text>
                                </View>
                            </View>
                        </View>
                        : null
                }
            </View>

            <View style={containerStyles.RowCard}>
                <View style={col1}>
                    <ButtonTO onPress={saveQuickAlertSettings}>
                        <TextBtn>{st(`saveQuickSettings`)}</TextBtn>
                    </ButtonTO>
                </View>
                <View style={[col1,colLast]}>
                    <ButtonTO onPress={cancelAllAlertSettings}>
                        <TextBtn>{st(`cancelAllAlertSettings`)}</TextBtn>
                    </ButtonTO>
                </View>
            </View>
        </View>
    ) : (<Text>Dummy BitcoinAlert</Text>)
}

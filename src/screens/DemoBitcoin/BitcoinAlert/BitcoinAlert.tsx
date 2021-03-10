import * as React from "react";
import {useEffect, useState} from "react";
import {Platform, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoBitcoinStackParam, RootState} from "../../../types";
import {ButtonTO, RNPickerSelect, Text, TextBtn} from "../../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey, useRequest} from "../../../providers";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import * as Notifications from "expo-notifications";
import {defaultNotification, registerForPushNotificationsAsync} from "../../../utils/expo-notification";
import {cancelAlertSettings, getCurrentPrice, saveQuickAlertSettings, sysError} from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
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
    const {row, col1, col4, colLast} = smartStyles;
    const styles = createStyles(sizeLabor, themeLabor)
    const dispatch = useDispatch()
    const demoBitcoinState = useSelector((rootState: RootState) => rootState.demoBitcoinState)
    const dicGranularity = demoBitcoinState.dictionaries.granularity;
    const dicReminderTimes = demoBitcoinState.dictionaries.times;
    const dicReminderInterval = demoBitcoinState.dictionaries.interval;
    const {currentPrice} = demoBitcoinState;

    let notificationReceivedListener = {
        remove: () => {
        }
    };
    let notificationRespondedListener = {
        remove: () => {
        }
    };


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(defaultNotification);
    const [granularity, setGranularity] = useState(0.05)
    const [reminder, setReminder] = useState({times: 3, interval: '1m'})

    const request = useRequest();

    const handleSaveQuickAlertSettings = async function () {
        dispatch(saveQuickAlertSettings({token: expoPushToken, granularity, reminder}))
    }

    const handleCancelAllAlertSettings = async function () {
        dispatch(cancelAlertSettings({token: expoPushToken, cancelAll: true}))
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
            // try {
            //     await request.post('/push-service/devices', {type: "BITCOIN_ALERT", token})
            // } catch (err) {
            //     dispatch(sysError({error: err}))
            // }
            try {
                dispatch(getCurrentPrice())
            } catch (e) {
                dispatch(sysError(e))
            }

            notificationReceivedListener = Notifications
                .addNotificationReceivedListener((notification) => {
                    setNotification(notification);
                });

            notificationRespondedListener = Notifications
                .addNotificationResponseReceivedListener(response => {
                });
        }
        initPushNotification().then();
        return () => {
            Notifications.removeNotificationSubscription(notificationReceivedListener);
            Notifications.removeNotificationSubscription(notificationRespondedListener);
        };
    }, []);

    const granularityLabelPrefix = st(`granularity`).padEnd(35, '\u2004');
    const mappedDicGranularity = dicGranularity.map(item => {
        item.inputLabel = granularityLabelPrefix + item.label
        return item
    })
    const remindTimesLabelPrefix = st(`remindTimesLabel`).padEnd(35, '\u2004');
    const mappedDicReminderTimes = dicReminderTimes.map(item => {
        item.inputLabel = remindTimesLabelPrefix + item.label
        return item
    })

    const remindIntervalLabelPrefix = st(`remindIntervalLabel`).padEnd(35, '\u2004');
    const mappedDicReminderInterval = dicReminderInterval.map(item => {
        item.inputLabel = remindIntervalLabelPrefix + item.label
        return item
    })

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
                    items={mappedDicGranularity}
                    onValueChange={(itemValue) => setGranularity(itemValue)}
                />
                <RNPickerSelect
                    value={reminder.times}
                    placeholder={{label: "Select " + remindTimesLabelPrefix, value: 0}}
                    items={mappedDicReminderTimes}
                    onValueChange={(itemValue) => setReminder({...reminder, times: itemValue})}
                />
                <RNPickerSelect
                    value={reminder.interval}
                    placeholder={{label: "Select " + remindIntervalLabelPrefix, value: ''}}
                    items={mappedDicReminderInterval}
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
                    <ButtonTO onPress={handleSaveQuickAlertSettings}>
                        <TextBtn>{st(`saveQuickSettings`)}</TextBtn>
                    </ButtonTO>
                </View>
                <View style={[col1, colLast]}>
                    <ButtonTO onPress={handleCancelAllAlertSettings}>
                        <TextBtn>{st(`cancelAlertSettings`)}</TextBtn>
                    </ButtonTO>
                </View>
            </View>
        </View>
    ) : (<Text>Dummy BitcoinAlert</Text>)
}

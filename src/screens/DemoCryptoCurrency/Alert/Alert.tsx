import * as React from "react";
import {useEffect, useState} from "react";
import {Platform, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {DemoCryptoCurrencyStackParam, RootStackParam, RootState} from "../../../types";
import {ButtonTO, InButtonText, PickerSelectChevronRight, Text} from "../../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers";
import {Col, getContainerStyles, Row} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import * as Notifications from "expo-notifications";
import {defaultNotification, registerForPushNotificationsAsync} from "../../../utils/expo-notification";
import {cancelAlertSettings, getCurrentPrice, saveQuickAlertSettings, sysError} from "../../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import {getStyles} from "./styles";
import {getSharedStyles} from "../../../utils";
import {StackNavigationProp} from "@react-navigation/stack";

type CryptoCurrencyAlertRouteProp = RouteProp<DemoCryptoCurrencyStackParam, 'CryptoCurrencyAlert'>;
type CryptoCurrencyAlertNavigationProp = StackNavigationProp<RootStackParam, 'DemoCryptoCurrency'>;

export interface CryptoCurrencyAlertProps {
    route?: CryptoCurrencyAlertRouteProp,
    navigation?: CryptoCurrencyAlertNavigationProp
}

export default function CryptoCurrencyAlertScreen({route, navigation}: CryptoCurrencyAlertProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.CryptoCurrencyAlert');
    const i18nSysPrefix = 'sys';
    const stSys = shortenTFunctionKey(t, i18nSysPrefix);
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor)
    const dispatch = useDispatch()
    const {currentPrice, dictionaries} = useSelector((rootState: RootState) => rootState.demoCryptoCurrencyState)
    const dicGranularity = dictionaries.granularity;
    const dicReminderTimes = dictionaries.times;
    const dicReminderInterval = dictionaries.interval;

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

    const currentPriceLabelPrefix = st(`currentPriceLabel`).padEnd(30, '\u2004');

    return Platform.OS !== 'web' ? (
        <View style={containerStyles.Screen}>
            <View style={styles.container}>
                <View>
                    {/*<Text>Your expo push token: {expoPushToken}</Text>*/}
                    {
                        notification
                            ? <View>
                                <Row>
                                    <Col size={1}>
                                        <Text>Title:</Text>
                                    </Col>
                                    <Col size={4}>
                                        <Text>{notification.request.content.title} </Text>
                                    </Col>
                                    {/*<Text>Data: {JSON.stringify(notification.request.content.data)}</Text>*/}
                                </Row>
                                <Row>
                                    <Col size={1}>
                                        <Text>Body:</Text>
                                    </Col>
                                    <Col size={4}>
                                        <Text>{notification.request.content.body} </Text>
                                    </Col>
                                </Row>
                            </View>
                            : null
                    }
                </View>
                <View>
                    <View style={styles.box}>
                        <Text style={styles.text}>{currentPriceLabelPrefix + currentPrice}</Text>
                    </View>
                    <PickerSelectChevronRight
                        value={granularity}
                        placeholder={{label: "Select " + granularityLabelPrefix, value: 0}}
                        items={mappedDicGranularity}
                        onValueChange={(itemValue) => setGranularity(itemValue)}
                    />
                    <PickerSelectChevronRight
                        value={reminder.times}
                        placeholder={{label: "Select " + remindTimesLabelPrefix, value: 0}}
                        items={mappedDicReminderTimes}
                        onValueChange={(itemValue) => setReminder({...reminder, times: itemValue})}
                    />
                    <PickerSelectChevronRight
                        value={reminder.interval}
                        placeholder={{label: "Select " + remindIntervalLabelPrefix, value: ''}}
                        items={mappedDicReminderInterval}
                        onValueChange={(itemValue) => setReminder({...reminder, interval: itemValue})}
                    />
                </View>
                <Row style={styles.bottomBar}>
                    <Col size={1}>
                        <ButtonTO onPress={handleSaveQuickAlertSettings}>
                            <InButtonText>{st(`saveQuickSettings`)}</InButtonText>
                        </ButtonTO>
                    </Col>
                    <Col size={1} style={{marginLeft: 6}}>
                        <ButtonTO onPress={handleCancelAllAlertSettings}>
                            <InButtonText>{st(`cancelAlertSettings`)}</InButtonText>
                        </ButtonTO>
                    </Col>
                </Row>
            </View>
        </View>
    ) : (<Text>Dummy CryptoCurrencyAlert</Text>)
}

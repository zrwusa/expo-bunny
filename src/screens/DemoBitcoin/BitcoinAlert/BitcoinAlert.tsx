import * as React from "react";
import {Platform, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoBitcoinStackParam} from "../../../types/stacks";
import {Button, Text} from "../../../components/base-ui";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../../lang/short-t";
import getContainerStyles from "../../../containers";
import {useSizer} from "../../../styles/sizer";
import {useTheme} from "../../../styles/theme";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import {useEffect, useRef, useState} from "react";
import _ from "lodash";
import {useRequest} from "../../../utils/requestHooks";

type BitcoinAlertRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
type BitcoinAlertNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinAlert'>;
export type BitcoinAlertProps = { route: BitcoinAlertRouteProp, navigation: BitcoinAlertNavigationProp }

function BitcoinAlertScreen({route, navigation}: BitcoinAlertProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.BitcoinAlert';
    const st = stFactory(t, i18nPrefix);
    const sizer = useSizer();
    const theme = useTheme();
    const containerStyles = getContainerStyles(sizer, theme);

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    // type Comparator = 'lt' | 'le' | 'eq' | 'ne' | 'ge' | 'gt';
    // type NotificationInterval = '1m' | '5m' | '10m' | '30m' | '1h' | number;
    // type AlertSetting = {
    //     id: number,
    //     price: number,
    //     comparator: Comparator,
    //     notificationTimes: number,
    //     notificationInterval: NotificationInterval
    // }

    // const alertSettings: AlertSetting[] = [
    //     {
    //         id: 0,
    //         price: 50000,
    //         comparator: 'lt',
    //         notificationTimes: 2,
    //         notificationInterval: '1m'
    //     }
    // ]

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const request = useRequest();

    useEffect(() => {

        registerForPushNotificationsAsync({
            failedToGetToken: st(`failedToGetToken`),
            mustUsePhysicalDevice: st(`mustUsePhysicalDevice`)
        })
            .then(token => {
                setExpoPushToken(token);
                request.post('/push-notification/register-device',{type:"BITCOIN_ALERT",token})
            });

        // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //     setNotification(notification);
        // });

        // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        //     console.log(response);
        // });

        return () => {
            // Notifications.removeNotificationSubscription(notificationListener);
            // Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    // useEffect(() => {
    //     const ws = new WebSocket('wss://ws.bitstamp.net');
    //
    //     // Currency pairs: btcusd, btceur, btcgbp, btcpax, btcusdc, gbpusd, gbpeur, eurusd, xrpusd, xrpeur, xrpbtc, xrpgbp, xrppax, ltcusd, ltceur, ltcbtc, ltcgbp, ethusd, etheur, ethbtc, ethgbp, ethpax, ethusdc, bchusd, bcheur, bchbtc, bchgbp, paxusd, paxeur, paxgbp, xlmbtc, xlmusd, xlmeur, xlmgbp, linkusd, linkeur, linkgbp, linkbtc, linketh, omgusd, omgeur, omggbp, omgbtc, usdcusd, usdceur
    //     const subscribeMsg = {
    //         "event": "bts:subscribe",
    //         "data": {
    //             "channel": "live_trades_btcusd"
    //         }
    //     };
    //
    //     const unSubscribeMsg = {
    //         "event": "bts:unsubscribe",
    //         "data": {
    //             "channel": "live_trades_btcusd"
    //         }
    //     };
    //
    //     const reconnectMsg = {
    //         "event": "bts:request_reconnect",
    //         "channel": "",
    //         "data": ""
    //     }
    //
    //     const reconnectTimesConfig = 3;
    //     const reconnectTimes = 0;
    //
    //     const compare = (nowPrice: number, alertSetting: AlertSetting): boolean => {
    //         const {price} = alertSetting;
    //         console.log('---nowPrice,price', nowPrice, price)
    //         switch (alertSetting.comparator) {
    //             case "eq":
    //                 return nowPrice === price
    //             case "ge":
    //                 return nowPrice >= price
    //             case "gt":
    //                 return nowPrice > price
    //             case "le":
    //                 return nowPrice <= price
    //             case "lt":
    //                 return nowPrice < price
    //             case "ne":
    //                 return nowPrice !== price
    //             default:
    //                 return false
    //         }
    //     }
    //
    //     const onWSOpen = (e: Event) => {
    //         console.log('---onWSOpen');
    //         ws.send(JSON.stringify(subscribeMsg));
    //     }
    //     ws.addEventListener('open', onWSOpen)
    //
    //     const onWSMessage = (e: MessageEvent) => {
    //         console.log('---onWSMessage');
    //         const data = JSON.parse(e.data).data;
    //         const nowPrice = data.price;
    //         if (nowPrice) {
    //             for (let i in alertSettings) {
    //                 console.log('---i', i)
    //                 const comparedResult = compare(nowPrice, alertSettings[i]);
    //                 console.log('---comparedResult', comparedResult)
    //                 // todo
    //                 if (comparedResult) {
    //                     // schedulePushNotification(data)
    //                     //     .then(() => {
    //                     //         _.remove(alertSettings, (item) => {
    //                     //             return item.id === alertSettings[i].id
    //                     //         })
    //                     //         console.log('---alertSettings', alertSettings)
    //                     //     });
    //                 }
    //             }
    //         }
    //     };
    //
    //     ws.addEventListener('message', onWSMessage)
    //
    //     const onWSError = (e: Event) => {
    //         console.log('---onWSError', e);
    //         if (reconnectTimes < reconnectTimesConfig) {
    //             ws.send(JSON.stringify(reconnectMsg))
    //         }
    //     };
    //
    //     ws.addEventListener('error', onWSError)
    //
    //     const onWSClose = (e: CloseEvent) => {
    //         console.log('---onWSClose', e);
    //     };
    //
    //     ws.addEventListener('close', onWSClose)
    //
    //     return () => {
    //         ws.send(JSON.stringify(unSubscribeMsg));
    //         ws.close();
    //         setTimeout(() => {
    //             ws.removeEventListener('open', onWSOpen);
    //             ws.removeEventListener('message', onWSMessage);
    //             ws.removeEventListener('error', onWSError);
    //             ws.removeEventListener('close', onWSClose);
    //         }, 600)
    //     };
    // }, [])

    return Platform.OS !== 'web' ? (
        <View style={containerStyles.screen}>
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                title={st(`scheduleNotification`)}
                onPress={async () => {
                    // await schedulePushNotification({
                    //     "buy_order_id": 1327959553695744,
                    //     "amount_str": "0.00215808",
                    //     "timestamp": "1613043850",
                    //     "microtimestamp": "1613043850907000",
                    //     "id": 150234166,
                    //     "amount": 0.00215808,
                    //     "sell_order_id": 1327959557120001,
                    //     "price_str": "46235.51",
                    //     "type": 1,
                    //     "price": 46235.51
                    // });
                }}
            />
        </View>
    ) : (<Text>Dummy BitcoinAlert</Text>)
}

// type BitStampWSData = {
//     "buy_order_id": number,
//     "amount_str": string,
//     "timestamp": string,
//     "microtimestamp": string,
//     "id": number,
//     "amount": number,
//     "sell_order_id": number,
//     "price_str": string,
//     "type": number,
//     "price": number
// }

// async function schedulePushNotification(wsData: BitStampWSData) {
//     const {price, amount, microtimestamp} = wsData;
//     console.log('---price, amount, microtimestamp', price, amount, microtimestamp)
//     await Notifications.scheduleNotificationAsync({
//         content: {
//             title: `Price is ${price} 📬`,
//             body: `Amount: ${amount},Time ${microtimestamp}`,
//             data: {data: wsData},
//         },
//         trigger: {seconds: 10},
//     });
// }

type Copywriting = {
    failedToGetToken: string,
    mustUsePhysicalDevice: string
}

async function registerForPushNotificationsAsync(copywriting: Copywriting) {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert(copywriting.failedToGetToken);
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        // alert(copywriting.mustUsePhysicalDevice);
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

export default BitcoinAlertScreen;

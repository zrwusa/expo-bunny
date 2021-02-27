import * as Notifications from 'expo-notifications';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from "../../components/UI";
import {Platform} from 'react-native';
import {initialedNotification, registerForPushNotificationsAsync, schedulePushNotification} from "../../utils/expo-notification";
import {stFactory} from "../../providers/i18nLabor";
import {useTranslation} from "react-i18next";


export default function DemoNotificationScreen() {

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
    // const notificationListener = useRef();
    // const responseListener = useRef();

    const {t} = useTranslation()
    const i18nSysPrefix = 'sys';
    const stSys = stFactory(t, i18nSysPrefix);

    useEffect(() => {
        // async function registerForPushNotificationsAsync() {
        //     let token;
        //     if (Constants.isDevice) {
        //         const {status: existingStatus} = await Notifications.getPermissionsAsync();
        //         let finalStatus = existingStatus;
        //         if (existingStatus !== 'granted') {
        //             const {status} = await Notifications.requestPermissionsAsync();
        //             finalStatus = status;
        //         }
        //         if (finalStatus !== 'granted') {
        //             alert('Failed to get push token for push notification!');
        //             return;
        //         }
        //         token = (await Notifications.getExpoPushTokenAsync()).data;
        //     } else {
        //         alert('Must use physical device for Push Notifications');
        //     }
        //
        //     if (Platform.OS === 'android') {
        //         await Notifications.setNotificationChannelAsync('default', {
        //             name: 'default',
        //             importance: Notifications.AndroidImportance.MAX,
        //             vibrationPattern: [0, 250, 250, 250],
        //             lightColor: '#FF231F7C',
        //         });
        //     }
        //     return token;
        // }

        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
            }),
        });
        registerForPushNotificationsAsync({
            failedToGetToken: stSys(`failedToGetToken`),
            mustUsePhysicalDevice: stSys(`mustUsePhysicalDevice`)
        })
            .then(token => {
                if (token) {
                    setExpoPushToken(token)
                }
            });

        notificationReceivedListener = Notifications.addNotificationReceivedListener(notification => {
            console.log('---notification', notification);
            setNotification(notification);
        });

        notificationRespondedListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('---response', response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationReceivedListener);
            Notifications.removeNotificationSubscription(notificationRespondedListener);
        };
    }, []);

    return Platform.OS !== 'web' ? (
        // <Text>Dummy notification</Text>
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'space-around',
            }}>
            <Text>Your expo push token: {expoPushToken}</Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text>Title: {notification && notification.request.content.title} </Text>
                <Text>Body: {notification && notification.request.content.body}</Text>
                <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            </View>
            <Button
                title="Press to schedule a notification"
                onPress={async () => {
                    await schedulePushNotification();
                }}
            />
        </View>
    ) : (<Text>Dummy notification</Text>)

}

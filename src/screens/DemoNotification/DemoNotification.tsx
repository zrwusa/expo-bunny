import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, {useState, useEffect, useRef} from 'react';
import {Text, View, Button, Platform} from 'react-native';
import {initialedNotification} from "../../utils/expoNotification";


export default function DemoNotificationScreen() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });
    let notificationReceivedListener = {
        remove: () => {
        }
    };
    let notificationResponseListener = {
        remove: () => {
        }
    };
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(initialedNotification);
    // const notificationListener = useRef();
    // const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            if (token) {
                setExpoPushToken(token)
            }
        });

        notificationReceivedListener = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        notificationResponseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationReceivedListener);
            Notifications.removeNotificationSubscription(notificationResponseListener);
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

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: {data: 'goes here'},
        },
        trigger: {seconds: 2},
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

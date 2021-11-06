import {Platform} from 'react-native';
import * as Notifications from 'expo-notifications';
import {Notification} from 'expo-notifications';
import Constants from 'expo-constants';
import {collectBizLogicResult} from '../store/actions';
import {bizLogicSuccess} from '../helpers';
import store from '../store/store';

export type Copywriting = {
    failedToGetToken: string,
    mustUsePhysicalDevice: string
}

export const registerForPushNotificationsAsync = async (copywriting: Copywriting) => {
    let token;
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            store.dispatch(collectBizLogicResult(bizLogicSuccess(undefined, copywriting.failedToGetToken)));
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        store.dispatch(collectBizLogicResult(bizLogicSuccess(undefined, copywriting.mustUsePhysicalDevice)));
        return;
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
};


export const schedulePushNotification = async () => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: 'You\'ve got mail! 📬',
            body: 'Here is the notification body',
            sound: 'default',
            data: {data: 'goes here'},
        },
        trigger: {seconds: 2},
    });
};

export const defaultNotification: Notification = {
    'request': {
        'trigger': {
            'type': 'push',
        },
        'identifier': 'XXXxXXXx-XXXx-XXXx-XXXx-XXXxXXXxXXXx',
        'content': {
            'body': 'body',
            'sound': 'default',
            'launchImageName': '',
            'subtitle': null,
            'title': null,
            'data': {},
            'categoryIdentifier': '',
            'attachments': [],
            'threadIdentifier': '',
        }
    },
    'date': new Date().getMilliseconds()
};

// const demoNotification: Notification = {
//     "request": {
//         "trigger": {
//             "type": "push",
//             "payload": {
//                 "experienceId": "@zrwusa/expo-react-bunny",
//                 "body": {
//                     "amount": 0.06234018,
//                     "type": 1,
//                     "amount_str": "0.06234018",
//                     "id": 151386336,
//                     "price_str": "47487.83",
//                     "price": 47487.83,
//                     "microtimestamp": "1613382537145000",
//                     "buy_order_id": 1329346815680513,
//                     "timestamp": "1613382537",
//                     "sell_order_id": 1329346815950849
//                 },
//                 "aps": {
//                     "thread-id": "",
//                     "category": "",
//                     "alert": {"subtitle": "", "title": "", "launch-image": "", "body": "Price is 47488,Alert: <47488.41 ,Re Try Times: 3"},
//                     "sound": "default"
//                 }
//             }
//         },
//         "identifier": "FF91ED9E-0978-47C9-8736-F388EBB53016",
//         "content": {
//             "body": "Price is 47488,Alert: <47488.41 ,Re Try Times: 3",
//             "sound": "default",
//             "launchImageName": "",
//             "badge": null,
//             "subtitle": null,
//             "title": null,
//             "data": {
//                 "sell_order_id": 1329346815950849,
//                 "timestamp": "1613382537",
//                 "buy_order_id": 1329346815680513,
//                 "microtimestamp": "1613382537145000",
//                 "price": 47487.83,
//                 "price_str": "47487.83",
//                 "id": 151386336,
//                 "amount_str": "0.06234018",
//                 "type": 1,
//                 "amount": 0.06234018
//             },
//             "summaryArgument": null,
//             "categoryIdentifier": "",
//             "attachments": [],
//             "threadIdentifier": "",
//             "targetContentIdentifier": undefined,
//             "summaryArgumentCount": 0
//         }
//     }, "date": 1613382542.0082803
// };

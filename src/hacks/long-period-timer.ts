import {InteractionManager, Platform} from 'react-native';
import {JSONSerializable} from "../types";

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
// Work around issue `Setting a timer for long time`,
// when use Firebase-JS-SDK with Expo,we encounter this issue,
// unfortunately Firebase does't recommend to use js sdk with react native.
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix: JSONSerializable = {};
    const runTask = (id: string, fn: (...args: any[]) => void, ttl: number, args: any[]) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    // @ts-ignore
    global.setTimeout = (fn: (...args: any[]) => void, time?: number, ...args: any[]) => {
        if (time) {
            if (MAX_TIMER_DURATION_MS < time) {
                const ttl = Date.now() + time;
                const id = '_lt_' + Object.keys(timerFix).length;
                runTask(id, fn, ttl, args);
                return id;
            }
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = (id: any) => {
        if (typeof id === 'string' && id.startsWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}

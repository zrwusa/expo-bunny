import {Platform} from 'react-native';

import * as Updates from 'expo-updates';

async function restartAppNative() {
    return await Updates.reloadAsync();
}

async function restartAppWeb() {
    return new Promise((resolve, reject) => {
        const numberRandom = Math.random();
        numberRandom > 0.5 ? resolve('Mock restarting web success') : reject('Mock restarting web failed');
    });
}

export async function restartApp() {
    return Platform.select({
        web: restartAppWeb(),
        default: restartAppNative()
    });
}

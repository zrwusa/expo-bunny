import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants from "./constants";
// const AsyncStorageNext = AsyncStorage
const AsyncStorageNext = {
    getItem: async (key: string): Promise<string | null> => {
        if (process.platform === 'darwin') {
            let rtValue = '';
            switch (key) {
                case BunnyConstants.LANGUAGE_TYPE_PERSISTENCE_KEY:
                    rtValue = 'zh';
                    break;
                case BunnyConstants.USER_PERSISTENCE_KEY:
                    rtValue = JSON.stringify(BunnyConstants.dummyUser);
                    break;
                case BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY:
                    rtValue = BunnyConstants.dummyAccessToken;
                    break
                case BunnyConstants.NAV_STATE_PERSISTENCE_KEY:
                    rtValue = JSON.stringify({
                        "stale": false,
                        "type": "stack",
                        "key": "stack-eipcgIw9cJ2PCv9x9GOxR",
                        "index": 0,
                        "routeNames": ["Home", "Profile", "DemoFCReduxHook", "DemoCollection", "DemoRoute", "DemoThirdPart", "DemoThunkCC", "DemoShare", "DemoNotification", "DemoModal", "DemoTab", "DemoDrawer", "DemoNestedLv0", "DemoRNComponents", "DemoBitcoin", "Settings", "DemoSuspense", "DemoTheme"],
                        "routes": [{"name": "Home", "key": "Home-6-Wb-CMGzChjMY4xwnlFg"}]
                    });
                    break;
                case BunnyConstants.THEME_NAME_PERSISTENCE_KEY:
                    rtValue = 'dark';
                    break;
            }
            return new Promise(resolve => resolve(rtValue));
        } else {
            return AsyncStorage.getItem(key);
        }
    },
    setItem: async (key: string, value: string) => {
        if (process.platform === 'darwin') {
            return new Promise(resolve => resolve("asyncStorageNextSetItem"));
        } else {
            return AsyncStorage.setItem(key, value);
        }
    },
    removeItem: async (key: string) => {
        if (process.platform === 'darwin') {
            return new Promise(resolve => resolve("asyncStorageNextRemoveItem"));
        } else {
            return AsyncStorage.removeItem(key);
        }
    }
}
export default AsyncStorageNext

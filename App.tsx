import {Platform} from "react-native";

export {default} from "./src/index";

if (__DEV__ && Platform.OS !== 'web') {
    // todo expo-notifications gets an error
    // global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
    // global.WebSocket = global.originalWebSocket || global.WebSocket;
}

// import * as Sentry from 'sentry-expo';
//
// Sentry.init({
//     dsn: 'https://sentry.io/welcome/',
//     enableInExpoDevelopment: true,
//     debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
// });

// // Access any @sentry/react-native exports via:
// Sentry.Native.*
//
// // Access any @sentry/browser exports via:
// Sentry.Browser.*


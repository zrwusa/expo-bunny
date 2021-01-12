import * as React from 'react';
import {Provider as ReduxProvider} from "react-redux";
import store from "./stores";
import App from "./App";

export default function () {
    return (
        <ReduxProvider store={store}>
            <App/>
        </ReduxProvider>
    )
}

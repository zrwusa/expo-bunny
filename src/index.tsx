import React from 'react';
import {Provider as ReduxProvider} from "react-redux";
import store from "./stores";
import App from "./App";
import "./i18n/i18next";

export default function () {
    return (
        <ReduxProvider store={store}>
            {/*<I18nextProvider i18n={i18n}>*/}
            <App/>
            {/*</I18nextProvider>*/}
        </ReduxProvider>
    )
}

import React, {Suspense} from 'react';
import {Provider as ReduxProvider} from "react-redux";
import store from "./stores";
import App from "./App";
import i18n from "./lang/i18next";
import {I18nextProvider} from "react-i18next";
import {DemoLazyLoading} from "./components/DemoLazyLoading";

export default function () {
    return (
        <Suspense fallback={<DemoLazyLoading/>}>
            <ReduxProvider store={store}>
                <I18nextProvider i18n={i18n}>
                    <App/>
                </I18nextProvider>
            </ReduxProvider>
        </Suspense>
    )
}

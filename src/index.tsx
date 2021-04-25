import React, {Suspense} from 'react';
import {Provider as ReduxProvider} from "react-redux";
import store, {rrfProps} from "./store";
import App from "./App";
import {DemoLazyLoading} from "./components/DemoLazyLoading";
import {ReactReduxFirebaseProvider} from "react-redux-firebase";
import "./hacks/long-period-timer"

export default function index() {
    const renderInner = () => <ReduxProvider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App/>
        </ReactReduxFirebaseProvider>
    </ReduxProvider>

    // SSR does not support Suspense
    const suspenseWrapped = () => <Suspense fallback={<DemoLazyLoading/>}>
        {renderInner()}
    </Suspense>

    return renderInner()
}

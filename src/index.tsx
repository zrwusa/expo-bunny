import React, {Suspense} from 'react';
import {Provider as ReduxProvider} from "react-redux";
import store from "./store";
import App from "./App";
import {DemoLazyLoading} from "./components/DemoLazyLoading";

export default function index() {
    const renderInner = () => <ReduxProvider store={store}>
        <App/>
    </ReduxProvider>

    // SSR does not support Suspense
    const suspenseWrapped = () => <Suspense fallback={<DemoLazyLoading/>}>
        {renderInner()}
    </Suspense>

    return renderInner()
}

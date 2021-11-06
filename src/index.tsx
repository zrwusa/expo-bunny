import React, {Suspense} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import store, {reduxMiddlewareManager, rrfProps} from './store/store';
import App from './App';
import {DemoLazyLoading} from './components';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import './hacks/long-period-timer';

import createSagaMiddleware from 'redux-saga';
import {sagasGenerator} from './store/sagas';
import thunkMiddleware from 'redux-thunk';

export const sagaMiddleware = createSagaMiddleware();
// you might choose one redux middleware which you prefer,
// just delete the demos you not prefer,or just use them all
reduxMiddlewareManager.addMiddleware(sagaMiddleware);
reduxMiddlewareManager.addMiddleware(thunkMiddleware);
sagaMiddleware.run(sagasGenerator);

export default function index() {
    const renderInner = () => <ReduxProvider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App/>
        </ReactReduxFirebaseProvider>
    </ReduxProvider>;

    // SSR does not support Suspense
    const suspenseWrapped = () => <Suspense fallback={<DemoLazyLoading/>}>
        {renderInner()}
    </Suspense>;

    return renderInner();
}

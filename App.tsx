import * as React from 'react';
import {Provider as ReduxProvider} from "react-redux";
import store from "./src/stores";
import App from "./src/App";

function main() {
    return (
        <ReduxProvider store={store}>
            <App />
        </ReduxProvider>
    )
}

export default main;


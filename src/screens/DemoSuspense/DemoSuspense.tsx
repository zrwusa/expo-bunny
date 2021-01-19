import React from 'react';
import {DemoLazy100, DemoLazy2000} from "../../components/DemoLazy/DemoLazy";
import {View} from "../../components/base-ui";
import styles from "./styles";

export const DemoSuspenseScreen = () => {
    return (
        <View style={styles.container}>
            <DemoLazy100/>
            <DemoLazy2000/>
        </View>
    )
}

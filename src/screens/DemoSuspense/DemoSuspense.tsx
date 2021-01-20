import React from 'react';
import {View} from "../../components/base-ui";
import styles from "./styles";
import {useTranslation} from "react-i18next";

const DemoLazy100 = React.lazy(async () => {
        const module = await import('../../components/DemoLazy/DemoLazy')
        await new Promise(resolve => setTimeout(resolve, 100));
        return {default: module.DemoLazy}
    }
);

const DemoLazy2000 = React.lazy(async () => {
        const module = await import('../../components/DemoLazy/DemoLazy')
        await new Promise(resolve => setTimeout(resolve, 2000));
        return {default: module.DemoLazy}
    }
);

export const DemoSuspenseScreen = () => {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.DemoSuspense';
    return (
        <View style={styles.container}>
            <DemoLazy100 title={t(`${i18nPrefix}.labels.lazyComponentTitle`)}/>
            <DemoLazy2000 title={t(`${i18nPrefix}.labels.lazyComponentTitle`)}/>
        </View>
    )
}

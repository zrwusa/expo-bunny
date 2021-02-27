import React from 'react';
import {View, Text} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../providers/i18nLabor";
import getContainerStyles from "../../containers";
import {useSizeLabor} from "../../providers/sizeLabor";
import {useThemeLabor} from "../../providers/themeLabor";
import {wait} from "../../utils";

const DemoLazy100 = React.lazy(async () => {
        const module = await import('../../components/DemoLazy/DemoLazy')
        await wait(100);
        return {default: module.DemoLazy}
    }
);

const DemoLazy2000 = React.lazy(async () => {
        const module = await import('../../components/DemoLazy/DemoLazy')
        await wait(2000);
        return {default: module.DemoLazy}
    }
);

export const DemoSuspenseScreen = () => {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.DemoSuspense');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.screen, containerStyles.centralized]}>
            {/*{isServerSide*/}
            {/*    ? <Text>SSR does not support React.lazy</Text> :*/}
            {/*    <>*/}
            {/*        <DemoLazy100 title={st(`lazyComponentTitle`)}/>*/}
            {/*        <DemoLazy2000 title={st(`lazyComponentTitle`)}/>*/}
            {/*    </>*/}
            {/*}*/}
            <Text>{st('noSupporting')}</Text>
        </View>
    )
}

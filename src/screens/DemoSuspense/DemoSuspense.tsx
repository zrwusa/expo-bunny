import React from 'react';
import {Text, View} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../providers/i18n-labor";
import {createContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {createSmartStyles, wait} from "../../utils";

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
    const st = shortenTFuciontKey(t, 'screens.DemoSuspense');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    const {smartStyles} = createSmartStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, smartStyles.centralized]}>
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

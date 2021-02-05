import React from 'react';
import {View, Text} from "../../components/base-ui";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../lang/short-t";
import getContainerStyles from "../../containers";
// import {isServerSide} from "../../utils/utils";

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
    const st = stFactory(t, 'screens.DemoSuspense');
    const containerStyles = getContainerStyles()

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

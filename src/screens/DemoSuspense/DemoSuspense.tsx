import React from 'react';
import {Text, View} from '../../components/UI';
import {shortenTFunctionKey} from '../../providers/i18n-labor';
import {getContainerStyles} from '../../containers';
import {getSharedStyles} from '../../helpers';
import {useBunnyKit} from '../../hooks/bunny-kit';
import {wait} from '../../utils';

const DemoLazy100 = React.lazy(async () => {
        const module = await import('../../components/DemoLazy/DemoLazy');
        await wait(100);
        return {default: module.DemoLazy};
    }
);

const DemoLazy2000 = React.lazy(async () => {
        const module = await import('../../components/DemoLazy/DemoLazy');
        await wait(2000);
        return {default: module.DemoLazy};
    }
);

export const DemoSuspenseScreen = () => {
    const {sizeLabor, themeLabor, theme, colors, wp, t, ms} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.DemoSuspense');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            {/*{isServerSide*/}
            {/*    ? <Text>SSR does not support React.lazy</Text> :*/}
            {/*    <>*/}
            {/*        <DemoLazy100 title={st(`lazyComponentTitle`)}/>*/}
            {/*        <DemoLazy2000 title={st(`lazyComponentTitle`)}/>*/}
            {/*    </>*/}
            {/*}*/}
            <Text>{st('noSupporting')}</Text>
        </View>
    );
};

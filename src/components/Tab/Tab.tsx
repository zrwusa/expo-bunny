import {Row} from '../../containers/Row';
import {Text, View} from '../UI';
import * as React from 'react';
import {shortenTFunctionKey} from '../../providers/i18n-labor';
import {getSharedStyles} from '../../helpers';
import {getStyles} from './styles';
import {useBunnyKit} from '../../hooks/bunny-kit';


export interface TabProps<ItemT> {
    items: ItemT[],
    value: ItemT,
    placeholder?: ItemT,
    onChange: (value: ItemT) => void
}

export const Tab = ({items, placeholder, value, onChange}: TabProps<any>) => {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'dictionary');
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const {} = sharedStyles;
    const styles = getStyles(sizeLabor, themeLabor);
    return <Row style={styles.tabs}>
        {
            items.map(item => {
                const activeIndicatorStyle = item === value ? styles.tabIndicatorActive : styles.tabIndicator;
                const activeTextStyle = item === value ? styles.tabTextActive : styles.tabText;
                return <View style={styles.tab}
                             key={item}>
                    <Text style={[styles.tabText, activeTextStyle]}
                          onPress={() => onChange(item)}>{st(item)}</Text>
                    <View style={[styles.tabIndicator, activeIndicatorStyle]}/>
                </View>;
            })
        }
    </Row>;
};

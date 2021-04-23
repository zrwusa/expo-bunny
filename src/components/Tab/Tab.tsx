import {Row} from "../../containers/Row";
import {Text, View} from "../UI";
import * as React from "react";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {getSharedStyles} from "../../helpers/shared-styles";
import {getStyles} from "./styles";


export interface TabProps<ItemT> {
    items: ItemT[],
    value: ItemT,
    placeholder?: ItemT,
    onChange: (value: ItemT) => void
}

export const Tab = ({items, placeholder, value, onChange}: TabProps<any>) => {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'dictionary');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const {} = sharedStyles;
    const styles = getStyles(sizeLabor, themeLabor)
    return <Row style={styles.tabs}>
        {
            items.map(item => {
                const activeIndicatorStyle = item === value ? styles.tabIndicatorActive : styles.tabIndicator;
                const activeTextStyle = item === value ? styles.tabTextActive : styles.tabText;
                return <View style={styles.tab}
                             key={item}>
                    <Text style={[styles.tabText, activeTextStyle]} onPress={() => onChange(item)}>{st(item)}</Text>
                    <View style={[styles.tabIndicator, activeIndicatorStyle]}/>
                </View>
            })
        }
    </Row>
}

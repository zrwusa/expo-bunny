import * as React from "react";
import {View} from "react-native";
import {useSizeLabor} from "../../../../providers/size-labor";
import {useThemeLabor} from "../../../../providers/theme-labor";
import {createStyles} from "./styles";
import {Text} from "../../../../components/UI"

export function SettingCard(props: { title: string, children: React.ReactNode }) {
    const {title, children} = props;
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor)
    return <View style={styles.settingCard}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.contentWrapper}>
            {children}
        </View>
    </View>
}

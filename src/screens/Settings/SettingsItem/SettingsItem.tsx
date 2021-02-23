import * as React from "react";
import {getStyles} from "./styles";
import {View, Text, SwitchP} from "../../../components/UI";
import {useSizeLabor} from "../../../providers/sizeLabor";
import {useThemeLabor} from "../../../providers/themeLabor";

export type SettingsItemProps = {
    label: string;
    value: boolean;
    onValueChange: ((value: boolean) => void) & Function;
};

export default function SettingsItem({label, value, onValueChange}: SettingsItemProps) {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor);
    return (
        <View style={styles.item}>
            <Text>{label}</Text>
            <SwitchP value={value} onValueChange={onValueChange}/>
        </View>
    );
}

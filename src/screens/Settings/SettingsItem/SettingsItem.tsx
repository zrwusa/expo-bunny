import * as React from "react";
import {getStyles} from "./styles";
import {View, Text, SwitchP} from "../../../components/base-ui";
import {useSizer} from "../../../styles/sizer";
import {useTheme} from "../../../styles/theme";

export type SettingsItemProps = {
    label: string;
    value: boolean;
    onValueChange: ((value: boolean) => void) & Function;
};

export default function SettingsItem({label, value, onValueChange}: SettingsItemProps) {
    const sizer = useSizer();
    const theme = useTheme();
    const styles = getStyles(sizer,theme);
    return (
        <View style={styles.item}>
            <Text>{label}</Text>
            <SwitchP value={value} onValueChange={onValueChange}/>
        </View>
    );
}

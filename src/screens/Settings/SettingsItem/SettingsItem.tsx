import * as React from "react";
import {getStyle} from "./styles";
import {View, Text, SwitchP} from "../../../components/base-ui";

export type SettingsItemProps = {
    label: string;
    value: boolean;
    onValueChange: ((value: boolean) => void) & Function;
};

export default function SettingsItem({label, value, onValueChange}: SettingsItemProps) {
    const styles = getStyle()
    return (
        <View style={styles.item}>
            <Text>{label}</Text>
            <SwitchP value={value} onValueChange={onValueChange}/>
        </View>
    );
}

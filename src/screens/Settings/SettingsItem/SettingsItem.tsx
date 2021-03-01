import * as React from "react";
import {createStyles} from "./styles";
import {SwitchP, Text, View} from "../../../components/UI";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";

export interface SettingsItemProps {
    label: string;
    value: boolean;
    onValueChange: ((value: boolean) => void) & Function;
}

export default function SettingsItem({label, value, onValueChange}: SettingsItemProps) {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor);
    return (
        <View style={styles.item}>
            <Text>{label}</Text>
            <SwitchP value={value} onValueChange={onValueChange}/>
        </View>
    );
}

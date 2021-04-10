import * as React from "react";
import {createStyles} from "./styles";
import {SwitchPaperProps, Text, View} from "../../../components/UI";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {PickerSelectProps} from "react-native-picker-select";

export interface SettingsItemProps {
    label: string;
    renderPicker?: () => (React.ReactElement<PickerSelectProps> | React.ReactElement<SwitchPaperProps> | null)
}

export default function SettingsItem({label, renderPicker}: SettingsItemProps) {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor);
    return (
        <View style={styles.item}>
            <Text>{label}</Text>
            {renderPicker ? renderPicker() : null}
        </View>
    );
}

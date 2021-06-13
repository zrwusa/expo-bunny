import * as React from "react";
import {getStyles} from "./styles";
import {SwitchPaperProps, Text, View} from "../../../components/UI";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {PickerSelectProps} from "react-native-picker-select";
import {Col} from "../../../containers";
import {getSharedStyles} from "../../../helpers";

export interface SettingsItemProps {
    label: string;
    renderPicker?: () => (React.ReactElement<PickerSelectProps> | React.ReactElement<SwitchPaperProps> | null)
}

export default function SettingsItem({label, renderPicker}: SettingsItemProps) {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor)
    return (
        <View style={styles.item}>
            <Col size={2}>
                <Text style={sharedStyles.label}>{label}</Text>
            </Col>
            <Col size={1}>
                {renderPicker ? renderPicker() : null}
            </Col>

        </View>
    );
}

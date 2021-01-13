import * as React from 'react';
import {View} from 'react-native';
import {Subheading, Switch} from 'react-native-paper';
import styles from "./styles";

type Props = {
    label: string;
    value: boolean;
    onValueChange: ((value: boolean) => void) & Function;
};

export default function SettingsItem({label, value, onValueChange}: Props) {
    return (
        <View style={styles.item}>
            <Subheading>{label}</Subheading>
            <Switch value={value} onValueChange={onValueChange}/>
        </View>
    );
}

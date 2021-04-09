import React from "react";
import {View} from "../../components/UI";
import {LinearGradientIcon} from "../../components/LinearGradientIcon";
import {useThemeLabor} from "../../providers/theme-labor";
import {ScrollView} from "react-native";
import {createStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";


export function PlaygroundScreen() {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor)

    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.container}>
                <LinearGradientIcon name="leaf" colors={['#fff', '#0f0']} size={40}/>
            </View>

        </ScrollView>
    )
}

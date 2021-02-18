import React from "react";
import {Text, View} from "../base-ui"
import {getStyles} from "./styles";
import {useTheme} from "../../styles/theme";
import {useSizer} from "../../styles/sizer";

interface Props {
    title: string
}

export const DemoLazy: React.FC<Props> = (props) => {
    const sizer = useSizer();
    const theme = useTheme()
    const styles = getStyles(sizer,theme);
    return (
        <View>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

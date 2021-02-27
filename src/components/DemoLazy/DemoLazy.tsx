import React from "react";
import {Text, View} from "../UI"
import {getStyles} from "./styles";
import {useThemeLabor} from "../../providers/themeLabor";
import {useSizeLabor} from "../../providers/sizeLabor";

interface Props {
    title: string
}

export const DemoLazy = (props: Props) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor);
    return (
        <View>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

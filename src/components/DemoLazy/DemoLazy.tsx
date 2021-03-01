import React from "react";
import {Text, View} from "../UI"
import {createStyles} from "./styles";
import {useThemeLabor} from "../../providers/theme-labor";
import {useSizeLabor} from "../../providers/size-labor";

interface Props {
    title: string
}

export const DemoLazy = (props: Props) => {
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor);
    return (
        <View>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

import React from "react";
import {Text, View} from "../UI"
import {getStyles} from "./styles";
import {useBunnyKit} from "../../hooks/bunny-kit";

interface Props {
    title: string
}

export const DemoLazy = (props: Props) => {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const styles = getStyles(sizeLabor, themeLabor);
    return (
        <View>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    )
}

import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../types";
import {getSharedStyles} from "../utils";

export const getContainerStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    const {ms, designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX;
    return StyleSheet.create({
        Card: {
            ...sharedStylesFlatten.card,
            margin: ms.sp.m,
            paddingHorizontal: ms.sp.m,
            paddingVertical: ms.sp.m,
        },
        CardTitle: {
            ...sharedStylesFlatten.title2,
            marginBottom: ms.sp.m,
        },
        InputCard: {
            marginTop: wp(20)
        },
        InputCardTitle: {
            ...sharedStylesFlatten.text2,
            marginBottom: wp(10)
        },
        Screen: {
            flex: 1,
        },
        FullFill: {
            flex: 1
        },
        Box: {
            padding: ms.sp.m
        }
    });
}

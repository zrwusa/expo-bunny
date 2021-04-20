import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../types";
import {getSharedStyles} from "../utils";

export const getContainerStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    const {ms, designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX;
    const {shadowAround, title, title2, card} = sharedStylesFlatten;
    const {theme} = themeLabor;
    return StyleSheet.create({
        Card: {
            ...shadowAround,
            ...card,
            marginVertical: ms.sp.m,
            paddingHorizontal: ms.sp.l,
        },
        CardInTitle: {
            ...title2,
            marginTop: ms.sp.m,
        },
        CardOutTitle: {
            ...title,
            marginVertical: ms.sp.m,
            fontWeight: 'bold',
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

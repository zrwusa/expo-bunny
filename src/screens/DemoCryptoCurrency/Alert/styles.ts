import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../types";
import {getSharedStyles} from "../../../helpers";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    return StyleSheet.create({
        container: {flex: 1, justifyContent: 'space-between', padding: ms.sp.m},
        text: {fontSize: ms.fs.l},
        box: {
            padding: ms.sp.m,
            justifyContent: 'space-between',
        },
        label: {fontSize: ms.fs.l},
        bottomBar: {}
    })
}

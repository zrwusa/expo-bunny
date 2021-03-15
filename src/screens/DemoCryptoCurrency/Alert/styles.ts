import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../types";
import {createSmartStyles} from "../../../utils";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {colors} = themeLabor.theme;
    const {smartStylesObj} = createSmartStyles(sizeLabor, themeLabor);
    const {row, between, vCenter} = smartStylesObj;
    const currentPrice = StyleSheet.create({
        text: {fontSize: ms.fs.l},
        box: {
            padding: ms.sp.m,
            ...row,
            ...between,
            ...vCenter
        }
    })
    const granularity = StyleSheet.create({
        label: {fontSize: ms.fs.l},

    });

    const reminder = StyleSheet.create({
        label: {fontSize: ms.fs.l},
    });


    return {currentPrice, granularity, reminder}
}

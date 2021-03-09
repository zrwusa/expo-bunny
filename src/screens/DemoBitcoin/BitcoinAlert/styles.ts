import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {colors} = themeLabor.theme;

    const currentPrice = StyleSheet.create({
        text: {fontSize: ms.fs.l},
        box: {
            padding: ms.sp.m,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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

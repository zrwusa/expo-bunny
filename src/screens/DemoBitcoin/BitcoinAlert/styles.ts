import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {colors} = themeLabor.theme;

    const pickerSelector = StyleSheet.create({
        inputIOS: {
            fontSize: ms.fs.l,
            paddingVertical: ms.sp.m,
            paddingHorizontal: ms.sp.m,
            borderWidth: ms.sp.xxs,
            borderColor: colors.border,
            borderRadius: ms.br.s,
            color: colors.text,
            paddingRight: ms.sp.xl// to ensure the text is never behind the icon
        },
        inputAndroid: {
            fontSize: ms.fs.l,
            paddingVertical: ms.sp.m,
            paddingHorizontal: ms.sp.m,
            borderWidth: ms.sp.s,
            borderColor: colors.border,
            borderRadius: ms.br.s,
            color: colors.text,
            paddingRight: ms.sp.xl// to ensure the text is never behind the icon
        }
    });
    const granularity = StyleSheet.create({
        label: {fontSize:ms.fs.l}
    });

    const reminder = StyleSheet.create({
        label: {fontSize:ms.fs.l},
    });


    return {pickerSelector,granularity,reminder}
}

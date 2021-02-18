import {StyleSheet} from "react-native";
import {pl} from "../../styles/utils";
import {Sizer, Theme} from "../../types/styles";
export const getStyles = (sizer: Sizer, theme: Theme) => {
    const {ms, responsive} = sizer;
    const {wp, hp} = responsive.iphoneX;
    return StyleSheet.create({
        logo: {
            width: wp(305),
            height: wp(159),
            marginBottom: ms.sp.l,
        },
        instructions: {
            color: '#888',
            fontSize: ms.fs.m,
            marginHorizontal: ms.sp.l,
            marginBottom: ms.sp.m,
        },
        button: {
            padding: ms.sp.l,
            borderRadius: ms.br.xs,
        },
        buttonText: {
            fontSize: ms.fs.l,
            color: pl.white,
        },
        thumbnail: {
            width: wp(300),
            height: wp(300),
            resizeMode: 'contain',
        },
    });

}

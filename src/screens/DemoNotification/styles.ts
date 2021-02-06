import {StyleSheet} from "react-native";
import {pl} from "../../styles/utils";
import {Measure, Responsive} from "../../types/styles";

const getStyles = (measure:Measure,responsive:Responsive)=>{
    const {wp, hp} = responsive.iphoneX;
    const ms = measure;
    return  StyleSheet.create({
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

export default getStyles;

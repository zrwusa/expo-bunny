import {StyleSheet} from "react-native";
import {useSizeLabor} from "../../providers/size-labor";
import {getSharedStyles} from "../../helpers";
import {SizeLabor, ThemeLabor} from "../../types";

export const getStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = useSizeLabor();
    const {wp} = designsBasedOn.iphoneX;
    const {sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor)
    const {shadow} = sharedStylesFlatten;
    const {theme} = themeLabor
    const {colors} = theme
    return StyleSheet.create({
        container: {
            margin: wp(6)
        },
        control: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        remainTime: {
            marginTop: ms.sp.s,
            fontSize: wp(9),
            color: colors.text,
            height: wp(9)
        },
        progress: {
            marginLeft: wp(5),
            width: wp(120),
            height: wp(30),
            justifyContent: 'flex-end'
        },
        playButton: {
            backgroundColor: colors.background,
            width: wp(36),
            height: wp(36),
            borderWidth: wp(1),
            borderColor: colors.divider,
            borderRadius: wp(18),
            justifyContent: 'center',
            alignItems: 'center'
        },
        playButtonIcon: {
            marginLeft: wp(2)
        }
    });
}

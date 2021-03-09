import {StyleSheet} from "react-native";
import {SizeLabor, ThemeLabor} from "../../types";

export const createStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, responsive} = sizeLabor;
    const {wp, hp} = responsive.iphoneX;
    const {colors} = themeLabor.theme;
    return StyleSheet.create({
        // wrapper: {
        //     position: 'absolute',
        //     bottom: 0,
        //     width: '100%',
        //     backgroundColor: 'red'
        // },
        // container: {
        //     elevation: 6,
        //     flexDirection: 'row',
        //     justifyContent: 'space-between',
        //     alignItems: 'center',
        //     margin: 8,
        //     borderRadius: 4,
        // },
        // content: {
        //     marginLeft: wp(16),
        //     marginVertical: 14,
        //     flexWrap: 'wrap',
        //     flex: 1,
        // },
        text: {
            maxWidth: wp(260),
            maxHeight: wp(200),
            overflow: 'scroll',
            flexShrink: 1,
            color: colors.white,
        },
        // button: {
        //     marginHorizontal: 8,
        //     marginVertical: 6,
        // },
    });
}

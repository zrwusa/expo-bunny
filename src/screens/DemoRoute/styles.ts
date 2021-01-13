import {StyleSheet} from "react-native";
import BunnyConstants from "../../common/constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: BunnyConstants.statusBarHeight,
    },
    wrap:{
        alignItems:'flex-start',
    },
    text: {
        color:'#FF0000',
        marginTop:10
    },
});
export default styles;

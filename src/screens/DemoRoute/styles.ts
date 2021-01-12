import {StyleSheet} from "react-native";
import BunnyConstants from "../../common/constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: BunnyConstants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    wrap:{
        alignItems:'flex-start',
    },
    text: {
        marginTop:10
    },
});
export default styles;

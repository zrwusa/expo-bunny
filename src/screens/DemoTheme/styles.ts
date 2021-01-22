import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    demoShadow:{
        width: 300,
        height: 50,
        borderRadius: 2,
        backgroundColor: "#fff",

        elevation: 22,
        justifyContent:"center",
        alignItems:"center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.2,
        shadowRadius: 14.78
    }
});
export default styles;

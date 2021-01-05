import {Dimensions, StyleSheet} from "react-native";
import {statusBarHeight} from "../../../common/constants";
const window = Dimensions.get("window");


export const screenStyles = StyleSheet.create({
    container: {
        justifyContent: "center",
        height:window.height,
    },
});

export const activityIndicatorStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})
export const switchStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})
export const flatListStyles = StyleSheet.create({
    container: {
        flex: 1,
        height:100,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
})


export const imageStyles = StyleSheet.create({
    container: {

    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    logo: {
        width: 66,
        height: 58,
    },
})

export const imageBackgroundStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    }
})


export const keyboardAvoidingViewStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
    },
    header: {
        fontSize: 36,
        marginBottom: 48
    },
    textInput: {
        height: 40,
        borderColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 36
    },
    btnContainer: {
        backgroundColor: "white",
    }
})
export const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})
export const pressableStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    text: {
        fontSize: 16
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6
    },
    logBox: {
        padding: 20,
        margin: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f0f0f0',
        backgroundColor: '#f9f9f9'
    }
})
export const safeAreaViewStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
export const sectionListStyles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: statusBarHeight,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
})
export const statusBarStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: statusBarHeight,
        backgroundColor: '#ECF0F1',
        padding: 8
    },
    buttonContainer:{
        padding: 10
    },
    textStyle:{
        textAlign: 'center'
    }
})
// export const xxxStyles = StyleSheet.create({
//
// })
// export const xxxStyles = StyleSheet.create({
//
// })
// export const xxxStyles = StyleSheet.create({
//
// })
// export const xxxStyles = StyleSheet.create({
//
// })
// export const xxxStyles = StyleSheet.create({
//
// })
// export const xxxStyles = StyleSheet.create({
//
// })
// export const xxxStyles = StyleSheet.create({
//
// })
// export const xxxStyles = StyleSheet.create({
//
// })
// export const xxxStyles = StyleSheet.create({
//
// })

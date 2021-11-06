import {StyleSheet} from 'react-native';
import BunnyConstants from '../../../constants/constants';
import {SizeLabor, ThemeLabor} from '../../../types/styles';


export const makeStyles = (sizeLabor: SizeLabor, themeLabor: ThemeLabor) => {
    const {ms, designsBasedOn} = sizeLabor;
    const {wp, hp} = designsBasedOn.iphoneX;

    const activityIndicatorStyles = StyleSheet.create({
        horizontal: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10
        }
    });

    const switchStyles = StyleSheet.create({});

    const imageStyles = StyleSheet.create({
        tinyLogo: {
            width: 50,
            height: 50,
        },
        logo: {
            width: 66,
            height: 58,
        },
    });

    const imageBackgroundStyles = StyleSheet.create({
        image: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center'
        },
        text: {
            color: 'white',
            fontSize: 42,
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: '#000000a0'
        }
    });


// const keyboardAvoidingViewStyles = StyleSheet.create({
//     inner: {
//         padding: 24,
//         flex: 1,
//         justifyContent: "space-around"
//     },
//     header: {
//         fontSize: 36,
//         marginBottom: 48
//     },
//     textInput: {
//         height: 40,
//         borderColor: "#000000",
//         borderBottomWidth: 1,
//         marginBottom: 36
//     },
//     btnContainer: {
//         backgroundColor: "white",
//     }
// })

    const modalStyles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22
        },
        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        },
        openButton: {
            backgroundColor: '#F194FF',
            borderRadius: 20,
            padding: 10,
            elevation: 2
        },
        textStyle: {
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center'
        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center'
        }
    });

    const pressableStyles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
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
    });

    const sectionListStyles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: BunnyConstants.statusBarHeight,
            marginHorizontal: 16
        },
        item: {
            backgroundColor: '#f9c2ff',
            padding: 20,
            marginVertical: 8
        },
        header: {
            fontSize: 32,
            backgroundColor: '#fff'
        },
        title: {
            fontSize: 24
        }
    });

    const statusBarStyles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingTop: BunnyConstants.statusBarHeight,
            backgroundColor: '#ECF0F1',
            padding: 8
        },
        buttonContainer: {
            padding: 10
        },
        textStyle: {
            textAlign: 'center'
        }
    });

    const touchableHighlightStyles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 10
        },
        button: {
            alignItems: 'center',
            backgroundColor: '#DDDDDD',
            padding: 10
        },
        countContainer: {
            alignItems: 'center',
            padding: 10
        },
        countText: {
            color: '#FF00FF'
        }
    });

    const touchableOpacityStyles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 10
        },
        button: {
            alignItems: 'center',
            backgroundColor: '#DDDDDD',
            padding: 10
        },
        countContainer: {
            alignItems: 'center',
            padding: 10
        }
    });

    const touchableWithoutFeedbackStyles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 10
        },
        button: {
            alignItems: 'center',
            backgroundColor: '#DDDDDD',
            padding: 10
        },
        countContainer: {
            alignItems: 'center',
            padding: 10
        },
        countText: {
            color: '#FF00FF'
        }
    });

    const virtualizedListStyles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: BunnyConstants.statusBarHeight,
        },
        item: {
            backgroundColor: '#f9c2ff',
            height: 150,
            justifyContent: 'center',
            marginVertical: 8,
            marginHorizontal: 16,
            padding: 20,
        },
        title: {
            fontSize: 32,
        },
    });
    const home = StyleSheet.create({
        container: {
            padding: ms.sp.m
        },
    });
    return {
        home,
        activityIndicatorStyles,
        switchStyles,
        imageStyles,
        imageBackgroundStyles,
        modalStyles,
        pressableStyles,
        sectionListStyles,
        statusBarStyles,
        touchableHighlightStyles,
        touchableOpacityStyles,
        touchableWithoutFeedbackStyles,
        virtualizedListStyles,
    };
};

import * as React from "react";
import {View} from "../../components/UI";
import {getContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {RouteProp} from "@react-navigation/native";
import {RootStackParam} from "../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {AuthTopTabStack} from "../../navigation/stacks";
import {Image, SafeAreaView} from "react-native";
import {SignInScreen} from "./SignIn";
import {SignUpScreen} from "./SignUp";
import {getStyles} from "./styles";

type ProfileRouteProp = RouteProp<RootStackParam, 'Auth'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Auth'>;

export interface Auth1Props {
    route: ProfileRouteProp;
    navigation: ProfileNavigationProp;
}

export const Auth1Screen = ({route, navigation}: Auth1Props) => {
    let isSignInScreen = true;
    if (route) {
        if (route.name && route.params && route.params.screen) {
            //todo tab change without change route.params
            isSignInScreen = (route.name === 'Auth' && route.params.screen === 'SignIn')
        }
    }
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const {theme} = themeLabor;
    const {colors} = theme;
    const {designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX;
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={[containerStyles.Screen]}>
                <View style={styles.header}>
                    <Image style={{width: wp(300), height: wp(30)}} source={theme.dark
                        ? require('../../assets/images/dadu-coach-dark.png')
                        : require('../../assets/images/dadu-coach-light.png')
                    }/>
                </View>
                <View style={[styles.content]}>
                    <AuthTopTabStack.Navigator style={{borderRadius: wp(10)}}
                                               tabBarOptions={{
                                                   style: {
                                                       backgroundColor: colors.background
                                                   },
                                                   activeTintColor: colors.secondary,
                                                   inactiveTintColor: colors.text,
                                                   indicatorStyle: {
                                                       backgroundColor: colors.secondary,
                                                       width: wp(80),
                                                       marginLeft: wp(45),
                                                   },
                                               }}
                    >
                        <AuthTopTabStack.Screen name="SignIn" component={SignInScreen}/>
                        <AuthTopTabStack.Screen name="SignUp" component={SignUpScreen}/>
                    </AuthTopTabStack.Navigator>
                </View>
                <View style={styles.footer}>
                    {/*<View style={styles.footerBtnWrapper}>*/}
                    {/*    <LinearGradientButton style={[styles.footerBtn, {width: 200}]} onPress={() => {*/}
                    {/*        navigation.navigate('DemoHealth',{screen:'HealthHome'})*/}
                    {/*        // navigation.navigate('Home')*/}
                    {/*    }}>Sign In</LinearGradientButton>*/}
                    {/*</View>*/}
                </View>
            </View>
        </SafeAreaView>
    );
};

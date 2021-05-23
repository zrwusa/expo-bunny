import * as React from "react";
import {View} from "../../components/UI";
import {getContainerStyles} from "../../containers";
import {RouteProp} from "@react-navigation/native";
import {RootStackParam} from "../../types";
import {StackNavigationProp} from "@react-navigation/stack";
import {AuthTopTabStack} from "../../navigation/stacks";
import {Image, SafeAreaView} from "react-native";
import {getStyles} from "./styles";
import {LoginScreen} from "./Login";
import {SignUpScreen} from "./SignUp";
import {useTranslation} from "react-i18next";
import {useBunnyKit} from "../../hooks/bunny-kit";

type ProfileRouteProp = RouteProp<RootStackParam, 'Auth'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Auth'>;

export interface Auth1Props {
    route: ProfileRouteProp;
    navigation: ProfileNavigationProp;
}

export const AuthScreen = ({route, navigation}: Auth1Props) => {
    let isLoginScreen = true;
    if (route) {
        if (route.name && route.params && route.params.screen) {
            //todo tab change without change route.params
            isLoginScreen = (route.name === 'Auth' && route.params.screen === 'Login')
        }
    }
    const {sizeLabor, themeLabor, colors, wp, theme} = useBunnyKit();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const {t} = useTranslation()
    return (
        <SafeAreaView style={[containerStyles.Screen]}>
            <View style={[containerStyles.Screen]}>
                <View style={styles.header}>
                    <Image style={{width: wp(300), height: wp(30)}} source={theme.dark
                        ? require('../../assets/images/dadu-coach-dark.png')
                        : require('../../assets/images/dadu-coach-light.png')
                    }/>
                </View>
                <View style={[styles.content]}>
                    <AuthTopTabStack.Navigator style={{borderRadius: wp(10)}}
                                               screenOptions={({route}) => {
                                                   return {
                                                       title: t(`screens.${route.name}.title`),
                                                   }
                                               }}
                                               tabBarOptions={{
                                                   labelStyle: {
                                                       fontSize: wp(15)
                                                   },
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
                        <AuthTopTabStack.Screen name="Login" component={LoginScreen}/>
                        <AuthTopTabStack.Screen name="SignUp" component={SignUpScreen}/>
                    </AuthTopTabStack.Navigator>
                </View>
                <View style={styles.footer}>
                </View>
            </View>
        </SafeAreaView>
    );
};

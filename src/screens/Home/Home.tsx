import * as React from "react";
import {ScrollView, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {signOutAndRemove} from "../../stores/auth/actions";
import {RootStackParam} from "../../types/stacks";
import {ButtonTO, TextBtn, Text} from "../../components/base-ui";
import containerStyle from "../../containers";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../i18n/short-t";

type HomeRouteProp = RouteProp<RootStackParam, 'Home'>;
type HomeNavigationProp = StackNavigationProp<RootStackParam, 'Home'>;
export type HomeScreenProps = { route: HomeRouteProp; navigation: HomeNavigationProp; };

function HomeScreen({navigation}: HomeScreenProps) {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.Home';
    const st = stFactory(t, i18nPrefix);
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <View style={containerStyle.screen}>
                <View style={containerStyle.card}>
                    <Text>{st(`navAndRoute`)}</Text>
                    <ButtonTO onPress={() => navigation.navigate('Profile', {id: '002'})}>
                        <TextBtn>{st(`profile`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}>
                        <TextBtn>{st(`route`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoTab')}>
                        <TextBtn>{st(`tab`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoDrawer')}>
                        <TextBtn>{st(`drawer`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoNested')}>
                        <TextBtn>{st(`nestedNavigation`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoNested',
                        {
                            screen: 'NestedSettings',
                            params: {item: "001"},
                        })}><TextBtn>{st(`passParamsFromRootToLeaf`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoBitcoin',
                        {
                            screen: 'BitcoinAlert',
                            params: {isPush: true},
                        })}><TextBtn>{st(`passParamsFromRootToLeafTab`)}</TextBtn></ButtonTO>
                </View>
                <View style={containerStyle.card}>
                    <Text>{st(`redux`)}</Text>
                    <ButtonTO onPress={() => navigation.navigate('DemoFCReduxHook')}>
                        <TextBtn>{st(`FCReduxHook`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoThunkCC')}>
                        <TextBtn>{st(`thunkCC`)}</TextBtn></ButtonTO>
                </View>
                <View style={containerStyle.card}>
                    <Text>{st(`nativeCapabilities`)}</Text>
                    <ButtonTO onPress={() => navigation.navigate('DemoMap')}>
                        <TextBtn>{st(`map`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoShare')}>
                        <TextBtn>{st(`share`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoNotification')}>
                        <TextBtn>{st(`notification`)}</TextBtn></ButtonTO>
                </View>
                <View style={containerStyle.card}>
                    <Text>{st(`componentsAndThemes`)}</Text>
                    <ButtonTO onPress={() => navigation.navigate('DemoThirdPart')}>
                        <TextBtn>{st(`thirdPart`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoCollection')}>
                        <TextBtn>{st(`componentCollection`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoRNComponents')}>
                        <TextBtn>{st(`RNAllInOne`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoTheme')}>
                        <TextBtn>{st(`demoTheme`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoSuspense')}>
                        <TextBtn>{st(`demoSuspense`)}</TextBtn></ButtonTO>
                </View>
                <View style={containerStyle.card}>
                    <Text>{st(`others`)}</Text>
                    <ButtonTO onPress={() => navigation.navigate('DemoBitcoin')}>
                        <TextBtn>{st(`bitcoin`)}</TextBtn></ButtonTO>
                </View>
                <View style={containerStyle.card}>
                    <Text>{st(`system`)}</Text>
                    <ButtonTO onPress={() => navigation.navigate('Settings')}>
                        <TextBtn>{st(`settings`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => dispatch(signOutAndRemove())}>
                        <TextBtn>{st(`signOut`)}</TextBtn></ButtonTO>
                </View>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

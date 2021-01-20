import * as React from "react";
import {ScrollView, Switch, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {signOutAndRemove} from "../../stores/auth/actions";
import {RootStackParam} from "../../types/stacks";
import styles from "./styles";
import {ButtonTO, TextBtn, Text} from "../../components/base-ui";
import containerStyle from "../../containers/box";
import {useTranslation} from "react-i18next";
import en from "../../i18n/en.json"

type HomeRouteProp = RouteProp<RootStackParam, 'Home'>;
type HomeNavigationProp = StackNavigationProp<RootStackParam, 'Home'>;
export type HomeScreenProps = { route: HomeRouteProp; navigation: HomeNavigationProp; };

function HomeScreen({navigation}: HomeScreenProps) {
    const {t} = useTranslation()
    const i18nPrefix = 'screens.Home'
    const dispatch = useDispatch()

    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={containerStyle.box}>
                    <Text>{t(`${i18nPrefix}.labels.navAndRoute`)}</Text>
                    <ButtonTO onPress={() => navigation.navigate('Profile', {id: '002'})}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.profile`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}>
                        <TextBtn>Route</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoTab')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.tab`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoNested')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.nestedNavigation`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoBitcoin',
                        {
                            screen: 'BitcoinAlert',
                            params: {isPush: true},
                        })}><TextBtn>{t(`${i18nPrefix}.buttons.passParamsFromRootToLeaf`)}</TextBtn></ButtonTO>
                </View>

                <View style={containerStyle.box}>
                    <Text>{t(`${i18nPrefix}.labels.redux`)}</Text>
                    <ButtonTO onPress={() => navigation.navigate('DemoFCReduxHook')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.FCReduxHook`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoThunkCC')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.thunkCC`)}</TextBtn></ButtonTO>
                </View>

                <View style={containerStyle.box}>
                    <Text>{t(`${i18nPrefix}.labels.nativeCapabilities`)}</Text>
                    <ButtonTO onPress={() => navigation.navigate('DemoMap')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.map`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoShare')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.share`)}</TextBtn></ButtonTO>
                </View>

                <View style={containerStyle.box}>
                    <Text>{t(`${i18nPrefix}.labels.componentsAndThemes`)}</Text>
                    <ButtonTO onPress={() => navigation.navigate('DemoThirdPart')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.thirdPart`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoCollection')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.componentCollection`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoRNComponents')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.RNAllInOne`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoTheme')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.demoTheme`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoSuspense')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.demoSuspense`)}</TextBtn></ButtonTO>
                </View>

                <View style={containerStyle.box}>
                    <Text>{t(`${i18nPrefix}.labels.others`)}</Text>
                    <ButtonTO onPress={() => navigation.navigate('DemoBitcoin')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.bitcoin`)}</TextBtn></ButtonTO>
                </View>

                <View style={containerStyle.box}>
                    <Text>{t(`${i18nPrefix}.labels.system`)}</Text>
                    <ButtonTO onPress={() => navigation.navigate('Settings')}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.settings`)}</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => dispatch(signOutAndRemove())}>
                        <TextBtn>{t(`${i18nPrefix}.buttons.signOut`)}</TextBtn></ButtonTO>
                </View>

            </View>
        </ScrollView>
    );
}

export default HomeScreen;

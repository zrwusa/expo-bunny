import * as React from "react";
import {ScrollView, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {signOutAndRemove} from "../../stores/auth/actions";
import {RootStackParam} from "../../types/stacks";
import styles from "./styles";
import {ButtonTO, TextBtn, Text} from "../../components/base-ui";
import containerStyle from "../../containers/box";

type HomeRouteProp = RouteProp<RootStackParam, 'Home'>;
type HomeNavigationProp = StackNavigationProp<RootStackParam, 'Home'>;
export type HomeScreenProps = { route: HomeRouteProp; navigation: HomeNavigationProp; };

function HomeScreen({navigation}: HomeScreenProps) {
    const dispatch = useDispatch()
    return (
        <ScrollView>
            <View style={styles.screen}>
                <View style={containerStyle.box}>
                    <Text>Nav & Route</Text>
                    <ButtonTO onPress={() => navigation.navigate('Profile', {id: '002'})}>
                        <TextBtn>Profile</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}>
                        <TextBtn>Route</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoTab')}>
                        <TextBtn>Tab</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoNested')}>
                        <TextBtn>Nested Navigation</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoBitcoin',
                        {
                            screen: 'BitcoinAlert',
                            params: {isPush: true},
                        })}><TextBtn>Pass Params From Root To Leaf</TextBtn></ButtonTO>
                </View>

                <View style={containerStyle.box}>
                    <Text>Redux</Text>
                    <ButtonTO onPress={() => navigation.navigate('DemoFCReduxHook')}>
                        <TextBtn>FC Redux Hook</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoThunkCC')}>
                        <TextBtn>Thunk CC</TextBtn></ButtonTO>
                </View>

                <View style={containerStyle.box}>
                    <Text>Native capabilities</Text>
                    <ButtonTO onPress={() => navigation.navigate('DemoMap')}>
                        <TextBtn>Map</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoShare')}>
                        <TextBtn>Share</TextBtn></ButtonTO>
                </View>

                <View style={containerStyle.box}>
                    <Text>Components & Themes</Text>
                    <ButtonTO onPress={() => navigation.navigate('DemoThirdPart')}>
                        <TextBtn>Third Part</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoCollection')}>
                        <TextBtn>Component Collection</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoRNComponents')}>
                        <TextBtn>RN All In One</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoTheme')}>
                        <TextBtn>DemoTheme</TextBtn></ButtonTO>
                </View>

                <View style={containerStyle.box}>
                    <Text>Others</Text>
                    <ButtonTO onPress={() => navigation.navigate('DemoBitcoin')}>
                        <TextBtn>Bitcoin</TextBtn></ButtonTO>
                </View>

                <View style={containerStyle.box}>
                    <Text>System</Text>
                    <ButtonTO onPress={() => navigation.navigate('Settings')}>
                        <TextBtn>Settings</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => dispatch(signOutAndRemove())}>
                        <TextBtn>Sign out</TextBtn></ButtonTO>
                </View>

            </View>
        </ScrollView>
    );
}

export default HomeScreen;

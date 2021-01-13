import * as React from "react";
import {ScrollView,View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {signOutAndRemove} from "../../stores/auth/actions";
import {RootStackParam} from "../../types/stacks";
import styles from "./styles";
import {ButtonTO, TextBtn} from "../../components/base-ui";

type HomeRouteProp = RouteProp<RootStackParam, 'Home'>;
type HomeNavigationProp = StackNavigationProp<RootStackParam, 'Home'>;
export type HomeScreenProps = { route: HomeRouteProp; navigation: HomeNavigationProp; };

function HomeScreen({navigation}: HomeScreenProps) {
    const dispatch = useDispatch()
    return (
        <ScrollView>
            <View style={styles.container}>
                <ButtonTO onPress={() => navigation.navigate('Profile', {id: '002'})}>
                    <TextBtn>Profile</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoFCReduxHook')}>
                    <TextBtn>Demo FC Redux Hook</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoCollection')}>
                    <TextBtn>Demo Collection</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}>
                    <TextBtn>Demo Route</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoThirdPart')}>
                    <TextBtn>Demo Third Part</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoThunkCC')}>
                    <TextBtn>Demo Thunk CC</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoMap')}>
                    <TextBtn>Demo Map</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('TestMap')}>
                    <TextBtn>Test Map</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoTab')}>
                    <TextBtn>Demo Tab</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoNested')}>
                    <TextBtn>Demo Nested Navigation</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoRNComponents')}>
                    <TextBtn>Demo RN Components</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoShare')}>
                    <TextBtn>Demo Share</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoTheme')}>
                    <TextBtn>DemoTheme</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoBitcoin')}>
                    <TextBtn>Demo Bitcoin</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('DemoBitcoin',
                    {
                        screen: 'BitcoinAlert',
                        params: {isPush: true},
                    })}><TextBtn>Demo Pass Params From Root To Leaf</TextBtn></ButtonTO>
                <ButtonTO onPress={() => navigation.navigate('Settings')}>
                    <TextBtn>Settings</TextBtn></ButtonTO>
                <ButtonTO onPress={() => dispatch(signOutAndRemove())}>
                    <TextBtn>Sign out</TextBtn></ButtonTO>
            </View>

        </ScrollView>
    );
}

export default HomeScreen;

import * as React from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {signOutAndRemove} from "../../stores/auth/actions";
import {RootStackParam} from "../../types/stacks";
import styles from "./styles";
import {DemoTOButtonThemedRN, DemoTextThemedRN} from "../../components/base-ui";

type HomeRouteProp = RouteProp<RootStackParam, 'Home'>;
type HomeNavigationProp = StackNavigationProp<RootStackParam, 'Home'>;
export type HomeScreenProps = { route: HomeRouteProp; navigation: HomeNavigationProp; };


function HomeScreen({navigation}: HomeScreenProps) {
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('Profile', {id: '002'})}>
                <DemoTextThemedRN>Profile</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('DemoFCReduxHook')}>
                <DemoTextThemedRN>Demo FC Redux Hook</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('DemoCollection')}>
                <DemoTextThemedRN>Demo Collection</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}>
                <DemoTextThemedRN>Demo Route</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('DemoThirdPart')}>
                <DemoTextThemedRN>Demo Third Part</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('DemoThunkCC')}>
                <DemoTextThemedRN>Demo Thunk CC</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('DemoMap')}>
                <DemoTextThemedRN>Demo Map</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('TestMap')}>
                <DemoTextThemedRN>Test Map</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('DemoTab')}>
                <DemoTextThemedRN>Demo Tab</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('DemoNested')}>
                <DemoTextThemedRN>Demo Nested Navigation</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('DemoRNComponents')}>
                <DemoTextThemedRN>Demo RN Components</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('DemoShare')}>
                <DemoTextThemedRN>Demo Share</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('DemoBitcoin')}>
                <DemoTextThemedRN>Demo Bitcoin</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('DemoBitcoin',
                {
                    screen: 'BitcoinAlert',
                    params: {isPush: true},
                })}><DemoTextThemedRN>Demo Pass Params From Root To Leaf</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => navigation.navigate('Settings')}>
                <DemoTextThemedRN>Settings</DemoTextThemedRN></DemoTOButtonThemedRN>
            <DemoTOButtonThemedRN onPress={() => dispatch(signOutAndRemove())}>
                <DemoTextThemedRN>Sign out</DemoTextThemedRN></DemoTOButtonThemedRN>
        </View>
    );
}

export default HomeScreen;

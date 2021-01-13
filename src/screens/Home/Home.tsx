import * as React from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {signOutAndRemove} from "../../stores/auth/actions";
import {RootStackParam} from "../../types/stacks";
import styles from "./styles";
import {ButtonTO, Text} from "../../components/base-ui";

type HomeRouteProp = RouteProp<RootStackParam, 'Home'>;
type HomeNavigationProp = StackNavigationProp<RootStackParam, 'Home'>;
export type HomeScreenProps = { route: HomeRouteProp; navigation: HomeNavigationProp; };


function HomeScreen({navigation}: HomeScreenProps) {
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <ButtonTO onPress={() => navigation.navigate('Profile', {id: '002'})}>
                <Text>Profile</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoFCReduxHook')}>
                <Text>Demo FC Redux Hook</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoCollection')}>
                <Text>Demo Collection</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}>
                <Text>Demo Route</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoThirdPart')}>
                <Text>Demo Third Part</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoThunkCC')}>
                <Text>Demo Thunk CC</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoMap')}>
                <Text>Demo Map</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('TestMap')}>
                <Text>Test Map</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoTab')}>
                <Text>Demo Tab</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoNested')}>
                <Text>Demo Nested Navigation</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoRNComponents')}>
                <Text>Demo RN Components</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoShare')}>
                <Text>Demo Share</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoTheme')}>
                <Text>DemoTheme</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoBitcoin')}>
                <Text>Demo Bitcoin</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('DemoBitcoin',
                {
                    screen: 'BitcoinAlert',
                    params: {isPush: true},
                })}><Text>Demo Pass Params From Root To Leaf</Text></ButtonTO>
            <ButtonTO onPress={() => navigation.navigate('Settings')}>
                <Text>Settings</Text></ButtonTO>
            <ButtonTO onPress={() => dispatch(signOutAndRemove())}>
                <Text>Sign out</Text></ButtonTO>
        </View>
    );
}

export default HomeScreen;

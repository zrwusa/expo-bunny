import * as React from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {signOutAndRemove} from "../../stores/auth/actions";
import {RootStackParam} from "../../types/stacks";
import styles from "./styles";
import {TOButton, Text} from "../../components/styled-bunny-ui";

type HomeRouteProp = RouteProp<RootStackParam, 'Home'>;
type HomeNavigationProp = StackNavigationProp<RootStackParam, 'Home'>;
export type HomeScreenProps = { route: HomeRouteProp; navigation: HomeNavigationProp; };



function HomeScreen({navigation}: HomeScreenProps) {
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <TOButton onPress={() => navigation.navigate('Profile', {id: '002'})}>
                <Text>Profile</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('DemoFCReduxHook')}>
                <Text>Demo FC Redux Hook</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('DemoCollection')}>
                <Text>Demo Collection</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}>
                <Text>Demo Route</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('DemoThirdPart')}>
                <Text>Demo Third Part</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('DemoThunkCC')}>
                <Text>Demo Thunk CC</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('DemoMap')}>
                <Text>Demo Map</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('TestMap')}>
                <Text>Test Map</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('DemoTab')}>
                <Text>Demo Tab</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('DemoNested')}>
                <Text>Demo Nested Navigation</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('DemoRNComponents')}>
                <Text>Demo RN Components</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('DemoShare')}>
                <Text>Demo Share</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('DemoBitcoin')}>
                <Text>Demo Bitcoin</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('DemoBitcoin',
                {
                    screen: 'BitcoinAlert',
                    params: {isPush: true},
                })}><Text>Demo Pass Params From Root To Leaf</Text></TOButton>
            <TOButton onPress={() => navigation.navigate('Settings')}>
                <Text>Settings</Text></TOButton>
            <TOButton onPress={() => dispatch(signOutAndRemove())}>
                <Text>Sign out</Text></TOButton>
        </View>
    );
}

export default HomeScreen;

import * as React from "react";
import {View, Text, Button} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {signOutAndRemove} from "../../stores/auth/actions";
import {RootStackParam} from "../../types/stacks";

type HomeRouteProp = RouteProp<RootStackParam, 'Home'>;
type HomeNavigationProp = StackNavigationProp<RootStackParam, 'Home'>;

type Props = { route: HomeRouteProp; navigation: HomeNavigationProp; };

function HomeScreen({navigation}: Props) {
    const dispatch = useDispatch()
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            <Button title="Profile" onPress={() => navigation.navigate('Profile', {id: '002'})}/>
            <Button title="Demo FC Redux Hook" onPress={() => navigation.navigate('DemoFCReduxHook')}/>
            <Button title="Demo Collection" onPress={() => navigation.navigate('DemoCollection')}/>
            <Button title="Demo Route" onPress={() => navigation.navigate('DemoRoute', {id: '1'})}/>
            <Button title="Demo Third Part" onPress={() => navigation.navigate('DemoThirdPart')}/>
            <Button title="Demo Thunk CC" onPress={() => navigation.navigate('DemoThunkCC')}/>
            <Button title="Demo Map" onPress={() => navigation.navigate('DemoMap')}/>
            <Button title="Test Map" onPress={() => navigation.navigate('TestMap')}/>
            <Button title="Demo Tab" onPress={() => navigation.navigate('DemoTab')}/>
            <Button onPress={()=>dispatch(signOutAndRemove())} title="Sign out"/>
        </View>
    );
}

export default HomeScreen;

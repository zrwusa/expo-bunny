import * as React from "react";
import {View, Text, Button} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {signOutAndRemove} from "../../stores/auth/actions";
import {RootStackParamList} from "../../types/stacks";

type HomeRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = { route: HomeRouteProp; navigation: HomeNavigationProp; };

function HomeScreen({navigation}: Props) {
    const dispatch = useDispatch()

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            <Button title="Go to Profile" onPress={() => navigation.navigate('Profile', {id: '002'})}/>
            <Button title="Go to DemoFCReduxHook" onPress={() => navigation.navigate('DemoFCReduxHook')}/>
            <Button title="Go to DemoHome" onPress={() => navigation.navigate('DemoHome')}/>
            <Button title="Go to DemoRoute" onPress={() => navigation.navigate('DemoRoute', {id: '1'})}/>
            <Button title="Go to DemoThirdPart" onPress={() => navigation.navigate('DemoThirdPart')}/>
            <Button title="Go to DemoThunkCC" onPress={() => navigation.navigate('DemoThunkCC')}/>
            <Button onPress={() => {
                dispatch(signOutAndRemove())
            }} title="Sign out"/>
        </View>
    );
}

export default HomeScreen;

import * as React from 'react';
import {View, Text, Button} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import RootStackParamList from "../../stacks/Root";

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Home'
    >;

type HomeProps = {
    route: HomeScreenRouteProp;
    navigation: HomeScreenNavigationProp;
};

function Home({ route, navigation }: HomeProps) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('Profile',{id:'002'})}
            />
        </View>
    );
}

export default Home;

import * as React from "react";
import {View, Text, Button} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types/stacks";

type ProfileRouteProp = RouteProp<RootStackParam, 'Profile'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'Profile'>;

type Props = { route: ProfileRouteProp; navigation: ProfileNavigationProp; };

function ProfileScreen({route, navigation}: Props) {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Profile Screen id:{route.params.id}</Text>
            <Button
                title="Go to HomeScreen"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}

// class ProfileScreen extends React.Component<Props> {
//     render() {
//         // ...
//     }
// }
export default ProfileScreen;

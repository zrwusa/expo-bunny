import * as React from "react";
import {View, Text, Button} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import RootStackParamList from "../../stacks/Root";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

type ProfileProps = {
    route: ProfileScreenRouteProp;
    navigation: ProfileScreenNavigationProp;
};
function Profile({ route, navigation }: ProfileProps) {
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen id:{route.params.id}</Text>
            <Button
                title="Go to Home"
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
export default Profile;

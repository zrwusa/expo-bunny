import React, {Component} from 'react';
import {View,Text} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../types/stacks";

type ProfileRouteProp = RouteProp<RootStackParamList, 'DemoRouteScreen'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'DemoRouteScreen'>;

type Props = { route: ProfileRouteProp; navigation: ProfileNavigationProp; };

class DemoRouteScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        return (<View>
            <Text>Demo Route Page id = {this.props.route.params.id}</Text>
        </View>);
    }
}

export default DemoRouteScreen;

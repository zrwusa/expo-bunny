import React, {Component} from 'react';
import {View, Text} from "../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types/stacks";
import {BoxShadow} from "react-native-shadow";
import styles from "./styles";

type ProfileRouteProp = RouteProp<RootStackParam, 'DemoRoute'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'DemoRoute'>;

type Props = { route: ProfileRouteProp; navigation: ProfileNavigationProp; };
// const shadowOpt = {
//     width: 160,
//     height: 40,
//     color: "#000",
//     border: 20,
//     radius: 10,
//     opacity: 0.2,
//     x: 0,
//     y: 3,
//     style: {marginVertical: 5}
// }

class DemoRouteScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        const {id, isHuman, sort} = this.props.route.params;
        return (<View style={styles.container}>
            {/*<BoxShadow setting={shadowOpt}>*/}
            <View style={styles.wrap}>
                <Text>param id = {id}</Text>
                <Text>typeof id:{typeof id}</Text>
                <Text>param isHuman = {isHuman.toString()}</Text>
                <Text>typeof id:{typeof isHuman}</Text>
                <Text>param sort = {sort}</Text>
                <Text>typeof id:{typeof sort}</Text>
            </View>

            {/*</BoxShadow>*/}
        </View>);
    }
}

export default DemoRouteScreen;

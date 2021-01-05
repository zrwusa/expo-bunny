import React, {Component} from 'react';
import {View, Text} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types/stacks";

type ProfileRouteProp = RouteProp<RootStackParam, 'DemoRoute'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'DemoRoute'>;

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
// import {ComponentClass, FunctionComponent} from "react";
// import {RootStack} from "../../stacks/Root";
// import {DemoNestedStack} from "../../stacks/DemoNested";
// import {DemoTabStack} from "../../stacks/DemoTab";
// import {DemoTabRNComponentsStack} from "../../stacks/DemoTabRNComponents";
// import {SignInScreen} from "../Auth";
// import HomeScreen from "../Home";
// import ProfileScreen from "../Profile";
// import DemoFCReduxHookScreen from "../DemoFCReduxHook";
// import DemoCollectionScreen from "../DemoHome";
// import DemoThirdPartScreen from "../DemoThirdPart";
// import DemoThunkCCScreen from "../DemoThunkCC";
// import DemoMapScreen from "../DemoMap/DemoMap";
// import TestMapScreen from "../TestMap";
// import TabHomeScreen from "../DemoTab/TabHome";
// import TabSettingsScreen from "../DemoTab/TabSettings";
// import NestedHomeScreen from "../DemoNested/NestedHome";
// import NestedSettingsScreen from "../DemoNested/NestedSettings";
// import TabRNComponentsHomeScreen from "../DemoRNComponents/TabRNComponentsHome";
// import TabRNComponentsSectionListScreen from "../DemoRNComponents/SectionList/SectionList";
//
//
// type Screen = {
//     component?: ComponentClass<any, any> | FunctionComponent<any> | undefined;
//     path?: string;
//     name: string;
//     parse?: Object;
//     screens?: Screen[];
//     initialParams?: Object;
//     stack?: typeof RootStack | typeof DemoNestedStack | typeof DemoTabStack | typeof DemoTabRNComponentsStack,
//     signInComponent?: ComponentClass<any, any> | FunctionComponent<any> | undefined;
// };
// const node: Screen = {
//     stack: RootStack,
//     name: "RootStack",
//     signInComponent: SignInScreen,
//     screens: [
//         {
//             component: HomeScreen,
//             name: "Home",
//             path: "home"
//         },
//         {
//             component: ProfileScreen,
//             name: "Profile",
//             path: "profile/:id",
//             parse: {
//                 id: (id: string) => `${id}`,
//             },
//
//         },
//         {component: DemoFCReduxHookScreen, name: "DemoFCReduxHook", path: "demo-fc-redux-hook"},
//         {component: DemoCollectionScreen, name: "DemoCollection", path: "demo-collection"},
//         {component: DemoRouteScreen, name: "DemoRoute", path: "demo-route"},
//         {component: DemoThirdPartScreen, name: "DemoThirdPart", path: "demo-third-part"},
//         {component: DemoThunkCCScreen, name: "DemoThunkCC", path: "demo-thunk-cc"},
//         {component: DemoMapScreen, name: "DemoMap", path: "demo-map"},
//         {component: TestMapScreen, name: "TestMap", path: "test-map"},
//         // {component: SignInScreen, name: "SignIn", path: "sign-in"},
//         {
//             name: "DemoTab",
//             stack: DemoTabStack,
//             path: "demo-tab",
//             screens: [
//                 {
//                     component: TabHomeScreen,
//                     name: "TabHome",
//                     path: "tab-home"
//                 },
//                 {
//                     component: TabSettingsScreen,
//                     name: "TabSettings",
//                     path: "tab-settings/:item",
//                     initialParams: {"item": "item-001"},
//                     parse: {
//                         item: (item: string) => `${item}`,
//                     }
//                 }
//             ]
//         },
//         {
//             name: "DemoNested",
//             path: "demo-nested",
//             stack: DemoNestedStack,
//             screens: [
//                 {
//                     component: NestedHomeScreen,
//                     name: "NestedHome",
//                     path: "nested-home"
//                 },
//                 {
//                     component: NestedSettingsScreen,
//                     name: "NestedSettings",
//                     path: "nested-settings/:item",
//                     parse: {
//                         item: (item: string) => `${item}`,
//                     }
//                 }
//             ]
//         },
//         {
//             name: "DemoRNComponents",
//             path: "demo-tab-rn-components",
//             stack: DemoTabRNComponentsStack,
//             screens: [{
//                 component: TabRNComponentsHomeScreen,
//                 name: "TabRNComponentsHome",
//                 path: "tab-rn-components-home"
//             },
//                 {
//                     component: TabRNComponentsSectionListScreen,
//                     name: "TabRNComponentsSectionList",
//                     path: "tab-rn-components-settings"
//                 }
//             ]
//         }
//     ]
// }



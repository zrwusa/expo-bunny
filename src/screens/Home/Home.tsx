import * as React from "react";
import {ScrollView, View} from "react-native";
import {RouteProp, useLinkTo} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {useDispatch} from "react-redux";
import {signOutAndRemove} from "../../stores/auth/actions";
import {RootStackParam} from "../../types/stacks";
import {ButtonTO, TextBtn, Text, Link} from "../../components/base-ui";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../lang/short-t";
import getContainerStyles from "../../containers";

type HomeRouteProp = RouteProp<RootStackParam, 'Home'>;
type HomeNavigationProp = StackNavigationProp<RootStackParam, 'Home'>;
export type HomeScreenProps = { route: HomeRouteProp; navigation: HomeNavigationProp; };

function HomeScreen({navigation}: HomeScreenProps) {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.Home');
    const dispatch = useDispatch();
    const linkTo = useLinkTo();
    const containerStyles = getContainerStyles()

    return (
        <ScrollView>
            <View style={containerStyles.screen}>
                <View style={containerStyles.card}>
                    <Text>{st(`navAndRoute`)}</Text>
                    <Link to="/demo-tab/tab-home">{st(`tab`)}</Link>
                    <Link to="/demo-drawer/drawer-home">{st(`drawer`)}</Link>

                    <Link to="/profile/002">{st(`profile`)}(Link)</Link>
                    <ButtonTO onPress={() => linkTo("/profile/002")}>
                        <TextBtn>{st(`profile`)}(useLinkTo)</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('Profile', {id: '002'})}>
                        <TextBtn>{st(`profile`)}(TouchableOpacity)</TextBtn></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}>
                        <TextBtn>{st(`route`)}(TouchableOpacity)</TextBtn></ButtonTO>
                    <Link to="/demo-route?id=1&isHuman=false&sort=top">{st(`route`)}(Link)</Link>
                    {/*<ButtonTO onPress={() => navigation.navigate('DemoModal', {screen: 'ModalHome'})}>*/}
                    {/*    <TextBtn>{st(`demoModal`)}</TextBtn></ButtonTO>*/}

                    <Link to="/demo-nested/nested-home">{st(`nestedNavigation`)}</Link>
                    <ButtonTO onPress={() =>
                        navigation.navigate('DemoNestedLv0', {
                            screen: 'NestedLv1Settings',
                            params: {
                                item: "001",
                                screen: 'NestedLv2Settings',
                                params: {
                                    itemlv2: "002"
                                },
                            },
                        })}><TextBtn>{st(`passParamsFromRootToLeaf`)}(TouchableOpacity)</TextBtn></ButtonTO>
                    <Link to="/demo-nested/nested-settings/001/nested-lv2-settings/002">{st(`passParamsFromRootToLeaf`)}(Link)</Link>
                    <Link to="/demo-bitcoin/bitcoin-alert/true">{st(`passParamsFromRootToLeafTab`)}(Link)</Link>
                </View>
                <View style={containerStyles.card}>
                    <Text>{st(`redux`)}</Text>
                    <Link to="/demo-fc-redux-hook">{st(`FCReduxHook`)}</Link>
                    <Link to="/demo-thunk-cc">{st(`thunkCC`)}</Link>
                </View>
                <View style={containerStyles.card}>
                    <Text>{st(`nativeCapabilities`)}</Text>
                    <Link to="/demo-map">{st(`map`)}</Link>
                    <Link to="/demo-chat">{st(`chat`)}</Link>
                    <Link to="/demo-share">{st(`share`)}</Link>
                    <Link to="/demo-notification">{st(`notification`)}</Link>
                </View>
                <View style={containerStyles.card}>
                    <Text>{st(`componentsAndThemes`)}</Text>
                    <Link to="/demo-third-part">{st(`thirdPart`)}</Link>
                    <Link to="/demo-collection">{st(`componentCollection`)}</Link>
                    <Link to="/demo-tab-rn-components/rn-home">{st(`RNAllInOne`)}</Link>
                    <Link to="/demo-theme">{st(`demoTheme`)}</Link>
                    {/*<ButtonTO onPress={() => navigation.navigate('DemoSuspense')}>*/}
                    {/*    <TextBtn>{st(`demoSuspense`)}</TextBtn></ButtonTO>*/}
                </View>
                <View style={containerStyles.card}>
                    <Text>{st(`others`)}</Text>
                    <Link to="/demo-bitcoin/bitcoin-home">{st(`bitcoin`)}</Link>
                </View>
                <View style={containerStyles.card}>
                    <Text>{st(`system`)}</Text>
                    <Link to="/settings">{st(`settings`)}</Link>
                    <ButtonTO onPress={() => dispatch(signOutAndRemove())}>
                        <TextBtn>{st(`signOut`)}</TextBtn></ButtonTO>
                </View>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

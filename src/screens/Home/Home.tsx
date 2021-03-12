import * as React from "react";
import {ScrollView, View} from "react-native";
import {RouteProp, useLinkTo} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types";
import {ButtonTO, IcoMoon, Link, TextBtn} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../providers/i18n-labor";
import {Card, getContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {useAuthLabor} from "../../providers/auth-labor";
import {useDispatch} from "react-redux";
import {sysError} from "../../store/actions";

type HomeRouteProp = RouteProp<RootStackParam, 'Home'>;
type HomeNavigationProp = StackNavigationProp<RootStackParam, 'Home'>;

export interface HomeScreenProps {
    route: HomeRouteProp;
    navigation: HomeNavigationProp;
}

function HomeScreen({navigation}: HomeScreenProps) {
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.Home');
    const linkTo = useLinkTo();
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {authFunctions} = useAuthLabor()
    const {wp} = sizeLabor.responsive.iphoneX;
    const {colors} = themeLabor.theme

    return (
        <ScrollView>
            <View style={containerStyles.Screen}>
                <Card title={st(`navAndRoute`)}>
                    <Link to="/demo-tab/tab-home">
                        {st(`tab`)}
                        <IcoMoon name="layout7" color={colors.btnText}/></Link>
                    <Link to="/demo-drawer/drawer-home">{st(`drawer`)}
                        <IcoMoon name="layout" color={colors.btnText}/></Link>
                    <Link to="/profile/002">
                        {st(`profile`) + `(Link)`}
                        <IcoMoon name="profile1" color={colors.btnText}/></Link>
                    <ButtonTO onPress={() => linkTo("/profile/002")}>
                        <TextBtn>{st(`profile`)}(useLinkTo)</TextBtn>
                        <IcoMoon name="profile1" color={colors.btnText}/></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('Profile', {id: '002'})}>
                        <TextBtn>{st(`profile`)+'(TouchableOpacity)'}</TextBtn>
                        <IcoMoon name="profile1" color={colors.btnText}/></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}>
                        <TextBtn>{st(`route`)+'(TouchableOpacity)'}</TextBtn>
                        <IcoMoon name="adjustments" size={wp(21)} color={colors.btnText}/></ButtonTO>
                    <Link to="/demo-route?id=1&isHuman=false&sort=top" >{st(`route`) + `(Link)`}
                        <IcoMoon name="adjustments" size={wp(21)} color={colors.btnText}/></Link>
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
                        })}>
                        {st(`passParamsFromRootToLeaf`)+'(TouchableOpacity)'}
                        <IcoMoon name="leaf" size={wp(21)} color={colors.btnText}/>
                    </ButtonTO>
                    <Link to="/demo-nested/nested-settings/001/nested-lv2-settings/002">
                        {st(`passParamsFromRootToLeaf`) + `(Link)`}
                        <IcoMoon name="leaf" size={wp(21)} color={colors.btnText}/></Link>
                    <Link to="/demo-tab/tab-settings/item-001">
                        {st(`passParamsFromRootToLeafTab`) + `(Link)`}
                        <IcoMoon name="leaf" size={wp(21)} color={colors.btnText}/></Link>
                </Card>
                <Card title={st(`redux`)}>
                    <Link to="/demo-fc-redux-hook">
                        {st(`FCReduxHook`)}
                    <IcoMoon name="puzzle" size={wp(21)} color={colors.btnText}/></Link>
                    <Link to="/demo-thunk-cc">
                        {st(`thunkCC`)}
                        <IcoMoon name="gears" size={wp(18)} color={colors.btnText}/></Link>
                    <Link to="/demo-saga">{st(`saga`)}
                    <IcoMoon name="tools" size={wp(21)} color={colors.btnText}/></Link>
                </Card>
                <Card title={st(`nativeCapabilities`)}>
                    <Link to="/demo-map">
                        {st(`map`)}
                    <IcoMoon name="map" size={wp(18)} color={colors.btnText}/></Link>
                    <Link to="/demo-chat">
                        {st(`chat`)}
                    <IcoMoon name="chat" size={wp(21)} color={colors.btnText}/></Link>
                    <Link to="/demo-share">
                        {st(`share`)}
                    <IcoMoon name="share" color={colors.btnText}/></Link>
                    <Link to="/demo-notification">
                        {st(`notification`)}
                    <IcoMoon name="bell-o"  color={colors.btnText}/></Link>
                </Card>
                <Card title={st(`componentsAndThemes`)}>
                    <Link to="/demo-third-part">
                        {st(`thirdPart`)}
                    <IcoMoon name="bus"  color={colors.btnText}/></Link>
                    <Link to="/demo-collection">
                        {st(`componentCollection`)}
                    <IcoMoon name="bus"  color={colors.btnText}/></Link>
                    <Link to="/demo-tab-rn-components/rn-home">
                        {st(`RNAllInOne`)}
                        <IcoMoon name="bus"  color={colors.btnText}/></Link>
                    <Link to="/demo-theme">
                        {st(`demoTheme`)}
                        <IcoMoon name="bus"  color={colors.btnText}/></Link>
                    {/*<ButtonTO onPress={() => navigation.navigate('DemoSuspense')}>*/}
                    {/*    <TextBtn>{st(`demoSuspense`)}</TextBtn></ButtonTO>*/}
                </Card>
                <Card title={st(`others`)}>
                    <Link to="/demo-bitcoin/bitcoin-home">
                        {st(`bitcoin`)}
                    <IcoMoon name="bitcoin"  size={wp(24)} color={colors.btnText}/></Link>
                </Card>
                <Card title={st(`system`)}>
                    <Link to="/settings">
                        {st(`settings`)}
                    <IcoMoon name="settings"  size={wp(22)} color={colors.btnText}/></Link>
                    <ButtonTO onPress={async () => {
                        try {
                            await authFunctions.signOut()
                        } catch (e) {
                            dispatch(sysError(e))
                        }
                    }}>
                        <TextBtn>{st(`signOut`)}</TextBtn>
                        <IcoMoon name="exit"  size={wp(22)} color={colors.btnText}/></ButtonTO>
                </Card>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

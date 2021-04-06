import * as React from "react";
import {ScrollView, View} from "react-native";
import {RouteProp, useLinkTo} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types";
import {ButtonTO, IcoMoon, Link, TextBtn} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {Card, createContainerStyles} from "../../containers";
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
    const st = shortenTFunctionKey(t, 'screens.Home');
    const linkTo = useLinkTo();
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    const {authFunctions} = useAuthLabor()
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {colors} = themeLabor.theme
    const iconColor = {color: colors.btnText};
    return (
        <ScrollView>
            <View style={containerStyles.Screen}>
                <Card title={st(`navAndRoute`)}>
                    <Link to="/demo-tab/home">
                        {st(`tab`)}
                        <IcoMoon name="layout7" {...iconColor}/></Link>
                    <Link to="/demo-drawer/home">{st(`drawer`)}
                        <IcoMoon name="layout" {...iconColor}/></Link>
                    <Link to="/profile/002">
                        {st(`profile`) + `(Link)`}
                        <IcoMoon name="profile1" {...iconColor}/></Link>
                    <ButtonTO onPress={() => linkTo("/profile/002")}>
                        <TextBtn>{st(`profile`)}(useLinkTo)</TextBtn>
                        <IcoMoon name="profile1" {...iconColor}/></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('Profile', {id: '002'})}>
                        <TextBtn>{st(`profile`) + '(TouchableOpacity)'}</TextBtn>
                        <IcoMoon name="profile1" {...iconColor}/></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}>
                        <TextBtn>{st(`route`) + '(TouchableOpacity)'}</TextBtn>
                        <IcoMoon name="adjustments" size={wp(21)} {...iconColor}/></ButtonTO>
                    <Link to="/demo-route?id=1&isHuman=false&sort=top">{st(`route`) + `(Link)`}
                        <IcoMoon name="adjustments" size={wp(21)} {...iconColor}/></Link>
                    {/*<ButtonTO onPress={() => navigation.navigate('DemoModal', {screen: 'ModalHome'})}>*/}
                    {/*    <TextBtn>{st(`demoModal`)}</TextBtn></ButtonTO>*/}

                    <Link to="/demo-nested/home">{st(`nestedNavigation`)}</Link>
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
                        {st(`passParamsFromRootToLeaf`) + '(TouchableOpacity)'}
                        <IcoMoon name="leaf" size={wp(21)} {...iconColor}/>
                    </ButtonTO>
                    <Link to="/demo-nested/settings/001/lv2-settings/002">
                        {st(`passParamsFromRootToLeaf`) + `(Link)`}
                        <IcoMoon name="leaf" size={wp(21)} {...iconColor}/></Link>
                    <Link to="/demo-tab/settings/item-001">
                        {st(`passParamsFromRootToLeafTab`) + `(Link)`}
                        <IcoMoon name="leaf" size={wp(21)} {...iconColor}/></Link>
                </Card>
                <Card title={st(`redux`)}>
                    <Link to="/demo-fc-redux-hook">
                        {st(`FCReduxHook`)}
                        <IcoMoon name="puzzle" size={wp(21)} {...iconColor}/></Link>
                    <Link to="/demo-thunk-cc">
                        {st(`thunkCC`)}
                        <IcoMoon name="gears" size={wp(18)} {...iconColor}/></Link>
                    <Link to="/demo-saga">{st(`saga`)}
                        <IcoMoon name="tools" size={wp(21)} {...iconColor}/></Link>
                </Card>
                <Card title={st(`nativeCapabilities`)}>
                    <Link to="/demo-map">
                        {st(`map`)}
                        <IcoMoon name="map" size={wp(18)} {...iconColor}/></Link>
                    <Link to="/demo-chat">
                        {st(`chat`)}
                        <IcoMoon name="chat" size={wp(21)} {...iconColor}/></Link>
                    <Link to="/demo-share">
                        {st(`share`)}
                        <IcoMoon name="share" {...iconColor}/></Link>
                    <Link to="/demo-notification">
                        {st(`notification`)}
                        <IcoMoon name="bell-o" {...iconColor}/></Link>
                </Card>
                <Card title={st(`componentsAndThemes`)}>
                    <Link to="/demo-third-part">
                        {st(`thirdPart`)}
                        <IcoMoon name="bus" {...iconColor}/></Link>
                    <Link to="/demo-collection">
                        {st(`componentCollection`)}
                        <IcoMoon name="bus" {...iconColor}/></Link>
                    <Link to="/demo-tab-rn-components/home">
                        {st(`RNAllInOne`)}
                        <IcoMoon name="bus" {...iconColor}/></Link>
                    <Link to="/demo-theme">
                        {st(`demoTheme`)}
                        <IcoMoon name="bus" {...iconColor}/></Link>
                    {/*<ButtonTO onPress={() => navigation.navigate('DemoSuspense')}>*/}
                    {/*    <TextBtn>{st(`demoSuspense`)}</TextBtn></ButtonTO>*/}
                </Card>
                <Card title={st(`others`)}>
                    <Link to="/demo-crypto-currency/home">
                        {st(`cryptoCurrency`)}
                        <IcoMoon name="bitcoin" size={wp(24)} {...iconColor}/></Link>
                    <Link to="/demo-ig/home">
                        {st(`ig`)}
                        <IcoMoon name="layout7" {...iconColor}/></Link>
                </Card>
                <Card title={st(`system`)}>
                    <Link to="/settings">
                        {st(`settings`)}
                        <IcoMoon name="settings" size={wp(22)} {...iconColor}/></Link>
                    <ButtonTO onPress={async () => {
                        try {
                            await authFunctions.signOut('MANUAL')
                        } catch (e) {
                            dispatch(sysError(e))
                        }
                    }}>
                        <TextBtn>{st(`signOut`)}</TextBtn>
                        <IcoMoon name="exit" size={wp(22)} {...iconColor}/></ButtonTO>
                </Card>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

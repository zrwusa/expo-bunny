import * as React from "react";
import {ScrollView, View} from "react-native";
import {RouteProp, useLinkTo} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types";
import {ButtonTO, IcoMoon, InButtonText, Link} from "../../components/UI";
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
                        <InButtonText>{st(`tab`)}</InButtonText>
                        <IcoMoon name="layout7" size={wp(22)} {...iconColor}/></Link>
                    <Link to="/demo-drawer/home">
                        <InButtonText>{st(`drawer`)}</InButtonText>
                        <IcoMoon name="layout" size={wp(22)} {...iconColor}/></Link>
                    <Link to="/profile/002">
                        <InButtonText>{st(`profile`) + `(Link)`}</InButtonText>
                        <IcoMoon name="profile1" size={wp(22)} {...iconColor}/></Link>
                    <ButtonTO onPress={() => linkTo("/profile/002")}>
                        <InButtonText>{st(`profile`)}(useLinkTo)</InButtonText>
                        <IcoMoon name="profile1" size={wp(22)} {...iconColor}/></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('Profile', {id: '002'})}>
                        <InButtonText>{st(`profile`) + '(TouchableOpacity)'}</InButtonText>
                        <IcoMoon name="profile1" size={wp(22)} {...iconColor}/></ButtonTO>
                    <ButtonTO onPress={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}>
                        <InButtonText>{st(`route`) + '(TouchableOpacity)'}</InButtonText>
                        <IcoMoon name="adjustments" size={wp(21)} {...iconColor}/></ButtonTO>
                    <Link to="/demo-route?id=1&isHuman=false&sort=top">
                        <InButtonText>{st(`route`) + `(Link)`}</InButtonText>
                        <IcoMoon name="adjustments" size={wp(21)} {...iconColor}/></Link>
                    {/*<ButtonTO onPress={() => navigation.navigate('DemoModal', {screen: 'ModalHome'})}>*/}
                    {/*    <InButtonText>{st(`demoModal`)}</InButtonText></ButtonTO>*/}

                    <Link to="/demo-nested/home">
                        <InButtonText>{st(`nestedNavigation`)}</InButtonText></Link>
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
                        <InButtonText>{st(`passParamsFromRootToLeaf`) + '(TouchableOpacity)'}</InButtonText>
                        <IcoMoon name="leaf" size={wp(21)} {...iconColor}/>
                    </ButtonTO>
                    <Link to="/demo-nested/settings/001/lv2-settings/002">
                        <InButtonText>{st(`passParamsFromRootToLeaf`) + `(Link)`}</InButtonText>
                        <IcoMoon name="leaf" size={wp(21)} {...iconColor}/></Link>
                    <Link to="/demo-tab/settings/item-001">
                        <InButtonText>{st(`passParamsFromRootToLeafTab`) + `(Link)`}</InButtonText>
                        <IcoMoon name="leaf" size={wp(21)} {...iconColor}/></Link>
                </Card>
                <Card title={st(`redux`)}>
                    <Link to="/demo-fc-redux-hook">
                        <InButtonText>{st(`FCReduxHook`)}</InButtonText>
                        <IcoMoon name="puzzle" size={wp(21)} {...iconColor}/></Link>
                    <Link to="/demo-thunk-cc">
                        <InButtonText>{st(`thunkCC`)}</InButtonText>
                        <IcoMoon name="gears" size={wp(18)} {...iconColor}/></Link>
                    <Link to="/demo-saga">
                        <InButtonText>{st(`saga`)}</InButtonText>
                        <IcoMoon name="tools" size={wp(21)} {...iconColor}/></Link>
                </Card>
                <Card title={st(`nativeCapabilities`)}>
                    <Link to="/demo-map">
                        <InButtonText>{st(`map`)}</InButtonText>
                        <IcoMoon name="map" size={wp(18)} {...iconColor}/></Link>
                    <Link to="/demo-chat">
                        <InButtonText>{st(`chat`)}</InButtonText>
                        <IcoMoon name="chat" size={wp(21)} {...iconColor}/></Link>
                    <Link to="/demo-share">
                        <InButtonText>{st(`share`)}</InButtonText>
                        <IcoMoon name="share" {...iconColor}/></Link>
                    <Link to="/demo-notification">
                        <InButtonText>{st(`notification`)}</InButtonText>
                        <IcoMoon name="bell-o" size={wp(22)} {...iconColor}/></Link>
                </Card>
                <Card title={st(`componentsAndThemes`)}>
                    <Link to="/demo-third-part">
                        <InButtonText>{st(`thirdPart`)}</InButtonText>
                        <IcoMoon name="bus" size={wp(22)} {...iconColor}/></Link>
                    <Link to="/demo-collection">
                        <InButtonText>{st(`componentCollection`)}</InButtonText>
                        <IcoMoon name="bus" size={wp(22)} {...iconColor}/></Link>
                    <Link to="/demo-tab-rn-components/home">
                        <InButtonText>{st(`RNAllInOne`)}</InButtonText>
                        <IcoMoon name="bus" size={wp(22)} {...iconColor}/></Link>
                    <Link to="/demo-theme">
                        <InButtonText>{st(`demoTheme`)}</InButtonText>
                        <IcoMoon name="bus" size={wp(22)} {...iconColor}/></Link>
                    <Link to="/demo-search/k">
                        <InButtonText>{st(`demoSearch`)}</InButtonText>
                        <IcoMoon name="bus" size={wp(22)} {...iconColor}/></Link>

                    {/*<ButtonTO onPress={() => navigation.navigate('DemoSuspense')}>*/}
                    {/*    <InButtonText>{st(`demoSuspense`)}</InButtonText></ButtonTO>*/}
                </Card>
                <Card title={st(`devTools`)}>
                    <Link to="/color-finder">
                        <InButtonText>{st(`colorFinder`)}</InButtonText>
                        <IcoMoon name="bus" size={wp(22)} {...iconColor}/></Link>
                    <Link to="/icon-tools">
                        <InButtonText>{st(`iconTools`)}</InButtonText>
                        <IcoMoon name="bus" size={wp(22)} {...iconColor}/></Link>
                    <Link to="/playground">
                        <InButtonText>{st(`playground`)}</InButtonText>
                        <IcoMoon name="bus" size={wp(22)} {...iconColor}/></Link>
                </Card>
                <Card title={st(`others`)}>
                    <Link to="/demo-crypto-currency/home">
                        <InButtonText>{st(`cryptoCurrency`)}</InButtonText>
                        <IcoMoon name="bitcoin" size={wp(24)} {...iconColor}/></Link>
                    <Link to="/demo-ig/home">
                        <InButtonText>{st(`ig`)}</InButtonText>
                        <IcoMoon name="layout7" size={wp(22)} {...iconColor}/></Link>
                    <Link to="/demo-health/home">
                        <InButtonText>{st(`demoHealth`)}</InButtonText>
                        <IcoMoon name="layout7" size={wp(22)} {...iconColor}/></Link>
                </Card>
                <Card title={st(`system`)}>
                    <Link to="/settings">
                        <InButtonText>{st(`settings`)}</InButtonText>
                        <IcoMoon name="settings" size={wp(22)} {...iconColor}/></Link>
                    <ButtonTO onPress={async () => {
                        try {
                            await authFunctions.signOut('MANUAL')
                        } catch (e) {
                            dispatch(sysError(e))
                        }
                    }}>
                        <InButtonText>{st(`signOut`)}</InButtonText>
                        <IcoMoon name="exit" size={wp(22)} {...iconColor}/>
                    </ButtonTO>
                </Card>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

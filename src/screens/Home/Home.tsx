import * as React from "react";
import {ScrollView, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {Card, getContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {useAuthLabor} from "../../providers/auth-labor";
import {useDispatch} from "react-redux";
import {sysError} from "../../store/actions";
import {Divider} from "../../components/Divider";
import {getStyles} from "./styles";
import {InlineJump} from "../../components/InlineJump";

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
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor)
    const {authFunctions} = useAuthLabor()
    return (
        <ScrollView>
            <View style={[containerStyles.Screen, styles.container]}>
                <Card title={st(`navAndRoute`)}>
                    <InlineJump type="LINK" iconName="layout7" text={st(`tab`)} to="/demo-tab/home"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="layout" text={st(`drawer`)} to="/demo-drawer/home"/>
                    <Divider/>

                    <InlineJump type="LINK" iconName="profile1" text={st(`profile`) + `(LinkButton)`} to="/profile/002"/>
                    <Divider/>
                    <InlineJump type="LINK_TO" iconName="profile1" text={st(`profile`) + '(useLinkTo)'} to="/profile/002"/>
                    <Divider/>

                    <InlineJump type="NAV" onNav={() => navigation.navigate('Profile', {id: '002'})} iconName="profile1"
                                text={st(`profile`) + '(TouchableOpacity)'}/>
                    <Divider/>

                    <InlineJump type="NAV" onNav={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}
                                iconName="adjustments"
                                text={st(`route`) + '(TouchableOpacity)'}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="adjustments" text={st(`route`) + `(Link)`} to="/demo-route?id=1&isHuman=false&sort=top"/>
                    <Divider/>
                    {/*<ButtonTO onPress={() => navigation.navigate('DemoModal', {screen: 'ModalHome'})}>*/}
                    {/*    <InButtonText>{st(`demoModal`)}</InButtonText></ButtonTO>*/}
                    <InlineJump type="LINK" iconName="adjustments" text={st(`nestedNavigation`)} to="/demo-nested/home"/>
                    <Divider/>

                    <InlineJump type="NAV" onNav={() =>
                        navigation.navigate('DemoNestedLv0', {
                            screen: 'NestedLv1Settings',
                            params: {
                                item: "001",
                                screen: 'NestedLv2Settings',
                                params: {
                                    itemlv2: "002"
                                },
                            },
                        })} iconName="leaf" text={st(`passParamsFromRootToLeaf`) + '(TouchableOpacity)'}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="leaf" text={st(`passParamsFromRootToLeaf`) + `(Link)`}
                                to="/demo-nested/settings/001/lv2-settings/002"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="leaf" text={st(`passParamsFromRootToLeafTab`) + `(Link)`} to="/demo-tab/settings/item-001"/>
                </Card>
                <Card title={st(`redux`)}>
                    <InlineJump type="LINK" iconName="puzzle" text={st(`FCReduxHook`)} to="/demo-fc-redux-hook"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="gears" text={st(`thunkCC`)} to="/demo-thunk-cc"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="tools" text={st(`saga`)} to="/demo-saga"/>
                </Card>
                <Card title={st(`nativeCapabilities`)}>

                    <InlineJump type="LINK" iconName="map" text={st(`map`)} to="/demo-map"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="chat" text={st(`chat`)} to="/demo-chat"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="share" text={st(`share`)} to="/demo-share"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="bell-o" text={st(`notification`)} to="/demo-notification"/>
                </Card>
                <Card title={st(`componentsAndThemes`)}>

                    <InlineJump type="LINK" iconName="lab" text={st(`thirdPart`)} to="/demo-third-part"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="heart" text={st(`componentCollection`)} to="/demo-collection"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="react" text={st(`RNAllInOne`)} to="/demo-tab-rn-components/home"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="puzzle" text={st(`demoTheme`)} to="/demo-theme"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="search" text={st(`demoSearch`)} to="/demo-search/k"/>
                    {/*<ButtonTO onPress={() => navigation.navigate('DemoSuspense')}>*/}
                    {/*    <InButtonText>{st(`demoSuspense`)}</InButtonText></ButtonTO>*/}
                </Card>
                <Card title={st(`devTools`)}>
                    <InlineJump type="LINK" iconName="search" text={st(`colorFinder`)} to="/color-finder"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="tools-2" text={st(`iconTools`)} to="/icon-tools"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="car" text={st(`playground`)} to="/playground"/>
                </Card>
                <Card title={st(`others`)}>
                    <InlineJump type="LINK" iconName="bitcoin" text={st(`cryptoCurrency`)} to="/demo-crypto-currency/home"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="layout7" text={st(`ig`)} to="/demo-ig/home"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="layout7" text={st(`demoHealth`)} to="/demo-health/home"/>
                </Card>
                <Card title={st(`system`)}>
                    <InlineJump type="LINK" iconName="settings" text={st(`settings`)} to="/settings"/>
                    <Divider/>
                    <InlineJump type="NAV" iconName="exit" text={st(`signOut`)} onNav={async () => {
                        try {
                            await authFunctions.signOut('MANUAL')
                        } catch (e) {
                            dispatch(sysError(e))
                        }
                    }}/>
                </Card>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

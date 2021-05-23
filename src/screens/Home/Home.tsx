import * as React from "react";
import {ScrollView, View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {Card, getContainerStyles} from "../../containers";
import {useAuthLabor} from "../../providers/auth-labor";
import {useDispatch} from "react-redux";
import {sysError} from "../../store/actions";
import {Divider} from "../../components/Divider";
import {getStyles} from "./styles";
import {InlineJump} from "../../components/InlineJump";
import {useBunnyKit} from "../../hooks/bunny-kit";

type HomeRouteProp = RouteProp<RootStackParam, 'Home'>;
type HomeNavigationProp = StackNavigationProp<RootStackParam, 'Home'>;

export interface HomeScreenProps {
    route: HomeRouteProp;
    navigation: HomeNavigationProp;
}


function HomeScreen({navigation}: HomeScreenProps) {
    const {sizeLabor, themeLabor, t, wp} = useBunnyKit();
    const dispatch = useDispatch();
    const st = shortenTFunctionKey(t, 'screens.Home');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor)
    const {authFunctions} = useAuthLabor();

    return (
        <ScrollView>
            <View style={[containerStyles.Screen, styles.container]}>
                <Card titleMode="OUT" title={st(`devTools`)}>
                    <InlineJump type="LINK" iconName="search" text={st(`colorFinder`)} to="/color-finder" iconSize={wp(20)}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="tools-2" text={st(`iconTools`)} to="/icon-tools" iconSize={wp(20)}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="car" text={st(`playground`)} to="/playground"/>
                </Card>
                <Card titleMode="OUT" title={st(`apps`)}>
                    <InlineJump type="LINK" iconName="layout7" text={st(`socialMedia`)} to="/demo-social-media/home"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="heart" text={st(`demoDating`)} to="/demo-dating/home" iconSize={wp(20)}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="chat3" text={st(`chat`)} to="/demo-chat" iconSize={wp(18)}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="layout7" text={st(`demoHealth`)} to="/demo-health/home"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="bitcoin" text={st(`cryptoCurrency`)} to="/demo-crypto-currency/home"/>
                </Card>
                <Card titleMode="OUT" title={st(`navAndRoute`)}>
                    <InlineJump type="LINK" iconName="layout7" text={st(`tab`)} to="/demo-tab/home"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="layout" text={st(`drawer`)} to="/demo-drawer/home"/>
                    <Divider/>

                    <InlineJump type="LINK" iconName="profile-male" text={st(`profile`) + `(LinkButton)`} to="/profile/001" iconSize={wp(20)}/>
                    <Divider/>
                    <InlineJump type="LINK_TO" iconName="profile-male" text={st(`profile`) + '(useLinkTo)'} to="/profile/002" iconSize={wp(20)}/>
                    <Divider/>

                    <InlineJump type="NAV" onNav={() => navigation.navigate('Profile', {id: '003'})} iconName="profile-male" iconSize={wp(20)}
                                text={st(`profile`) + '(TouchableOpacity)'}/>
                    <Divider/>

                    <InlineJump type="NAV" onNav={() => navigation.navigate('DemoRoute', {id: '1', isHuman: false, sort: 'top'})}
                                iconName="adjustments"
                                text={st(`route`) + '(TouchableOpacity)'} iconSize={wp(20)}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="adjustments" text={st(`route`) + `(Link)`} to="/demo-route?id=1&isHuman=false&sort=top"
                                iconSize={wp(20)}/>
                    <Divider/>
                    {/*<ButtonTO onPress={() => navigation.navigate('DemoModal', {screen: 'ModalHome'})}>*/}
                    {/*    <InButtonText>{st(`demoModal`)}</InButtonText></ButtonTO>*/}
                    <InlineJump type="LINK" iconName="adjustments" text={st(`nestedNavigation`)} to="/demo-nested/home" iconSize={wp(20)}/>
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
                        })} iconName="greenkeeper" text={st(`passParamsFromRootToLeaf`) + '(TouchableOpacity)'}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="greenkeeper" text={st(`passParamsFromRootToLeaf`) + `(Link)`}
                                to="/demo-nested/settings/001/lv2-settings/002"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="greenkeeper" text={st(`passParamsFromRootToLeafTab`) + `(Link)`}
                                to="/demo-tab/settings/item-001"/>
                </Card>
                <Card titleMode="OUT" title={st(`redux`)}>
                    <InlineJump type="LINK" iconName="puzzle" text={st(`FCReduxHook`)} to="/demo-fc-redux-hook" iconSize={wp(18)}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="gears" text={st(`thunkCC`)} to="/demo-thunk-cc" iconSize={wp(17)}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="tools" text={st(`saga`)} to="/demo-saga" iconSize={wp(18)}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="tools" text={st(`sagaFirebase`)} to="/demo-saga-firebase" iconSize={wp(18)}/>
                </Card>
                <Card titleMode="OUT" title={st(`nativeCapabilities`)}>
                    <InlineJump type="LINK" iconName="share" text={st(`share`)} to="/demo-share" iconSize={wp(18)}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="bell-o" text={st(`notification`)} to="/demo-notification"/>
                </Card>
                <Card titleMode="OUT" title={st(`componentsAndThemes`)}>

                    <InlineJump type="LINK" iconName="lab" text={st(`thirdPart`)} to="/demo-third-part"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="heart" text={st(`componentCollection`)} to="/demo-collection" iconSize={wp(20)}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="react" text={st(`RNAllInOne`)} to="/demo-tab-rn-components/home"/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="puzzle" text={st(`demoTheme`)} to="/demo-theme" iconSize={wp(20)}/>
                    <Divider/>
                    <InlineJump type="LINK" iconName="search" text={st(`demoSearch`)} to="/demo-search/k" iconSize={wp(20)}/>
                    {/*<ButtonTO onPress={() => navigation.navigate('DemoSuspense')}>*/}
                    {/*    <InButtonText>{st(`demoSuspense`)}</InButtonText></ButtonTO>*/}
                </Card>

                <Card titleMode="OUT" title={st(`others`)}>
                    <InlineJump type="LINK" iconName="map" text={st(`map`)} to="/demo-map" iconSize={wp(18)}/>
                </Card>
                <Card titleMode="OUT" title={st(`system`)}>
                    <InlineJump type="LINK" iconName="settings" text={st(`settings`)} to="/settings" iconSize={wp(20)}/>
                    <Divider/>
                    <InlineJump type="NAV" iconName="log-out" text={st(`logOut`)} onNav={async () => {
                        try {
                            await authFunctions.logOut('MANUAL')
                        } catch (e) {
                            dispatch(sysError(e))
                        }
                    }} iconSize={wp(20)}/>
                </Card>
            </View>
        </ScrollView>
    );
}

export default HomeScreen;

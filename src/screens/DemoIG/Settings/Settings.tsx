import * as React from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoIGStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {Card, createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {Animated, Platform, SafeAreaView, StatusBar} from "react-native";
import {useState} from "react";
import SearchComponent from "./SearchComponent";
import {uuidV4} from "../../../utils";

type IGSettingsRouteProp = RouteProp<DemoIGStackParam, 'IGSettings'>;
type IGSettingsNavigationProp = BottomTabNavigationProp<DemoIGStackParam, 'IGSettings'>;

export interface IGSettingsProps {
    route: IGSettingsRouteProp,
    navigation: IGSettingsNavigationProp
}

export function IGSettingsScreen({route, navigation}: IGSettingsProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.IGSettings');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {theme} = themeLabor
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);

    // return (
    //     <View style={containerStyles.Screen}>
    //         <Card title={st(`title`)}>
    //             <Text>{route.params.item}</Text>
    //         </Card>
    //     </View>
    // );

    const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
    const clampedScroll = Animated.diffClamp(
        Animated.add(
            scrollYValue.interpolate({
                inputRange: [0, 10],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
            new Animated.Value(0),
        ),
        0,
        50,
    )
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <Animated.View style={{flex:1}}>
            <SafeAreaView style={{flex:1}}>
                <SearchComponent clampedScroll={clampedScroll} />
                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        // height:600,
                        // flex:1,
                        // margin: 20,
                        backgroundColor: 'white',
                        paddingTop: 55
                    }}
                    contentContainerStyle={{
                        // display: 'flex',
                        // flexDirection: 'row',
                        // flexWrap: 'wrap',
                        // justifyContent: 'space-around'
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
                        { useNativeDriver: true },
                        // () => { },          // Optional async listener
                    )}
                    contentInsetAdjustmentBehavior="automatic">
                    {array.map(item => <View key={uuidV4()} style={{height:100,width:375}}><Text>xxx</Text></View>)}
                </Animated.ScrollView>
            </SafeAreaView>
        </Animated.View>
    );
}

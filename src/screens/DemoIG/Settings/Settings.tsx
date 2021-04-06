import * as React from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoIGStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {Animated} from "react-native";
import {useState} from "react";
import {uuidV4} from "../../../utils";
import {SafeAreaView} from "react-native";
import {FollowUpSearchBar} from "../../../components/FollowUpSearchBar";
import {createStyles} from "./styles";


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

    const styles = createStyles(sizeLabor, themeLabor)

    // return (
    //     <View style={containerStyles.Screen}>
    //         <Card title={st(`title`)}>
    //             <Text>{route.params.item}</Text>
    //         </Card>
    //     </View>
    // );

    const [scrollYValue] = useState(new Animated.Value(0));

    const array = [];
    for (let i = 0; i < 1000; i++) {
        array.push(i)
    }
    return (
        <SafeAreaView style={containerStyles.Screen}>
            <Animated.View style={containerStyles.FullFill}>
                <FollowUpSearchBar scrollYValue={scrollYValue}
                                   defaultKeywords={['a', 'b']}
                                   onSearch={() => {
                                       console.log('---onSearch')
                                   }}
                                   onSearchResult={(searchResult) => {
                                       console.log('---onSearchResult')
                                   }}
                />
                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.list}
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollYValue}}}],
                        {useNativeDriver: true},
                    )}
                    contentInsetAdjustmentBehavior="automatic">
                    {array.map(item => <View key={uuidV4()} style={{height: 100, width: 375}}><Text>{item}</Text></View>)}
                </Animated.ScrollView>
            </Animated.View>
        </SafeAreaView>
    );
}

import * as React from "react";
import {RouteProp} from "@react-navigation/native";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {DemoIGStackParam, IGHomeBrick, MasonryDatum} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {createStyles} from "./styles";
import {Animated, SafeAreaView} from "react-native";
import {uuid4} from "@sentry/utils";
import {useEffect, useState} from "react";
import {Masonry} from "../../../components/Masonry/Masonry";
import {FollowUpSearchBar} from "../../../components/FollowUpSearchBar";
import {defaultMasonryData, rawBricks} from "./data";

type IGSearchRouteProp = RouteProp<DemoIGStackParam, 'IGSearch'>;
type IGSearchNavigationProp = BottomTabNavigationProp<DemoIGStackParam, 'IGSearch'>;

export interface IGSearchProps {
    route: IGSearchRouteProp,
    navigation: IGSearchNavigationProp
}

export function IGSearchScreen({route, navigation}: IGSearchProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.IGSearch');
    const sizeLabor = useSizeLabor();
    const {wp} = sizeLabor.designsBasedOn.iphoneX
    const themeLabor = useThemeLabor();
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    const styles = createStyles(sizeLabor, themeLabor)
    const [MasonryData, setMasonryData] = useState(defaultMasonryData)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        let column1 = [],
            column2 = [],
            column3 = [];

        let manyBricks: IGHomeBrick[] = []

        for (let i = 0; i < 1; i++) {
            manyBricks = manyBricks.concat(rawBricks.map(brick => {
                brick.id = uuid4()
                return brick
            }))
        }

        let i = 0;
        while (i < manyBricks.length) {
            column1.push(manyBricks[i++]);
            if (i < manyBricks.length) {
                column2.push(manyBricks[i++]);
            }
            if (i < manyBricks.length) {
                column3.push(manyBricks[i++]);
            }
        }
        let newMasonryData: MasonryDatum<IGHomeBrick>[] = []
        for (let i = 0; i < 100; i++) {
            newMasonryData.push({id: uuid4(), column1, column2, column3})
        }
        setMasonryData(newMasonryData)
        setIsReady(true)
    }, [])

    const imageWidth = wp(375 / 3 - 1);

    const getItem = function (data: [], index: number) {
        return data[index]
    }

    const getItemCount = function (data: []) {
        return data.length;
    }
    const [scrollYValue] = useState(new Animated.Value(0));
    return (
        <SafeAreaView style={containerStyles.Screen}>
            <FollowUpSearchBar scrollYValue={scrollYValue}/>
            {isReady ?
            <Animated.FlatList data={MasonryData}
                      initialNumToRender={1}
                      renderItem={({item}) => <Masonry data={item}/>}
                      keyExtractor={item => item.id}
                      maxToRenderPerBatch={1}
                      windowSize={3}
                      updateCellsBatchingPeriod={100}
                      onScroll={Animated.event(
                          [{nativeEvent: {contentOffset: {y: scrollYValue}}}],
                          {useNativeDriver: true},
                      )}
            />
            : null}
        </SafeAreaView>

        // isReady ?
        // <VirtualizedList
        //     data={MasonryData}
        //     initialNumToRender={1}
        //     renderItem={({item}) => <Masonry data={item}/>}
        //     keyExtractor={item => item.id}
        //     getItemCount={getItemCount}
        //     getItem={getItem}
        //     removeClippedSubviews={true}
        //     maxToRenderPerBatch={1}
        //     windowSize={1}
        //     updateCellsBatchingPeriod={100}
        // />
        // :null
    );
}

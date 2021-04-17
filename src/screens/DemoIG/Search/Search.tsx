import * as React from "react";
import {useEffect, useState} from "react";
import {RouteProp} from "@react-navigation/native";
import {DemoIGStackParam, IGMediaBrick, MasonryDatum, RootStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {createStyles} from "./styles";
import {Animated, Platform, SafeAreaView} from "react-native";
import {uuid4} from "@sentry/utils";
import {Masonry} from "../../../components/Masonry/Masonry";
import {FollowUpSearchBar} from "../../../components/FollowUpSearchBar";
import {defaultMasonryData, rawBricks} from "./data";
import {StackNavigationProp} from "@react-navigation/stack";

type IGSearchRouteProp = RouteProp<DemoIGStackParam, 'IGSearch'>;
type IGSearchNavigationProp = StackNavigationProp<RootStackParam, 'DemoIG'>;

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

        let manyBricks: IGMediaBrick[] = []

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
        let newMasonryData: MasonryDatum<IGMediaBrick>[] = []
        for (let i = 0; i < 10; i++) {
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
    const handleSearch = (key:string)=>{
        console.log(key)
        let column1 = [],
            column2 = [],
            column3 = [];

        let manyBricks: IGMediaBrick[] = []

        for (let i = 0; i < 1; i++) {
            manyBricks = manyBricks.concat(rawBricks.filter((brick)=>{
                return brick.text.includes(key)
            }).map(brick => {
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
        let newMasonryData: MasonryDatum<IGMediaBrick>[] = []
        for (let i = 0; i < 10; i++) {
            newMasonryData.push({id: uuid4(), column1, column2, column3})
        }
        setMasonryData(newMasonryData)
    }
    return (
        <SafeAreaView style={containerStyles.Screen}>
            <FollowUpSearchBar scrollYValue={scrollYValue} onSearch={handleSearch}/>
            {isReady ?
                <Animated.FlatList data={MasonryData}
                                   renderItem={({item}) => <Masonry data={item}/>}
                                   keyExtractor={item => item.id}
                                   debug
                                   initialNumToRender={1}
                                   windowSize={3}
                                   removeClippedSubviews={Platform.OS === 'android'}
                                   maxToRenderPerBatch={10}
                                   updateCellsBatchingPeriod={50}

                                   onScroll={Animated.event(
                                       [{nativeEvent: {contentOffset: {y: scrollYValue}}}],
                                       {useNativeDriver: true},
                                   )}
                />
                : null}
        </SafeAreaView>
    );
}

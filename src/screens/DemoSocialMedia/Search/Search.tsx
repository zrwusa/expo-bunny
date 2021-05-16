import * as React from "react";
import {useEffect, useMemo, useState} from "react";
import {RouteProp} from "@react-navigation/native";
import {DemoSocialMediaTabStackParam, MasonryDatum, RootStackParam, RootState, SocialMediaImageDatum} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {getStyles} from "./styles";
import {Animated, Platform, SafeAreaView} from "react-native";
import {uuid4} from "@sentry/utils";
import {Masonry} from "../../../components/Masonry/Masonry";
import {FollowUpSearchBar} from "../../../components/FollowUpSearchBar";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {isLoaded, useFirebase, useFirestoreConnect} from "react-redux-firebase";
import config from "../../../config";
import {Preparing} from "../../../components/Preparing";

type SocialMediaSearchRouteProp = RouteProp<DemoSocialMediaTabStackParam, 'SocialMediaSearch'>;
type SocialMediaSearchNavigationProp = StackNavigationProp<RootStackParam, 'DemoSocialMedia'>;

export interface SocialMediaSearchProps {
    route: SocialMediaSearchRouteProp,
    navigation: SocialMediaSearchNavigationProp
}

export function SocialMediaSearchScreen({route, navigation}: SocialMediaSearchProps) {
    const firebase = useFirebase();
    const getSocialMediaImages = async () => {
        await firebase.watchEvent('value', 'socialMediaImages', 'socialMediaImages')
    }
    useFirestoreConnect([
        {collection: 'socialMediaImages'}
    ])
    const socialMediaImages = useSelector((rootState: RootState) => rootState.firestoreState.ordered.socialMediaImages)

    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.SocialMediaSearch');
    const sizeLabor = useSizeLabor();
    const {wp} = sizeLabor.designsBasedOn.iphoneX
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const [MasonryData, setMasonryData] = useState<MasonryDatum<SocialMediaImageDatum>[]>([])

    const memoizedSocialMediaImages = useMemo(() => {
        if (!socialMediaImages) {
            return []
        }
        return socialMediaImages.map(item => item)
    }, [socialMediaImages])

    useEffect(() => {
        getSocialMediaImages().then()
    }, [])

    useEffect(() => {
        if (!socialMediaImages) {
            return
        }
        let column1 = [],
            column2 = [],
            column3 = [];

        let manyBricks: SocialMediaImageDatum[] = memoizedSocialMediaImages

        for (let i = 0; i < 1; i++) {
            manyBricks = manyBricks.concat(memoizedSocialMediaImages)
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
        let newMasonryData: MasonryDatum<SocialMediaImageDatum>[] = []
        for (let i = 0; i < 10; i++) {
            newMasonryData.push({id: uuid4(), column1, column2, column3})
        }
        setMasonryData(newMasonryData)
    }, [socialMediaImages])

    const imageWidth = wp(375 / 3 - 1);

    const getItem = function (data: [], index: number) {
        return data[index]
    }

    const getItemCount = function (data: []) {
        return data.length;
    }
    const [scrollYValue] = useState(new Animated.Value(0));
    const handleSearch = (key: string) => {
        let column1 = [],
            column2 = [],
            column3 = [];

        let manyBricks: SocialMediaImageDatum[] = []

        for (let i = 0; i < 1; i++) {
            manyBricks = manyBricks.concat(memoizedSocialMediaImages.filter((brick) => {
                return brick.text.includes(key)
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
        let newMasonryData: MasonryDatum<SocialMediaImageDatum>[] = []
        for (let i = 0; i < 10; i++) {
            newMasonryData.push({id: uuid4(), column1, column2, column3})
        }
        setMasonryData(newMasonryData)
    }
    return (
        <SafeAreaView style={containerStyles.Screen}>
            <FollowUpSearchBar scrollYValue={scrollYValue} onSearch={handleSearch}/>
            {isLoaded(socialMediaImages) ?
                <Animated.FlatList data={MasonryData}
                                   renderItem={({item}) => <Masonry data={item}/>}
                                   keyExtractor={item => item.id}

                                   initialNumToRender={1}
                                   windowSize={3}
                                   removeClippedSubviews={Platform.OS === 'android'}
                                   maxToRenderPerBatch={10}
                                   updateCellsBatchingPeriod={50}

                                   onScroll={Animated.event(
                                       [{nativeEvent: {contentOffset: {y: scrollYValue}}}],
                                       {useNativeDriver: config.useNativeDriver},
                                   )}
                />
                : <Preparing/>}
        </SafeAreaView>
    );
}

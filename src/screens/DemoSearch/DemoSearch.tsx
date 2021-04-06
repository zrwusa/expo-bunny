import * as React from "react";
import {Text, View} from "../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoSearchDummyDatum, RootStackParam} from "../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {createContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {Animated} from "react-native";
import {useEffect, useState} from "react";
import {randomText, uuidV4, wait} from "../../utils";
import {SafeAreaView} from "react-native";
import {FollowUpSearchBar} from "../../components/FollowUpSearchBar";
import {createStyles} from "./styles";
import {collectBLResult} from "../../store/actions";
import {blError} from "../../helpers";
import {StackNavigationProp} from "@react-navigation/stack";


type DemoSearchRouteProp = RouteProp<RootStackParam, 'DemoSearch'>;
type DemoSearchNavigationProp = StackNavigationProp<RootStackParam, 'DemoSearch'>;

export interface DemoSearchProps {
    route: DemoSearchRouteProp,
    navigation: DemoSearchNavigationProp
}


export function DemoSearchScreen({route, navigation}: DemoSearchProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.DemoSearch');
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
    const [data, setData] = useState<DemoSearchDummyDatum[]>([])


    const getDummyData = () => {
        const dummyData: DemoSearchDummyDatum[] = [];

        for (let i = 0; i < 10000; i++) {
            dummyData.push({id: i, text: randomText(30)})
        }
        return dummyData;
    }

    useEffect(() => {
    }, [])


    const mockSearch = async (keywordText: string) => {
        return new Promise<DemoSearchDummyDatum[]>((resolve, reject) => {
            wait(1000).then(() => {
                const dummyData = getDummyData()
                const result = dummyData.filter((item) => {
                    return item.text.includes(keywordText)
                })
                const resultMapped = result.map((item) => {
                    item.text.replace(keywordText, '')
                })
                return Math.random() > 0.1 ? resolve(result) : reject(new Error('error when searching'))
            })
        })
    }
    return (
        <SafeAreaView style={containerStyles.Screen}>
            <FollowUpSearchBar scrollYValue={scrollYValue}
                               defaultKeywords={[]}
                               onSearch={async (searchText) => {
                                   console.log('---onSearch,searchText', searchText)
                                   try {
                                       const searchResult = await mockSearch(searchText)
                                       setData(searchResult)
                                       console.log(searchResult)
                                   } catch (e) {
                                       console.error(e)
                                       collectBLResult(blError(e))
                                   }
                               }}
            />
            <Animated.FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                style={styles.list}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollYValue}}}],
                    {useNativeDriver: true},
                )}
                keyExtractor={item => item.id.toString()}
                contentInsetAdjustmentBehavior="automatic"
                renderItem={({item}) => <View
                    style={{height: 100, width: 375, padding: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{marginRight: 10}}>{item.id}</Text>
                        <Text>{item.text}</Text>
                    </View>
                </View>}
            />
            {/*<Animated.ScrollView*/}
            {/*    showsVerticalScrollIndicator={false}*/}
            {/*    style={styles.list}*/}
            {/*    onScroll={Animated.event(*/}
            {/*        [{nativeEvent: {contentOffset: {y: scrollYValue}}}],*/}
            {/*        {useNativeDriver: true},*/}
            {/*    )}*/}
            {/*    contentInsetAdjustmentBehavior="automatic">*/}
            {/*    {data.map(item => <View key={uuidV4()}*/}
            {/*                            style={{height: 100, width: 375, padding: 10}}>*/}
            {/*        <View style={{flexDirection: 'row'}}>*/}
            {/*            <Text style={{marginRight: 10}}>{item.id}</Text>*/}
            {/*            <Text>{item.text}</Text>*/}
            {/*        </View>*/}
            {/*    </View>)}*/}
            {/*</Animated.ScrollView>*/}
        </SafeAreaView>
    );
}

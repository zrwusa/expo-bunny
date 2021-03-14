import * as React from "react";
import {useEffect, useState} from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoCryptoCurrencyHomeTopStackParam} from "../../../types";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../../providers/i18n-labor";
import {createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {SlideAreaChart, SlideBarChart} from 'react-native-slide-charts';
import * as Haptics from 'expo-haptics'
import nomicsAPI from "../../../helpers/nomics-api";
import {createStyles} from "./styles";


type CryptoCurrencyHomeRouteProp = RouteProp<DemoCryptoCurrencyHomeTopStackParam, 'BTC'>;
type CryptoCurrencyHomeNavigationProp = BottomTabNavigationProp<DemoCryptoCurrencyHomeTopStackParam, 'BTC'>;

export interface CryptoCurrencyHomeProps {
    route: CryptoCurrencyHomeRouteProp,
    navigation: CryptoCurrencyHomeNavigationProp
}


function CryptoCurrencyHomeScreen({route, navigation}: CryptoCurrencyHomeProps) {
    const {type} = route.params;
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.'+type);
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = createContainerStyles(sizeLabor, themeLabor);
    const {Screen, Card} = containerStyles;
    const styles = createStyles(sizeLabor, themeLabor)
    const {wp} = sizeLabor.responsive.iphoneX;
    const chartWidth = wp(340);
    const axisWidth = wp(6);
    const axisHeight = wp(16);
    const [btcData, setBtcData] = useState([
        {x: new Date('1990-01-01'), y: 5}
    ]);
    useEffect(() => {
        const getHistoricalPrices = async () => {
            const res = await nomicsAPI.get('v1/currencies/sparkline', {
                params: {
                    key: '9d5780d97bce8d6019393ccbc5f0cd45',
                    ids: type,
                    start: '2021-02-25T00:00:00Z',
                    end: '2021-03-03T00:00:00Z'
                }
            })
            const {timestamps, prices} = res.data[0]
            const btcDataMapped = timestamps.map((item: string, index: number) => {
                return {x: new Date(item), y: parseFloat(prices[index]).toFixed(2)}
            })
            setBtcData(btcDataMapped)
        }
        getHistoricalPrices().then();
    }, [])

    const markerSpacing = btcData.length > 20 ? wp(2) : btcData.length > 10 ? wp(1) : 0

    return (
        <View style={Screen}>
            <View style={Card}>
                <Text>{st(`title`)}</Text>
                <SlideAreaChart
                    scrollable
                    style={styles.btcChart}
                    width={chartWidth}
                    shouldCancelWhenOutside={false}
                    data={btcData}
                    axisWidth={axisWidth}
                    axisHeight={axisHeight}
                    yAxisProps={{
                        axisLabel: '$',
                    }}
                    xAxisProps={{
                        axisMarkerLabels: btcData.map((item) => {
                            const xDate = new Date(item.x)
                            return xDate.getDate().toString()
                        }),
                        adjustForSpecialMarkers: true,
                        markerSpacing,
                        minimumSpacing: markerSpacing,
                    }}
                    toolTipProps={{
                        toolTipTextRenderers: [
                            ({scaleY, y}) => ({
                                text: scaleY
                                    .invert(y)
                                    .toFixed(1)
                                    .toString(),
                            }),
                        ],
                    }}
                />
                <SlideBarChart
                    scrollable
                    selectionChangedCallback={() => Haptics.selectionAsync()}
                    shouldCancelWhenOutside={false}
                    alwaysShowIndicator={false}
                    style={styles.btcChart}
                    data={btcData}
                    width={chartWidth}
                    axisWidth={axisWidth}
                    axisHeight={axisHeight}
                    yAxisProps={{
                        axisLabel: '$',
                    }}
                    xAxisProps={{
                        axisMarkerLabels: btcData.map((item) => {
                            const xDate = new Date(item.x)
                            return xDate.getDate().toString()
                        }),
                        adjustForSpecialMarkers: true,
                        markerSpacing,
                        minimumSpacing: markerSpacing,
                    }}
                    toolTipProps={{
                        lockTriangleCenter: true,
                        toolTipTextRenderers: [
                            ({selectedBarNumber}) => ({
                                text: btcData[selectedBarNumber].y.toString(),
                            }),
                            () => ({text: '$'}),
                        ],
                    }}
                />
            </View>
        </View>
    );
}

export default CryptoCurrencyHomeScreen;

import * as React from "react";
import {useEffect, useState} from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoCryptoCurrencyStackParam, RootState} from "../../../types";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../../providers/i18n-labor";
import {createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryTooltip} from "victory-native";
import nomicsAPI from "../../../helpers/nomics-api";
import {createStyles} from "./styles";
import {addDays, createSmartStyles} from "../../../utils";
import {useSelector} from "react-redux";
import {VictoryVoronoiContainer} from "victory-native/lib";


type CryptoCurrencyHomeRouteProp = RouteProp<DemoCryptoCurrencyStackParam, 'CryptoCurrencyHome'>;
type CryptoCurrencyHomeNavigationProp = BottomTabNavigationProp<DemoCryptoCurrencyStackParam, 'CryptoCurrencyHome'>;

export interface CryptoCurrencyHomeProps {
    route: CryptoCurrencyHomeRouteProp,
    navigation: CryptoCurrencyHomeNavigationProp
}


function CryptoCurrencyHomeScreen({route, navigation}: CryptoCurrencyHomeProps) {
    const types = ['BTC', 'ETH'];
    const dateRanges = ['1day', '1week', '1month', '1year'];
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.CryptoCurrencyHome');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {colors} = themeLabor.theme;
    const {Screen, Box} = createContainerStyles(sizeLabor, themeLabor);
    const {smartStyles} = createSmartStyles(sizeLabor, themeLabor);
    const {} = smartStyles;
    const styles = createStyles(sizeLabor, themeLabor)
    const {ms} = sizeLabor;
    const {wp} = sizeLabor.responsive.iphoneX;
    const [btcData, setBtcData] = useState([
        {x: new Date('1990-01-01'), y: 5}
    ]);
    const {currentPrice} = useSelector((rootState: RootState) => rootState.demoCryptoCurrencyState)
    const [type, setType] = useState('BTC')
    const [dateRange, setDateRange] = useState('1day')
    const getHistoricalPrices = async (type: string, dateRange: string) => {
        let start = '';
        let end = new Date().toISOString();
        switch (dateRange) {
            case '1day':
                start = addDays(new Date(), -1).toISOString()
                break;
            case '1week':
                start = addDays(new Date(), -7).toISOString()
                break;
            case '1month':
                start = addDays(new Date(), -30).toISOString()
                break;
            case '1year':
                start = addDays(new Date(), -365).toISOString()
                break;
            default:
                start = addDays(new Date(), -1).toISOString()
                break;
        }
        const res = await nomicsAPI.get('v1/currencies/sparkline', {
            params: {
                key: '9d5780d97bce8d6019393ccbc5f0cd45',
                ids: type,
                start,
                end
            }
        })
        const {timestamps, prices} = res.data[0]
        const btcDataMapped = timestamps.map((item: string, index: number) => {
            return {x: new Date(item), y: parseFloat(parseFloat(prices[index]).toFixed(2))}
        })
        setBtcData(btcDataMapped)
    }
    useEffect(() => {
        getHistoricalPrices(type, dateRange).then();
    }, [])

    return (
        <View style={[Screen, Box]}>
            <Text>{currentPrice}</Text>
            <View style={styles.tabs}>
                {
                    types.map(item => {
                        const activeWrapStyle = item === type ? styles.active : styles.inActive;
                        const activeTextStyle = item === type ? styles.tabTextActive : styles.tabText;
                        return <View style={[styles.tab, activeWrapStyle]}
                                     key={item}>
                            <Text style={[styles.tabText, activeTextStyle]} onPress={async () => {
                                setType(item)
                                await getHistoricalPrices(item, dateRange);
                            }}>{st(item)}</Text>
                        </View>
                    })
                }
            </View>
            <View style={styles.tabs}>
                {
                    dateRanges.map(item => {
                        const activeWrapStyle = item === dateRange ? styles.active : styles.inActive;
                        const activeTextStyle = item === dateRange ? styles.tabTextActive : styles.tabText;
                        return <View style={[activeWrapStyle, styles.tab]}
                                     key={item}>
                            <Text style={[styles.tabText, activeTextStyle]}
                                  onPress={async () => {
                                      setDateRange(item)
                                      await getHistoricalPrices(type, item);
                                  }}>{st(item)}</Text>
                        </View>
                    })
                }
            </View>
            <VictoryChart
                padding={{top: wp(40),left:wp(4), bottom: wp(30), right: wp(20)}}
                animate={{
                    duration: 1000,
                }}
                domainPadding={{y: wp(15)}}
                containerComponent={
                    <VictoryVoronoiContainer
                        voronoiDimension="x"
                        labels={({datum}) => `x:${datum.x.toLocaleDateString()} \n y: ${datum.y}`}
                        labelComponent={
                            <VictoryTooltip
                                constrainToVisibleArea
                                cornerRadius={ms.br.s}
                                flyoutStyle={{fill: colors.surface}}/>
                        }
                    />
                }
                scale={{x: 'time'}}
            >
                <VictoryAxis crossAxis style={{
                    axis: {stroke: colors.accent},
                    tickLabels:{padding:wp(2),fill: colors.primary}
                }}/>
                <VictoryAxis dependentAxis tickFormat={() => ``}
                             style={{
                                 axis: {stroke: colors.accent},

                             }}/>
                <VictoryLine
                    interpolation="natural"
                    style={{
                        data: {stroke: colors.secondary},
                        parent: {border: `1px solid ${colors.border}`}
                    }}
                    data={btcData}
                />
            </VictoryChart>
        </View>
    );
}

export default CryptoCurrencyHomeScreen;

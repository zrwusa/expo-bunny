import * as React from "react";
import {useEffect, useState} from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoCryptoCurrencyStackParam, RootStackParam, RootState} from "../../../types";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {createContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryTooltip, VictoryVoronoiContainer} from "../../../components/Victory/Victory";
import nomicsAPI from "../../../helpers/nomics-api";
import {createStyles} from "./styles";
import {addDays, createSmartStyles} from "../../../utils";
import {useDispatch, useSelector} from "react-redux";
import axios, {CancelTokenSource} from "axios";
import {collectBLResult, getCurrentPrice, sysError} from "../../../store/actions";
import {blError} from "../../../helpers";
import {ScrollView} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";

type CryptoCurrencyHomeRouteProp = RouteProp<DemoCryptoCurrencyStackParam, 'CryptoCurrencyHome'>;
type CryptoCurrencyHomeNavigationProp = StackNavigationProp<RootStackParam, 'DemoCryptoCurrency'>;

export interface CryptoCurrencyHomeProps {
    route: CryptoCurrencyHomeRouteProp,
    navigation: CryptoCurrencyHomeNavigationProp
}

let source: CancelTokenSource;

function CryptoCurrencyHomeScreen() {
    const types = ['BTC', 'ETH'];
    const dateRanges = ['1d', '1w', '1m', '1y'];
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.CryptoCurrencyHome');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const dispatch = useDispatch();
    const {victory} = themeLabor.theme;
    const {Screen, Box} = createContainerStyles(sizeLabor, themeLabor);
    const {smartStyles} = createSmartStyles(sizeLabor, themeLabor);
    const {} = smartStyles;
    const styles = createStyles(sizeLabor, themeLabor)
    const {ms, designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX;
    const [btcData, setBtcData] = useState([
        {x: new Date('1990-01-01'), y: 5}
    ]);
    const {currentPrice} = useSelector((rootState: RootState) => rootState.demoCryptoCurrencyState)
    const [type, setType] = useState('BTC')
    const [dateRange, setDateRange] = useState('1d')
    const getHistoricalPrices = async (type: string, dateRange: string) => {
        let start = '';
        let end = new Date().toISOString();
        switch (dateRange) {
            case '1d':
                start = addDays(new Date(), -1).toISOString()
                break;
            case '1w':
                start = addDays(new Date(), -7).toISOString()
                break;
            case '1m':
                start = addDays(new Date(), -30).toISOString()
                break;
            case '1y':
                start = addDays(new Date(), -365).toISOString()
                break;
            default:
                start = addDays(new Date(), -1).toISOString()
                break;
        }
        source = axios.CancelToken.source();
        try {
            const res = await nomicsAPI.get('v1/currencies/sparkline', {
                cancelToken: source.token,
                params: {
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
        } catch (e) {
            dispatch(collectBLResult(blError(e.message, false)))
        }
    }
    useEffect(() => {
        try {
            dispatch(getCurrentPrice())
        } catch (e) {
            dispatch(sysError(e))
        }
        getHistoricalPrices(type, dateRange).then();
        return () => {
            source.cancel(t('sys.canceledRequest'))
        }
    }, [])

    return (
        <ScrollView>
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
                    theme={victory}
                    padding={{top: wp(40), left: wp(4), bottom: wp(30), right: wp(20)}}
                    // animate={{
                    //     duration: 1000,
                    // }}
                    domainPadding={{y: wp(15)}}
                    containerComponent={
                        <VictoryVoronoiContainer
                            voronoiDimension="x"
                            labels={({datum}: { datum: { x: Date, y: number } }) => `x:${datum.x.toLocaleDateString()} \n y: ${datum.y}`}
                            labelComponent={
                                <VictoryTooltip
                                    constrainToVisibleArea
                                    cornerRadius={ms.br.s}
                                    // flyoutStyle={{
                                    //     fill: colors.surface
                                    // }}
                                />
                            }
                        />
                    }
                    scale={{x: 'time'}}
                >
                    <VictoryAxis crossAxis style={{
                        // axis: {stroke: colors.accent},
                        // tickLabels: {padding: wp(2), fill: colors.primary}
                    }}/>
                    <VictoryAxis dependentAxis tickFormat={() => ``}
                                 style={{
                                     // axis: {stroke: colors.accent},
                                 }}/>
                    <VictoryLine
                        interpolation="natural"
                        style={{
                            // data: {stroke: colors.secondary},
                            // parent: {border: `1px solid ${colors.border}`}
                        }}
                        data={btcData}
                    />
                </VictoryChart>
            </View>
        </ScrollView>
    );
}

export default CryptoCurrencyHomeScreen;

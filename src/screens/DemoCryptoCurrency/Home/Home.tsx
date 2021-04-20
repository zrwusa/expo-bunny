import * as React from "react";
import {useEffect, useState} from "react";
import {Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoCryptoCurrencyStackParam, RootStackParam, RootState} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {VictoryAxis, VictoryChart, VictoryLine, VictoryTooltip, VictoryVoronoiContainer} from "../../../components/Victory/Victory";
import nomicsAPI from "../../../helpers/nomics-api";
import {getStyles} from "./styles";
import {addDays, getSharedStyles} from "../../../utils";
import {useDispatch, useSelector} from "react-redux";
import axios, {CancelTokenSource} from "axios";
import {collectBLResult, getCurrentPrice, sysError} from "../../../store/actions";
import {blError} from "../../../helpers";
import {ScrollView} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {Tab} from "../../../components";

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
    const {Screen, Box} = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const {} = sharedStyles;
    const styles = getStyles(sizeLabor, themeLabor)
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
                <Tab items={types}
                     placeholder={type}
                     onChange={async (item) => {
                         setType(item)
                         await getHistoricalPrices(item, dateRange);
                     }}/>
                <Tab items={dateRanges}
                     placeholder={dateRange}
                     onChange={async (item) => {
                         setDateRange(item)
                         await getHistoricalPrices(type, item);
                     }}/>
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
                        grid: {stroke: 'none'},
                        // tickLabels: {padding: wp(2), fill: colors.primary}
                    }}/>
                    <VictoryAxis dependentAxis tickFormat={() => ``}
                                 style={{
                                     grid: {stroke: 'none'},
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

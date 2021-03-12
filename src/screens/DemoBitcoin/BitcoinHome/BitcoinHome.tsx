import * as React from "react";
import {useState} from "react";
import {View} from "react-native";
import {RouteProp} from "@react-navigation/native";
import {DemoBitcoinStackParam} from "../../../types";
import {BottomTabNavigationProp} from "react-navigation-bottom-tabs-no-warnings";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../../providers/i18n-labor";
import {getContainerStyles} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {SlideAreaChart, SlideBarChart} from 'react-native-slide-charts';
import * as Haptics from 'expo-haptics'


type BitcoinHomeRouteProp = RouteProp<DemoBitcoinStackParam, 'BitcoinHome'>;
type BitcoinHomeNavigationProp = BottomTabNavigationProp<DemoBitcoinStackParam, 'BitcoinHome'>;

export interface BitcoinHomeProps {
    route: BitcoinHomeRouteProp,
    navigation: BitcoinHomeNavigationProp
}


function BitcoinHomeScreen({route, navigation}: BitcoinHomeProps) {
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.BitcoinHome');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {wp} = sizeLabor.responsive.iphoneX;

    const [xxx, setXxx] = useState({
        axisWidth: 16,
        axisHeight: 16,
        data: [
            {x: 1, y: 5},
            {x: 2, y: 6},
            {x: 3, y: 11},
            {x: 4, y: 50},
            {x: 5, y: 3},
            {x: 6, y: 34},
            {x: 7, y: 5},
            {x: 8, y: 6},
            {x: 9, y: 11},
            {x: 10, y: 50},
            {x: 11, y: 3},
            {x: 12, y: 34},
            {x: 27, y: 11},
        ],
    });
    const {data} = xxx;
    const markerSpacing = data.length > 20 ? 2 : data.length > 10 ? 1 : 0
    return (
        <View style={containerStyles.Screen}>
            <View style={containerStyles.Card}>
                {/*<Text>{st(`title`)}</Text>*/}
                <SlideAreaChart
                    scrollable
                    style={{marginTop: wp(2)}}
                    width={wp(340)}
                    shouldCancelWhenOutside={false}
                    data={data}
                    axisWidth={xxx.axisWidth}
                    axisHeight={xxx.axisHeight}
                    paddingBottom={wp(2)}
                    yAxisProps={{
                        verticalLineWidth: 1,
                        axisLabel: 'Y Units',
                        // axisLabelAlignment: 'middle',
                        rotateAxisLabel: true,
                        numberOfTicks: 2,
                        hideMarkers: true,
                    }}
                    xAxisProps={{
                        axisLabel: 'X Units',
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
                    style={{marginTop: 64}}
                    shouldCancelWhenOutside={false}
                    alwaysShowIndicator={false}
                    data={data}
                    width={wp(340)}
                    axisWidth={32}
                    axisHeight={16}
                    yAxisProps={{
                        numberOfTicks: 4,
                        axisLabel: 'Units',
                        // axisLabelAlignment: 'aboveTicks',
                    }}
                    xAxisProps={{
                        axisMarkerLabels: data.map(item => item.x.toString()),
                        specialEndMarker: 'Last',
                        specialStartMarker: 'First',
                        adjustForSpecialMarkers: true,
                        markerSpacing,
                        minimumSpacing: markerSpacing,
                    }}
                    toolTipProps={{
                        lockTriangleCenter: true,
                        toolTipTextRenderers: [
                            ({selectedBarNumber}) => ({
                                text: xxx.data[selectedBarNumber].y.toString(),
                            }),
                            () => ({text: 'Value'}),
                        ],
                    }}
                />
            </View>
        </View>
    );
}

export default BitcoinHomeScreen;

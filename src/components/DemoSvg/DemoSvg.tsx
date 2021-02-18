import React from "react";
import {View} from "../base-ui"
import {getStyles} from "./styles";
import Svg, {Circle, Rect, SvgUri} from "react-native-svg";
import SVGR from "./SVGR"
// import SvgLocalFileXML from "./SvgLocalFileXML"
import {Platform} from "react-native";
import {useTheme} from "../../styles/theme";
import {useSizer} from "../../styles/sizer";

export const DemoSvg: React.FC = () => {
    const theme = useTheme()
    const sizer = useSizer()
    const styles = getStyles(sizer,theme)
    return (
        <View style={styles.container}>
            <Svg height="100" width="100" viewBox="0 0 100 100">
                <Circle cx="50" cy="50" r="45" stroke="blue" strokeWidth="2.5" fill="green"/>
                <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="yellow"/>
            </Svg>
            {Platform.OS === 'web'
                ? <Svg height="100" width="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="0" fill="none" stroke="#e90c59">
                        <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1"
                                 calcMode="spline" begin="-0.5s"/>
                        <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1"
                                 calcMode="spline" begin="-0.5s"/>
                    </circle>
                    <circle cx="50" cy="50" r="0" fill="none" stroke="#46dff0">
                        <animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1"
                                 calcMode="spline"/>
                        <animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1"
                                 calcMode="spline"/>
                    </circle>
                </Svg>
                : <SvgUri
                    width="100"
                    height="100"
                    uri="http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg"
                />}
            <SVGR height="100" width="100"/>
            {/*<SvgLocalFileXML/>*/}
        </View>
    )
}

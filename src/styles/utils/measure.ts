import {useState, useEffect} from 'react';
import {Dimensions, ScaledSize} from "react-native";
import {Measure, Responsive} from "../../types/styles";
import {useResponsive} from "../responsive";
import _ from "lodash"
import BunnyConstants from "../../utils/constants";

export const getMeasure = (responsive: Responsive): Measure => {
    const {wp} = responsive.iphoneX;

    const measureObj = {
        breakpoints: {
            smallPhone: 0,
            phone: 321,
            tablet: 768,
        },
        spacings: {
            xxs: wp(1),
            xs: wp(2),
            s: wp(4),
            m: wp(8),
            l: wp(16),
            xl: wp(32),
            xxl: wp(64),
        },
        sizes: {
            s1: '8.33333%',
            s2: '16.6666%',
            s3: '24.9999%',
            s4: '33.3333%',
            s5: '41.6666%',
            s6: '49.9999%',
            s7: '58.3333%',
            s8: '58.3333%',
            s9: '74.9999%',
            s10: '83.3333%',
            s11: '91.6666%',
            s12: '100%',
        },
        fontSizes: {
            xxs: wp(10),
            xs: wp(12),
            s: wp(14),
            m: wp(16),
            l: wp(18),
            xl: wp(24),
            xxl: wp(32),
        },
        borderRadius: {
            xxs: wp(2),
            xs: wp(4),
            s: wp(8),
            m: wp(16),
            l: wp(32),
            xl: wp(64),
            xxl: wp(128),
        },
    };
    return {
        ...measureObj,
        bp: measureObj.breakpoints,
        sz: measureObj.sizes,
        sp: measureObj.spacings,
        fs: measureObj.fontSizes,
        br: measureObj.borderRadius
    }
}


export const useMeasure = () => {
    const responsive = useResponsive();
    const [measure, setMeasure] = useState(getMeasure(responsive));
    useEffect(() => {
        const onDimensionsChange = _.throttle(({window}: { window: ScaledSize }) => {
            setMeasure(getMeasure(responsive))
        }, BunnyConstants.throttleWait);
        Dimensions.addEventListener('change', onDimensionsChange);
        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    });
    return measure;
}

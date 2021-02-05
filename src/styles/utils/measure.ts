import responsiveFromUE, {getResponsive} from "./responsive";
import {useState, useEffect} from 'react';
import {Dimensions, ScaledSize} from "react-native";

const {wp, hp} = responsiveFromUE.iphoneX;
export type Size = {
    xxs: number,
    xs: number,
    s: number,
    m: number,
    l: number,
    xl: number,
    xxl: number,
}
export type Measure = {
    breakpoints: {
        smallPhone: number,
        phone: number,
        tablet: number,
    },
    spacings: Size,
    sizes: {
        s1: string,
        s2: string,
        s3: string,
        s4: string,
        s5: string,
        s6: string,
        s7: string,
        s8: string,
        s9: string,
        s10: string,
        s11: string,
        s12: string,
    },
    fontSizes: Size,
    borderRadius: Size,
    bp: {
        smallPhone: number,
        phone: number,
        tablet: number,
    },
    sz: {
        s1: string,
        s2: string,
        s3: string,
        s4: string,
        s5: string,
        s6: string,
        s7: string,
        s8: string,
        s9: string,
        s10: string,
        s11: string,
        s12: string,
    },
    sp: Size,
    fs: Size,
    br: Size
}
const _getMeasure = (): Measure => {
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

const _getMS = () => {
    const measure = _getMeasure();
    return {
        bp: measure.breakpoints,
        sz: measure.sizes,
        sp: measure.spacings,
        fs: measure.fontSizes,
        br: measure.borderRadius
    }
}
export const measure = _getMeasure();
export const ms = _getMS();
export const getMS = _getMS;
export const getMeasure = _getMeasure;



export const useMeasure = () => {
    const [measure, setMeasure] = useState(_getMeasure());
    useEffect(() => {
        const onDimensionsChange = () => {
            setMeasure(_getMeasure())
        };
        Dimensions.addEventListener('change', onDimensionsChange);
        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    });
    return measure;
}

import {heightPercentageToDP as hp2dp, widthPercentageToDP as wp2dp} from "./responsiveScreen";
import bunnyConfig from "../../config.json";
import {Dimension, JSONSerializable, Measure, Responsive} from "../../types";

const getSizeLabor = () => {
    let responsive: JSONSerializable = {}
    Object.entries(bunnyConfig.UE.dimensions).forEach((dimension) => {
        responsive[dimension[0]] = {
            wp: (width: number) => {
                return wp2dp((width / dimension[1]['width']));
            }, hp: (height: number) => {
                return hp2dp((height / dimension[1]['height']));
            }
        } as unknown as Dimension;
    })
    const _responsive = responsive as Responsive;
    const {wp} = _responsive.iphoneX;

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
        lineHeight: {
            xxs: wp(16),
            xs: wp(18),
            s: wp(20),
            m: wp(22),
            l: wp(24),
            xl: wp(30),
            xxl: wp(38),
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
    const _measure = {
        ...measureObj,
        bp: measureObj.breakpoints,
        sz: measureObj.sizes,
        sp: measureObj.spacings,
        fs: measureObj.fontSizes,
        lh: measureObj.lineHeight,
        br: measureObj.borderRadius
    } as Measure;

    return {
        responsive: _responsive,
        measure: _measure,
        ms: _measure,
    }
}


export default getSizeLabor

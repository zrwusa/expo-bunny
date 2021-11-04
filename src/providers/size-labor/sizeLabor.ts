import {heightPercentageToDP as hp2dp, widthPercentageToDP as wp2dp} from './responsiveScreen';
import bunnyConfig from '../../config';
import {DesignsBasedOn, DimensionKeys, Measure} from '../../types';

export const getSizeLabor = () => {
    const defaultDimensionFun = {
        wp: (width: number, shouldRound?: boolean) => {
            return wp2dp((width / 375), shouldRound);
        },
        hp: (height: number, shouldRound?: boolean) => {
            return hp2dp((height / 812), shouldRound);
        }
    };
    let designsBasedOn: DesignsBasedOn = {
        bunnyUI: defaultDimensionFun,
        iphoneX: defaultDimensionFun,
        iPad: defaultDimensionFun,
        pixel2XL: defaultDimensionFun,
        pcBrowser: defaultDimensionFun,
        custom1: defaultDimensionFun,
        custom2: defaultDimensionFun,
        custom3: defaultDimensionFun
    };
    const dimensions = bunnyConfig.UE.dimensions;
    // let i: DimensionKeys
    // for (i in dimensions) {
    //     designsBasedOn[i] = {
    //         wp: (width: number, shouldRound?: boolean) => {
    //             return wp2dp((width / dimensions[i]['width']), shouldRound);
    //         },
    //         hp: (height: number, shouldRound?: boolean) => {
    //             return hp2dp((height / dimensions[i]['height']), shouldRound);
    //         }
    //     };
    // }
    const keys = Object.keys(dimensions) as Array<DimensionKeys>;
    keys.forEach(function (key) {
        designsBasedOn[key] = {
            wp: (width: number, shouldRound?: boolean) => {
                return wp2dp((width / dimensions[key]['width']), shouldRound);
            },
            hp: (height: number, shouldRound?: boolean) => {
                return hp2dp((height / dimensions[key]['height']), shouldRound);
            }
        };
    });
    const _designsBasedOn = designsBasedOn;
    const {wp} = _designsBasedOn.iphoneX;
    // todo need typescript to constrain types
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
        percentageSizes: {
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
        zIndex: {
            xxs: 10,
            xs: 100,
            s: 1000,
            m: 10000,
            l: 100000,
            xl: 1000000,
            xxl: 10000000
        },
    };
    const _measure = {
        ...measureObj,
        bp: measureObj.breakpoints,
        ps: measureObj.percentageSizes,
        sp: measureObj.spacings,
        fs: measureObj.fontSizes,
        lh: measureObj.lineHeight,
        br: measureObj.borderRadius,
        zi: measureObj.zIndex
    } as Measure;

    return {
        designsBasedOn: _designsBasedOn,
        dbo: _designsBasedOn,
        measure: _measure,
        ms: _measure,
    };
};

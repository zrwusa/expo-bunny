import {responsiveFromUE} from "./responsive";

const {wp, hp} = responsiveFromUE.iphoneX;

export const measure = {
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
}

export const ms = {
    bp: measure.breakpoints,
    sz: measure.sizes,
    sp: measure.spacings,
    fs: measure.fontSizes,
    br: measure.borderRadius
};

import {fontsWarehouse} from "./fonts";
import {JSONSerializable, Themes, ThemeWarehouse} from "../../types";
import color from "color";
import {EThemes} from "../../constants";
import {isLeafParent, isSameStructure, pl, reverseColor} from "../../utils";
import getSizeLabor from "../size-labor/sizeLabor";

export const getThemeWareHouse = () => {
    const {wp} = getSizeLabor().designsBasedOn.iphoneX

    const victoryCommon = {
        width: {
            light: wp(350),
            dark: wp(350),
            gradient: wp(350),
        },
        height: {
            light: wp(350),
            dark: wp(350),
            gradient: wp(350),
        },
        padding: {
            light: wp(50),
            dark: wp(50),
            gradient: wp(50),
        }
    }

    const colorScaleVC = [
        {light: pl.deepOrange600, dark: reverseColor(pl.deepOrange600), gradient: reverseColor(pl.deepOrange600)},
        {light: pl.yellow200, dark: reverseColor(pl.yellow200), gradient: reverseColor(pl.yellow200)},
        {light: pl.lime300, dark: reverseColor(pl.lime300), gradient: reverseColor(pl.lime300)},
        {light: pl.lightGreen500, dark: reverseColor(pl.lightGreen500), gradient: reverseColor(pl.lightGreen500)},
        {light: pl.teal700, dark: reverseColor(pl.teal700), gradient: reverseColor(pl.teal700)},
        {light: pl.cyan900, dark: reverseColor(pl.cyan900), gradient: reverseColor(pl.cyan900)}
    ]

    const fontFamilyVC = {
        light: fontsWarehouse.regular.fontFamily.light,
        dark: fontsWarehouse.regular.fontFamily.dark,
        gradient: fontsWarehouse.regular.fontFamily.dark,
    }

    const fontSize12VC = {
        light: wp(12),
        dark: wp(12),
        gradient: wp(12),
    }

    const fillOrStrokeTransparentVC = {
        light: 'transparent',
        dark: 'transparent',
        gradient: 'transparent',
    }

    const axisStroke = {
        light: pl.blueGrey300,
        dark: pl.orange800,
        gradient: pl.transparent,
    }

    const fillOrStrokeBlueGrey700VC = {
        light: pl.blueGrey700,
        dark: pl.orange800,
        gradient: pl.tealA500,
    }

    const tickLabelsFill = {
        light: pl.blueGrey700,
        dark: pl.white,
        gradient: pl.white,
    }

    const testFillOrStrokeRed = {
        light: pl.red900,
        dark: pl.red900,
        gradient: pl.red900,
    }

    const NavigateBlueGrey700VC = {
        light: pl.blueGrey700,
        dark: pl.brown220,
        gradient: pl.brown220,
    }

    const letterSpacingNormalVC = {
        light: 'normal',
        dark: 'normal',
        gradient: 'normal',
    }

    const strokeWidth0VC = {
        light: 0,
        dark: 0,
        gradient: 0,
    }

    const strokeWidth1VC = {
        light: wp(1),
        dark: wp(1),
        gradient: wp(1),
    }

    const strokeWidth2VC = {
        light: wp(2),
        dark: wp(2),
        gradient: wp(2),
    }

    const fillNoneVC = {
        light: 'none',
        dark: 'none',
        gradient: 'none',
    }

    const pointerEventsNoneVC = {
        light: 'none',
        dark: 'none',
        gradient: 'none',
    }

    const strokeLinecapRoundVC = {
        light: 'round',
        dark: 'round',
        gradient: 'round',
    }

    const strokeLinejoinRoundVC = {
        light: 'round',
        dark: 'round',
        gradient: 'round',
    }

    const padding8VC = {
        light: wp(8),
        dark: wp(8),
        gradient: wp(8),
    }

    const borderWidth8VC = {
        light: wp(8),
        dark: wp(8),
        gradient: wp(8),
    }

    const opacity1VC = {
        light: 1,
        dark: 1,
        gradient: 1,
    }

    const padding3VC = {
        light: wp(3),
        dark: wp(3),
        gradient: wp(3),
    }

    const padding5VC = {
        light: wp(5),
        dark: wp(5),
        gradient: wp(5),
    }

    const size5VC = {
        light: wp(5),
        dark: wp(5),
        gradient: wp(5),
    }

    const flyoutPadding5VC = {
        light: wp(5),
        dark: wp(5),
        gradient: wp(5),
    }

    const cornerRadius5VC = {
        light: wp(5),
        dark: wp(5),
        gradient: wp(5),
    }

    const strokeGrey900VC = {
        light: pl.grey900,
        dark: pl.grey320,
        gradient: pl.grey320,
    }

    const axisGridStroke = {
        light: pl.blueGrey50,
        dark: pl.transparent,
        gradient: pl.transparent,
    }

    const themeWarehouse: ThemeWarehouse = {
        dark: {
            light: false,
            dark: true,
            gradient: true
        },
        roundness: {
            light: 4,
            dark: 4,
            gradient: 4
        },
        mode: {
            light: 'exact',
            dark: 'adaptive',
            gradient: 'exact'
        },
        colors: {
            // ---start main
            primary: {
                light: pl.teal400,
                dark: pl.orange800,
                gradient: pl.tealA500
            },
            secondary: {
                light: pl.teal300,
                dark: pl.orange700,
                gradient: pl.lightBlue630,
            },
            border: {
                light: pl.grey350,
                dark: pl.grey850,
                gradient: pl.blueIndigo900
            },
            borderSecondary: {
                light: pl.grey600,
                dark: pl.amber500,
                gradient: pl.amber500
            },
            divider: {
                light: pl.grey390,
                dark: pl.blueGrey320,
                gradient: pl.blueGrey320
            },
            // ---end main


            // ---start text
            text: {
                light: pl.black,
                dark: pl.white,
                gradient: pl.white
            },
            textSecondary: {
                light: pl.grey800,
                dark: pl.grey600,
                gradient: pl.grey600
            },
            btnText: {
                light: pl.white,
                dark: pl.orange50,
                gradient: pl.blueIndigoA700,
            },
            btnTextSecondary: {
                light: pl.red100,
                dark: pl.indigo100,
                gradient: pl.indigo100
            },
            title: {
                light: pl.grey800,
                dark: pl.white,
                gradient: pl.white
            },
            titleSecondary: {
                light: pl.grey700,
                dark: pl.grey300,
                gradient: pl.grey300
            },
            caption: {
                light: pl.grey900,
                dark: pl.grey500,
                gradient: pl.grey500
            },
            captionSecondary: {
                light: pl.grey800,
                dark: pl.grey600,
                gradient: pl.grey600
            },
            paragraph: {
                light: pl.grey900,
                dark: pl.grey200,
                gradient: pl.grey200
            },
            paragraphSecondary: {
                light: pl.grey700,
                dark: pl.grey400,
                gradient: pl.grey400
            },
            // ---end text


            // ---start background
            background: {
                light: pl.grey100,
                dark: pl.black900,
                gradient: pl.blueIndigoA400
            },
            backgroundSecondary: {
                light: pl.grey200,
                dark: pl.grey800,
                gradient: pl.blueIndigoA700
            },
            backgroundTertiary: {
                light: pl.white,
                dark: pl.black,
                gradient: pl.blueIndigoA100
            },
            btnActive: {
                light: pl.lightBlue100,
                dark: pl.lightBlue100,
                gradient: pl.lightBlue100
            },
            btnActiveSecondary: {
                light: pl.lightBlue600,
                dark: pl.deepPurple700,
                gradient: pl.deepPurple700
            },
            btnBackground: {
                light: pl.teal400,
                dark: pl.orange800,
                gradient: pl.tealA500
            },
            btnBackgroundSecondary: {
                light: pl.teal300,
                dark: pl.orange700,
                gradient: pl.lightBlue630,
            },
            card: {
                light: pl.white,
                dark: pl.black900,
                gradient: pl.blueIndigoA700
            },
            surface: {
                light: pl.white,
                dark: pl.black900,
                gradient: pl.blueGrey870
            },
            surfaceSecondary: {
                light: pl.grey100,
                dark: pl.grey900,
                gradient: pl.grey900
            },
            paper: {
                light: pl.yellow50,
                dark: pl.amber50,
                gradient: pl.amber50
            },
            paperSecondary: {
                light: pl.lightGreen50,
                dark: pl.green50,
                gradient: pl.green50,
            },
            // ---end background


            // ---start unknown
            onBackground: {
                light: pl.black,
                dark: pl.white,
                gradient: pl.white
            },
            onBackgroundSecondary: {
                light: pl.black,
                dark: pl.white,
                gradient: pl.white
            },
            onSurface: {
                light: pl.black,
                dark: pl.white,
                gradient: pl.white
            },
            onSurfaceSecondary: {
                light: pl.black,
                dark: pl.white,
                gradient: pl.white
            },
            accent: {
                light: pl.purple500,
                dark: pl.blue600,
                gradient: pl.blue600
            },
            accentSecondary: {
                light: pl.blue300,
                dark: pl.teal600,
                gradient: pl.teal600
            },
            // ---en unknown


            // ---start tip
            success: {
                light: pl.lightGreenA720,
                dark: pl.green610,
                gradient: pl.green610
            },
            error: {
                light: pl.redA420,
                dark: pl.red910,
                gradient: pl.red910
            },
            errorSecondary: {
                light: pl.red500,
                dark: pl.pink200,
                gradient: pl.pink200
            },
            warning: {
                light: pl.yellow780,
                dark: pl.yellow720,
                gradient: pl.yellow720
            },
            warningSecondary: {
                light: pl.yellow600,
                dark: pl.yellow800,
                gradient: pl.yellow800
            },
            notification: {
                light: pl.pinkA400,
                dark: pl.pinkA100,
                gradient: pl.pinkA100,
            },
            notificationSecondary: {
                light: pl.pinkA200,
                dark: pl.pinkA400,
                gradient: pl.pinkA400,
            },
            info: {
                light: pl.blue300,
                dark: pl.blue500,
                gradient: pl.blue500,
            },
            infoSecondary: {
                light: pl.blue200,
                dark: pl.blue400,
                gradient: pl.blue400,
            },
            // --- end tip


            // --- start functional
            disabled: {
                light: color(pl.black).alpha(0.26).rgb().string(),
                dark: color(pl.white).alpha(0.38).rgb().string(),
                gradient: color(pl.white).alpha(0.38).rgb().string(),
            },
            placeholder: {
                light: color(pl.black).alpha(0.54).rgb().string(),
                dark: color(pl.white).alpha(0.54).rgb().string(),
                gradient: color(pl.white).alpha(0.54).rgb().string(),
            },
            placeholderSecondary: {
                light: color(pl.black).alpha(0.32).rgb().string(),
                dark: color(pl.white).alpha(0.32).rgb().string(),
                gradient: color(pl.white).alpha(0.32).rgb().string(),
            },
            backdrop: {
                light: color(pl.black).alpha(0.5).rgb().string(),
                dark: color(pl.black).alpha(0.5).rgb().string(),
                gradient: color(pl.black).alpha(0.5).rgb().string(),
            },
            backdropSecondary: {
                light: color(pl.black).alpha(0.5).rgb().string(),
                dark: color(pl.black).alpha(0.5).rgb().string(),
                gradient: color(pl.black).alpha(0.5).rgb().string(),
            },
            transparent: {
                light: pl.transparent,
                dark: pl.transparent,
                gradient: pl.transparent,
            },
            // --- end functional
        },
        fonts: {
            ...fontsWarehouse,
        },
        animation: {
            scale: {
                light: 1.0,
                dark: 1.0,
                gradient: 1.0
            },
        },
        typography: {
            header: {
                fontFamily: fontFamilyVC,
                fontWeight: {
                    light: 'bold',
                    dark: 'bold',
                    gradient: 'bold'
                },
            },
            body: {
                fontFamily: fontFamilyVC,
            }
        },
        victory: {
            area: {
                style: {
                    data: {
                        fill: {
                            light: pl.grey900,
                            dark: pl.grey320,
                            gradient: pl.grey320
                        }
                    },
                    labels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding8VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    }
                },
                ...victoryCommon
            },
            axis: {
                style: {
                    axis: {
                        fill: fillOrStrokeTransparentVC,
                        stroke: axisStroke,
                        strokeWidth: strokeWidth2VC,
                        strokeLinecap: strokeLinecapRoundVC,
                        strokeLinejoin: strokeLinejoinRoundVC
                    },
                    axisLabel: {
                        textAnchor: {
                            light: 'middle',
                            dark: 'middle',
                            gradient: 'middle',
                        },
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding8VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    },
                    grid: {
                        fill: fillNoneVC,
                        stroke: axisGridStroke,
                        strokeDasharray: {
                            light: '10, 5',
                            dark: '10, 5',
                            gradient: '10, 5',
                        },
                        strokeLinecap: strokeLinecapRoundVC,
                        strokeLinejoin: strokeLinejoinRoundVC,
                        pointerEvents: {
                            light: 'painted',
                            dark: 'painted',
                            gradient: 'painted',
                        }
                    },
                    ticks: {
                        fill: fillOrStrokeTransparentVC,
                        size: size5VC,
                        stroke: {
                            light: pl.blueGrey300,
                            dark: pl.black890,
                            gradient: pl.black890,
                        },
                        strokeWidth: strokeWidth1VC,
                        strokeLinecap: strokeLinecapRoundVC,
                        strokeLinejoin: strokeLinejoinRoundVC
                    },
                    tickLabels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding8VC,
                        fill: tickLabelsFill,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    }
                },
                ...victoryCommon
            },
            polarDependentAxis: {
                style: {
                    ticks: {
                        fill: fillOrStrokeTransparentVC,
                        size: {
                            light: wp(1),
                            dark: wp(1),
                            gradient: wp(1),
                        },
                        stroke: fillOrStrokeTransparentVC
                    }
                }
            },
            bar: {
                style: {
                    data: {
                        fill: fillOrStrokeBlueGrey700VC,
                        padding: padding8VC,
                        strokeWidth: strokeWidth0VC
                    },
                    labels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding8VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    }
                },
                ...victoryCommon
            },
            boxplot: {
                style: {
                    max: {
                        padding: padding8VC,
                        stroke: fillOrStrokeBlueGrey700VC,
                        strokeWidth: strokeWidth1VC
                    },
                    maxLabels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding3VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    },
                    median: {
                        padding: padding8VC,
                        stroke: fillOrStrokeBlueGrey700VC,
                        strokeWidth: strokeWidth1VC
                    },
                    medianLabels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding3VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    },
                    min: {
                        padding: padding8VC,
                        stroke: fillOrStrokeBlueGrey700VC,
                        strokeWidth: strokeWidth1VC
                    },
                    minLabels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding3VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    },
                    q1: {
                        padding: padding8VC,
                        fill: fillOrStrokeBlueGrey700VC
                    },
                    q1Labels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding3VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    },
                    q3: {
                        padding: padding8VC,
                        fill: fillOrStrokeBlueGrey700VC
                    },
                    q3Labels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding3VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    }
                },
                boxWidth: {
                    light: wp(20),
                    dark: wp(20),
                    gradient: wp(20),
                },
                ...victoryCommon
            },
            candlestick: {
                style: {
                    data: {
                        stroke: fillOrStrokeBlueGrey700VC
                    },
                    labels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding5VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    }
                },
                candleColors: {
                    positive: {
                        light: pl.white,
                        dark: pl.black,
                        gradient: pl.black,
                    },
                    negative: NavigateBlueGrey700VC
                },
                ...victoryCommon
            },
            chart: {
                ...victoryCommon
            },
            errorbar: {
                borderWidth: borderWidth8VC,
                style: {
                    data: {
                        fill: fillOrStrokeTransparentVC,
                        opacity: opacity1VC,
                        stroke: fillOrStrokeBlueGrey700VC,
                        strokeWidth: strokeWidth2VC
                    },
                    labels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding8VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    }
                },
                ...victoryCommon
            },
            group: {
                // Todo different structure
                // colorScaleVC: {"0": "#f4511e", "1": "#fff59d", "2": "#dce775", "3": "#8bc34a", "4": "#00796b", "5": "#006064"},
                colorScale: colorScaleVC,
                ...victoryCommon
            },
            // histogram: {
            //     style: {
            //         data: {
            //             fill: {
            //                 light: pl.blueGrey700,
            //                 dark: pl.brown220
            //             },
            //             stroke: {
            //                 light: pl.grey900,
            //                 dark: pl.grey320
            //             },
            //             strokeWidth: {
            //                 light: 2,
            //                 dark: 2
            //             }
            //         },
            //         labels: {
            //             fontFamily: {
            //                 light: fontsWarehouse.regular.fontFamily.light,
            //                 dark: fontsWarehouse.regular.fontFamily.dark,
            //             },
            //             fontSize: {
            //                 light: 12,
            //                 dark: 12
            //             },
            //             letterSpacing: {
            //                 light: 'normal',
            //                 dark: 'normal'
            //             },
            //             padding: {
            //                 light: 8,
            //                 dark: 8
            //             },
            //             fill: {
            //                 light: pl.blueGrey700,
            //                 dark: pl.brown220
            //             },
            //             stroke: {
            //                 light: 'transparent',
            //                 dark: 'transparent'
            //             },
            //             strokeWidth: {
            //                 light: 0,
            //                 dark: 0
            //             }
            //         }
            //     },
            //     width: {
            //         light: 350,
            //         dark: 350
            //     },
            //     height: {
            //         light: 350,
            //         dark: 350
            //     },
            //     padding: {
            //         light: 50,
            //         dark: 50
            //     }
            // },
            legend: {
                colorScale: colorScaleVC,
                gutter: {
                    light: wp(10),
                    dark: wp(10),
                    gradient: wp(10),
                },
                orientation: {
                    light: 'vertical',
                    dark: 'vertical',
                    gradient: 'vertical',
                },
                titleOrientation: {
                    light: 'top',
                    dark: 'top',
                    gradient: 'top',
                },
                style: {
                    data: {
                        type: {
                            light: 'circle',
                            dark: 'circle',
                            gradient: 'circle',
                        }
                    },
                    labels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding8VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    },
                    title: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding5VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    }
                }
            },
            line: {
                style: {
                    data: {
                        fill: fillOrStrokeTransparentVC,
                        opacity: opacity1VC,
                        stroke: fillOrStrokeBlueGrey700VC,
                        strokeWidth: strokeWidth2VC
                    },
                    labels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding8VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    }
                },
                ...victoryCommon
            },
            pie: {
                colorScale: colorScaleVC,
                style: {
                    data: {
                        padding: padding8VC,
                        stroke: {
                            light: pl.blueGrey50,
                            dark: pl.brown220,
                            gradient: pl.brown220,
                        },
                        strokeWidth: strokeWidth1VC
                    },
                    labels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: {
                            light: wp(20),
                            dark: wp(20),
                            gradient: wp(20),
                        },
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    }
                },
                ...victoryCommon
            },
            scatter: {
                style: {
                    data: {
                        fill: fillOrStrokeBlueGrey700VC,
                        opacity: opacity1VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    },
                    labels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding8VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    }
                },
                ...victoryCommon
            },
            stack: {
                colorScale: colorScaleVC,
                ...victoryCommon
            },
            tooltip: {
                style: {
                    fontFamily: fontFamilyVC,
                    fontSize: fontSize12VC,
                    letterSpacing: letterSpacingNormalVC,
                    padding: {
                        light: 0,
                        dark: 0,
                        gradient: 0,
                    },
                    fill: fillOrStrokeBlueGrey700VC,
                    stroke: fillOrStrokeTransparentVC,
                    strokeWidth: strokeWidth0VC,
                    pointerEvents: pointerEventsNoneVC
                },
                flyoutStyle: {
                    stroke: strokeGrey900VC,
                    strokeWidth: strokeWidth1VC,
                    fill: {
                        light: '#f0f0f0',
                        dark: '#0f0f0f',
                        gradient: '#0f0f0f',
                    },
                    pointerEvents: pointerEventsNoneVC
                },
                flyoutPadding: flyoutPadding5VC,
                cornerRadius: cornerRadius5VC,
                pointerLength: {
                    light: wp(10),
                    dark: wp(10),
                    gradient: wp(10),
                }
            },
            voronoi: {
                style: {
                    data: {
                        fill: fillOrStrokeTransparentVC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC
                    },
                    labels: {
                        fontFamily: fontFamilyVC,
                        fontSize: fontSize12VC,
                        letterSpacing: letterSpacingNormalVC,
                        padding: padding5VC,
                        fill: fillOrStrokeBlueGrey700VC,
                        stroke: fillOrStrokeTransparentVC,
                        strokeWidth: strokeWidth0VC,
                        pointerEvents: pointerEventsNoneVC
                    },
                    flyout: {
                        stroke: strokeGrey900VC,
                        strokeWidth: strokeWidth1VC,
                        fill: {
                            light: '#f0f0f0',
                            dark: '#0f0f0f',
                            gradient: '#0f0f0f',
                        },
                        pointerEvents: pointerEventsNoneVC
                    }
                },
                ...victoryCommon
            }
        }
    }
    return themeWarehouse;
}

const extractThemesFromWarehouse = (arg: unknown, themeName: string) => {
    let themeWarehouseNode = arg as JSONSerializable;
    let themeNode: JSONSerializable = {}
    const nodeKeys = Object.keys(themeWarehouseNode)
    nodeKeys.forEach(k => {
        if (!isSameStructure(themeWarehouseNode[k], EThemes)) {
            themeNode[k] = extractThemesFromWarehouse(themeWarehouseNode[k], themeName)
        } else if (isLeafParent(themeWarehouseNode[k])) {
            themeNode[k] = themeWarehouseNode[k][themeName]
        } else {
            themeNode[k] = {}
        }
    })
    return themeNode;
}

export const getThemes = () => {
    let themes: JSONSerializable = {};
    const themeNames = Object.values(EThemes)
    themeNames.forEach((name: string) => {
        themes[name] = extractThemesFromWarehouse(getThemeWareHouse(), name)
    })
    return themes as Themes;
}

export const themes = getThemes();

const firstTheme = themes.light;

export const defaultTheme = firstTheme;

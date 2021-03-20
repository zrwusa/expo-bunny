import {fontsWarehouse} from "./fonts";
import {JSONSerializable, Themes, ThemeWarehouse} from "../../types";
import color from "color";
import {EThemes} from "../../constants";
import {isLeafParent, isSameStructure, pl, reverseColor} from "../../utils";
import getSizeLabor from "../size-labor/sizeLabor";

export const getThemeWareHouse = () => {
    const {wp} = getSizeLabor().responsive.iphoneX
    const colorScale = [
        {light: pl.deepOrange600, dark: reverseColor(pl.deepOrange600)},
        {light: pl.yellow200, dark: reverseColor(pl.yellow200)},
        {light: pl.lime300, dark: reverseColor(pl.lime300)},
        {light: pl.lightGreen500, dark: reverseColor(pl.lightGreen500)},
        {light: pl.teal700, dark: reverseColor(pl.teal700)},
        {light: pl.cyan900, dark: reverseColor(pl.cyan900)}
    ]
    const victoryCommon = {
        width: {
            light: wp(350),
            dark:  wp(350),
        },
        height: {
            light: wp(350),
            dark:  wp(350),
        },
        padding: {
            light: wp(50),
            dark: wp(50)
        }
    }
    const themeWarehouse: ThemeWarehouse = {
        dark: {
            light: false,
            dark: true
        },
        roundness: {
            light: 4,
            dark: 4,
        },
        mode: {
            light: 'exact',
            dark: 'adaptive'
        },
        colors: {
            primary: {
                light: pl.teal400,
                dark: pl.orange800,
            },
            secondary: {
                light: pl.teal300,
                dark: pl.orange700
            },
            btnText: {
                light: pl.white,
                dark: pl.orange50,
            },
            btnActive: {
                light: pl.lightBlue100,
                dark: pl.lightBlue100
            },
            btnTextSecondary: {
                light: pl.red100,
                dark: pl.indigo100
            },
            btnActiveSecondary: {
                light: pl.lightBlue600,
                dark: pl.deepPurple700
            },
            title: {
                light: pl.grey800,
                dark: pl.white
            },
            titleSecondary: {
                light: pl.grey700,
                dark: pl.grey300
            },
            text: {
                light: pl.black,
                dark: pl.white
            },
            textSecondary: {
                light: pl.grey800,
                dark: pl.grey600
            },
            caption: {
                light: pl.grey900,
                dark: pl.grey500
            },
            captionSecondary: {
                light: pl.grey800,
                dark: pl.grey600
            },
            paragraph: {
                light: pl.grey900,
                dark: pl.grey200
            },
            paragraphSecondary: {
                light: pl.grey700,
                dark: pl.grey400
            },
            border: {
                light: pl.grey350,
                dark: pl.grey850
            },
            borderSecondary: {
                light: pl.grey600,
                dark: pl.amber500
            },
            surface: {
                light: pl.white,
                dark: pl.black900
            },
            surfaceSecondary: {
                light: pl.grey100,
                dark: pl.grey900
            },
            background: {
                light: pl.grey100,
                dark: pl.black900
            },
            backgroundSecondary: {
                light: pl.grey200,
                dark: pl.grey800
            },
            accent: {
                light: pl.purple500,
                dark: pl.blue600
            },
            accentSecondary: {
                light: pl.blue300,
                dark: pl.teal600
            },
            success: {
                light: pl.lightGreenA720,
                dark: pl.green610
            },
            error: {
                light: pl.redA420,
                dark: pl.red910
            },
            errorSecondary: {
                light: pl.red500,
                dark: pl.pink200
            },
            warning: {
                light: pl.yellow780,
                dark: pl.yellow720
            },
            warningSecondary: {
                light: pl.yellow600,
                dark: pl.yellow800
            },
            notification: {
                light: pl.pinkA400,
                dark: pl.pinkA100,
            },
            notificationSecondary: {
                light: pl.pinkA200,
                dark: pl.pinkA400,
            },
            info: {
                light: pl.blue300,
                dark: pl.blue500,
            },
            infoSecondary: {
                light: pl.blue200,
                dark: pl.blue400,
            },
            onSurface: {
                light: pl.black,
                dark: pl.white
            },
            onSurfaceSecondary: {
                light: pl.black,
                dark: pl.white
            },
            onBackground: {
                light: pl.black,
                dark: pl.white
            },
            onBackgroundSecondary: {
                light: pl.black,
                dark: pl.white
            },
            disabled: {
                light: color(pl.black).alpha(0.26).rgb().string(),
                dark: color(pl.white).alpha(0.38).rgb().string(),
            },
            placeholder: {
                light: color(pl.black).alpha(0.54).rgb().string(),
                dark: color(pl.white).alpha(0.54).rgb().string(),
            },
            backdrop: {
                light: color(pl.black).alpha(0.5).rgb().string(),
                dark: color(pl.black).alpha(0.5).rgb().string(),
            },
            backdropSecondary: {
                light: color(pl.black).alpha(0.5).rgb().string(),
                dark: color(pl.black).alpha(0.5).rgb().string(),
            },
            transparent: {
                light: pl.transparent,
                dark: pl.transparent,
            },
            paper: {
                light: pl.yellow50,
                dark: pl.amber50
            },
            paperSecondary: {
                light: pl.lightGreen50,
                dark: pl.green50
            },
            card: {
                light: pl.white,
                dark: pl.black900
            },
            divider: {
                light: pl.grey390,
                dark: pl.blueGrey320
            },
        },
        fonts: {
            ...fontsWarehouse,
        },
        animation: {
            scale: {
                light: 1.0,
                dark: 1.0
            },
        },
        typography: {
            header: {
                fontFamily: {
                    light: fontsWarehouse.regular.fontFamily.light,
                    dark: fontsWarehouse.regular.fontFamily.dark,
                },
                fontWeight: {
                    light: 'bold',
                    dark: 'bold'
                },
            },
            body: {
                fontFamily: {
                    light: fontsWarehouse.regular.fontFamily.light,
                    dark: fontsWarehouse.regular.fontFamily.dark,
                },
            }
        },
        victory: {
            area: {
                style: {
                    data: {
                        fill: {
                            light: pl.grey900,
                            dark: pl.grey320
                        }
                    },
                    labels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    }
                },
                ...victoryCommon
            },
            axis: {
                style: {
                    axis: {
                        fill: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        stroke: {
                            light: pl.blueGrey300,
                            dark: pl.brown620
                        },
                        strokeWidth: {
                            light: wp(2),
                            dark: wp(2)
                        },
                        strokeLinecap: {
                            light: 'round',
                            dark: 'round'
                        },
                        strokeLinejoin: {
                            light: 'round',
                            dark: 'round'
                        }
                    },
                    axisLabel: {
                        textAnchor: {
                            light: 'middle',
                            dark: 'middle'
                        },
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    },
                    grid: {
                        fill: {
                            light: 'none',
                            dark: 'none'
                        },
                        stroke: {
                            light: pl.blueGrey50,
                            dark: pl.black890
                        },
                        strokeDasharray: {
                            light: '10, 5',
                            dark: '10, 5'
                        },
                        strokeLinecap: {
                            light: 'round',
                            dark: 'round'
                        },
                        strokeLinejoin: {
                            light: 'round',
                            dark: 'round'
                        },
                        pointerEvents: {
                            light: 'painted',
                            dark: 'painted'
                        }
                    },
                    ticks: {
                        fill: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        size: {
                            light: wp(5),
                            dark: wp(5)
                        },
                        stroke: {
                            light: pl.blueGrey300,
                            dark: pl.black890

                        },
                        strokeWidth: {
                            light: wp(1),
                            dark: wp(1)
                        },
                        strokeLinecap: {
                            light: 'round',
                            dark: 'round'
                        },
                        strokeLinejoin: {
                            light: 'round',
                            dark: 'round'
                        }
                    },
                    tickLabels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    }
                },
                ...victoryCommon
            },
            polarDependentAxis: {
                style: {
                    ticks: {
                        fill: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        size: {
                            light: wp(1),
                            dark: wp(1)
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        }
                    }
                }
            },
            bar: {
                style: {
                    data: {
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    },
                    labels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    }
                },
                ...victoryCommon
            },
            boxplot: {
                style: {
                    max: {
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        }, stroke: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        }, strokeWidth: {
                            light: wp(1),
                            dark: wp(1)
                        }
                    },
                    maxLabels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(3),
                            dark: wp(3)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    },
                    median: {
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        }, stroke: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        }, strokeWidth: {
                            light: wp(1),
                            dark: wp(1)
                        }
                    },
                    medianLabels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(3),
                            dark: wp(3)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    },
                    min: {
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        }, stroke: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        }, strokeWidth: {
                            light: wp(1),
                            dark: wp(1)
                        }
                    },
                    minLabels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(3),
                            dark: wp(3)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    },
                    q1: {
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        }, fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        }
                    },
                    q1Labels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(3),
                            dark: wp(3)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    },
                    q3: {
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        }, fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        }
                    },
                    q3Labels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(3),
                            dark: wp(3)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    }
                },
                boxWidth: {
                    light: wp(20),
                    dark: wp(20)
                },
                ...victoryCommon
            },
            candlestick: {
                style: {
                    data: {
                        stroke: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        }
                    },
                    labels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(5),
                            dark: wp(5)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    }
                },
                candleColors: {
                    positive: {
                        light: pl.white,
                        dark: pl.black
                    },
                    negative: {
                        light: pl.blueGrey700,
                        dark: pl.brown220
                    }
                },
                ...victoryCommon
            },
            chart: {
                ...victoryCommon
            },
            errorbar: {
                borderWidth: {
                    light: wp(8),
                    dark: wp(8)
                },
                style: {
                    data: {
                        fill: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        opacity: {
                            light: 1,
                            dark: 1
                        },
                        stroke: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        strokeWidth: {
                            light: wp(2),
                            dark: wp(2)
                        }
                    },
                    labels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    }
                },
                ...victoryCommon
            },
            group: {
                // Todo different structure
                // colorScale: {"0": "#f4511e", "1": "#fff59d", "2": "#dce775", "3": "#8bc34a", "4": "#00796b", "5": "#006064"},
                colorScale: colorScale,
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
                colorScale: colorScale,
                gutter: {
                    light: wp(10),
                    dark: wp(10)
                },
                orientation: {
                    light: 'vertical',
                    dark: 'vertical'
                },
                titleOrientation: {
                    light: 'top',
                    dark: 'top'
                },
                style: {
                    data: {
                        type: {
                            light: 'circle',
                            dark: 'circle'
                        }
                    },
                    labels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    },
                    title: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(5),
                            dark: wp(5)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    }
                }
            },
            line: {
                style: {
                    data: {
                        fill: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        opacity: {
                            light: 1,
                            dark: 1
                        },
                        stroke: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        strokeWidth: {
                            light: wp(2),
                            dark: wp(2)
                        }
                    },
                    labels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    }
                },
                ...victoryCommon
            },
            pie: {
                colorScale: colorScale,
                style: {
                    data: {
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        }, stroke: {
                            light: pl.blueGrey50,
                            dark: pl.brown220
                        },
                        strokeWidth: {
                            light: wp(1),
                            dark: wp(1)
                        }
                    },
                    labels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(20),
                            dark: wp(20)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    }
                },
                ...victoryCommon
            },
            scatter: {
                style: {
                    data: {
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        opacity: {
                            light: 1,
                            dark: 1
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    },
                    labels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(8),
                            dark: wp(8)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    }
                },
                ...victoryCommon
            },
            stack: {
                colorScale: colorScale,
                ...victoryCommon
            },
            tooltip: {
                style: {
                    fontFamily: {
                        light: fontsWarehouse.regular.fontFamily.light,
                        dark: fontsWarehouse.regular.fontFamily.dark,
                    },
                    fontSize: {
                        light: wp(12),
                        dark: wp(12)
                    },
                    letterSpacing: {
                        light: 'normal',
                        dark: 'normal'
                    },
                    padding: {
                        light: 0,
                        dark: 0
                    },
                    fill: {
                        light: pl.blueGrey700,
                        dark: pl.brown220
                    },
                    stroke: {
                        light: 'transparent',
                        dark: 'transparent'
                    },
                    strokeWidth: {
                        light: 0,
                        dark: 0
                    },
                    pointerEvents: {
                        light: 'none',
                        dark: 'none'
                    }
                },
                flyoutStyle: {
                    stroke: {
                        light: pl.grey900,
                        dark: pl.grey320
                    },
                    strokeWidth: {
                        light: wp(1),
                        dark: wp(1)
                    },
                    fill: {
                        light: '#f0f0f0',
                        dark: '#0f0f0f'
                    },
                    pointerEvents: {
                        light: 'none',
                        dark: 'none'
                    }
                },
                flyoutPadding: {
                    light: wp(5),
                    dark: wp(5)
                },
                cornerRadius: {
                    light: wp(5),
                    dark: wp(5)
                },
                pointerLength: {
                    light: wp(10),
                    dark: wp(10)
                }
            },
            voronoi: {
                style: {
                    data: {
                        fill: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        }
                    },
                    labels: {
                        fontFamily: {
                            light: fontsWarehouse.regular.fontFamily.light,
                            dark: fontsWarehouse.regular.fontFamily.dark,
                        },
                        fontSize: {
                            light: wp(12),
                            dark: wp(12)
                        },
                        letterSpacing: {
                            light: 'normal',
                            dark: 'normal'
                        },
                        padding: {
                            light: wp(5),
                            dark: wp(5)
                        },
                        fill: {
                            light: pl.blueGrey700,
                            dark: pl.brown220
                        },
                        stroke: {
                            light: 'transparent',
                            dark: 'transparent'
                        },
                        strokeWidth: {
                            light: 0,
                            dark: 0
                        },
                        pointerEvents: {
                            light: 'none',
                            dark: 'none'
                        }
                    },
                    flyout: {
                        stroke: {
                            light: pl.grey900,
                            dark: pl.grey320
                        },
                        strokeWidth: {
                            light: wp(1),
                            dark: wp(1)
                        },
                        fill: {
                            light: '#f0f0f0',
                            dark: '#0f0f0f'
                        },
                        pointerEvents: {
                            light: 'none',
                            dark: 'none'
                        }
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

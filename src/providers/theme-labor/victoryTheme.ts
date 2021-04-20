import {pl, reverseColor} from "../../utils";
import getSizeLabor from "../size-labor/sizeLabor";

export const getVictoryTheme = () => {
    const {wp} = getSizeLabor().designsBasedOn.iphoneX

    const colorScale = [
        {light: pl.deepOrange600, dark: reverseColor(pl.deepOrange600), indigo: reverseColor(pl.deepOrange600)},
        {light: pl.yellow200, dark: reverseColor(pl.yellow200), indigo: reverseColor(pl.yellow200)},
        {light: pl.lime300, dark: reverseColor(pl.lime300), indigo: reverseColor(pl.lime300)},
        {light: pl.lightGreen500, dark: reverseColor(pl.lightGreen500), indigo: reverseColor(pl.lightGreen500)},
        {light: pl.teal700, dark: reverseColor(pl.teal700), indigo: reverseColor(pl.teal700)},
        {light: pl.cyan900, dark: reverseColor(pl.cyan900), indigo: reverseColor(pl.cyan900)}
    ]

    // axis.style.grid.stroke
    // pie.style.data.stroke,
    const gridStrokeAndPieDataStroke = {light: pl.blueGrey50, dark: pl.blueGrey50, indigo: pl.blueGrey50};

    // axis.style.axis.stroke,
    // axis.style.ticks.stroke
    const axisStrokeAndTicksStroke = {light: pl.blueGrey300, dark: pl.blueGrey300, indigo: pl.blueGrey300};

    // baseLabelStyles.fill,
    // axis.style.axis.tickLabels.fill,
    // bar.style.data.fill,
    // boxplot.style.[max,median,min,q1,q3].fill,
    // candlestick.style.data.stroke,
    // candlestick.style.candleColors.negative,
    // errorbar.style.data.stroke,
    // histogram.style.data.fill,
    // line.style.data.stroke,(Victory standard theme, but in this project, we defined color separately.)
    // scatter.style.data.fill
    const commonFill = {light: pl.grey600, dark: pl.grey400, indigo: pl.blueIndigo150};

    const lineStyleDataStroke = {light: pl.purple500, dark: pl.orange800, indigo: pl.tealA500}

    // area.style.data.fill,
    // histogram.style.data.stroke,
    // tooltip.flyoutStyle.stroke,
    // voronoi.style.flyout.stroke
    const commonStroke = {light: pl.grey900, dark: pl.grey900, indigo: pl.grey900};

    // Typography
    const sansSerif = "'Helvetica Neue', 'Helvetica', sans-serif";
    const letterSpacing = "normal";
    const fontSize = wp(12);

    // Layout
    // baseLabelStyles.padding,
    // axis.style.axisLabel.padding,
    // bar.style.padding,
    // boxplot.style.[max,median,min,q1,q3].padding,
    // pie.style.data.padding,
    const commonPadding = {light: wp(8), dark: wp(8), indigo: wp(8)};
    const baseProps = {
        width: {light: wp(350), dark: wp(350), indigo: wp(350)},
        height: {light: wp(350), dark: wp(350), indigo: wp(350)},
        padding: {light: wp(50), dark: wp(50), indigo: wp(50)}
    };

    // * Labels
    const baseLabelStyles = {
        fontFamily: {light: sansSerif, dark: sansSerif, indigo: sansSerif},
        fontSize: {light: fontSize, dark: fontSize, indigo: fontSize},
        letterSpacing: {light: letterSpacing, dark: letterSpacing, indigo: letterSpacing},
        padding: commonPadding,
        fill: commonFill,
        stroke: {light: "transparent", dark: "transparent", indigo: "transparent"},
        strokeWidth: {light: wp(0), dark: wp(0), indigo: wp(0)}
    };

    const centeredLabelStyles = Object.assign({textAnchor: {light: "middle", dark: "middle", indigo: "middle"}}, baseLabelStyles);

    // Strokes
    const strokeDasharray = "10, 5";
    const strokeLinecap = "round";
    const strokeLinejoin = "round";

    return {
        area: Object.assign(
            {
                style: {
                    data: {
                        fill: commonStroke
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        axis: Object.assign(
            {
                style: {
                    axis: {
                        fill: {light: "transparent", dark: "transparent", indigo: "transparent"},
                        stroke: axisStrokeAndTicksStroke,
                        strokeWidth: {light: wp(2), dark: wp(2), indigo: wp(2)},
                        strokeLinecap: {light: strokeLinecap, dark: strokeLinecap, indigo: strokeLinecap},
                        strokeLinejoin: {light: strokeLinejoin, dark: strokeLinejoin, indigo: strokeLinejoin}
                    },
                    axisLabel: Object.assign({}, centeredLabelStyles, {
                        padding: commonPadding,
                        stroke: {light: "transparent", dark: "transparent", indigo: "transparent"},
                    }),
                    grid: {
                        fill: {light: "none", dark: "none", indigo: "none"},
                        stroke: gridStrokeAndPieDataStroke,
                        strokeDasharray: {light: strokeDasharray, dark: strokeDasharray, indigo: strokeDasharray},
                        strokeLinecap: {light: strokeLinecap, dark: strokeLinecap, indigo: strokeLinecap},
                        strokeLinejoin: {light: strokeLinejoin, dark: strokeLinejoin, indigo: strokeLinejoin},
                        pointerEvents: {light: "painted", dark: "painted", indigo: "painted"}
                    },
                    ticks: {
                        fill: {light: "transparent", dark: "transparent", indigo: "transparent"},
                        size: {light: wp(5), dark: wp(5), indigo: wp(5)},
                        stroke: axisStrokeAndTicksStroke,
                        strokeWidth: {light: wp(1), dark: wp(1), indigo: wp(1)},
                        strokeLinecap: {light: strokeLinecap, dark: strokeLinecap, indigo: strokeLinecap},
                        strokeLinejoin: {light: strokeLinejoin, dark: strokeLinejoin, indigo: strokeLinejoin},
                    },
                    tickLabels: Object.assign({}, baseLabelStyles, {
                        fill: commonFill
                    })
                }
            },
            baseProps
        ),
        polarDependentAxis: Object.assign({
            style: {
                ticks: {
                    fill: {light: "transparent", dark: "transparent", indigo: "transparent"},
                    size: {light: wp(1), dark: wp(1), indigo: wp(1)},
                    stroke: {light: "transparent", dark: "transparent", indigo: "transparent"},
                }
            }
        }),
        bar: Object.assign(
            {
                style: {
                    data: {
                        fill: commonFill,
                        padding: commonPadding,
                        strokeWidth: {light: wp(0), dark: wp(0), indigo: wp(0)},
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        boxplot: Object.assign(
            {
                style: {
                    max: {
                        padding: commonPadding,
                        stroke: commonFill,
                        strokeWidth: {light: wp(1), dark: wp(1), indigo: wp(1)},
                    },
                    maxLabels: Object.assign({}, baseLabelStyles, {padding: {light: wp(3), dark: wp(3), indigo: wp(3)},}),
                    median: {
                        padding: commonPadding,
                        stroke: commonFill,
                        strokeWidth: {light: wp(1), dark: wp(1), indigo: wp(1)},
                    },
                    medianLabels: Object.assign({}, baseLabelStyles, {padding: {light: wp(3), dark: wp(3), indigo: wp(3)},}),
                    min: {
                        padding: commonPadding,
                        stroke: commonFill,
                        strokeWidth: {light: wp(1), dark: wp(1), indigo: wp(1)},
                    },
                    minLabels: Object.assign({}, baseLabelStyles, {padding: {light: wp(3), dark: wp(3), indigo: wp(3)},}),
                    q1: {
                        padding: commonPadding,
                        fill: commonFill
                    },
                    q1Labels: Object.assign({}, baseLabelStyles, {padding: {light: wp(3), dark: wp(3), indigo: wp(3)},}),
                    q3: {
                        padding: commonPadding,
                        fill: commonFill
                    },
                    q3Labels: Object.assign({}, baseLabelStyles, {padding: {light: wp(3), dark: wp(3), indigo: wp(3)},})
                },
                boxWidth: {light: wp(20), dark: wp(20), indigo: wp(20)},
            },
            baseProps
        ),
        candlestick: Object.assign(
            {
                style: {
                    data: {
                        stroke: commonFill
                    },
                    labels: Object.assign({}, baseLabelStyles, {padding: {light: wp(5), dark: wp(5), indigo: wp(5)},})
                },
                candleColors: {
                    positive: {light: "#ffffff", dark: "#ffffff", indigo: "#ffffff"},
                    negative: commonFill
                }
            },
            baseProps
        ),
        chart: baseProps,
        errorbar: Object.assign(
            {
                borderWidth: {light: wp(8), dark: wp(8), indigo: wp(8)},
                style: {
                    data: {
                        fill: {light: "transparent", dark: "transparent", indigo: "transparent"},
                        opacity: {light: 1, dark: 1, indigo: 1},
                        stroke: commonFill,
                        strokeWidth: {light: wp(2), dark: wp(2), indigo: wp(2)}
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        group: Object.assign(
            {
                colorScale: colorScale
            },
            baseProps
        ),
        // histogram: Object.assign(
        //     {
        //         style: {
        //             data: {
        //                 fill: commonFill,
        //                 stroke: commonStroke,
        //                 strokeWidth: {light: wp(2), dark: wp(2), indigo: wp(2)}
        //             },
        //             labels: baseLabelStyles
        //         }
        //     },
        //     baseProps
        // ),
        legend: {
            colorScale: colorScale,
            gutter: {light: wp(10), dark: wp(10), indigo: wp(10)},
            orientation: {light: "vertical", dark: "vertical", indigo: "vertical"},
            titleOrientation: {light: "top", dark: "top", indigo: "top"},
            style: {
                data: {
                    type: {light: "circle", dark: "circle", indigo: "circle"}
                },
                labels: baseLabelStyles,
                title: Object.assign({}, baseLabelStyles, {padding: {light: wp(5), dark: wp(5), indigo: wp(5)}})
            }
        },
        line: Object.assign(
            {
                style: {
                    data: {
                        fill: {light: "transparent", dark: "transparent", indigo: "transparent"},
                        opacity: {light: 1, dark: 1, indigo: 1},
                        stroke: lineStyleDataStroke,
                        strokeWidth: {light: wp(2), dark: wp(2), indigo: wp(2)}
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        pie: Object.assign(
            {
                colorScale: colorScale,
                style: {
                    data: {
                        padding: commonPadding,
                        stroke: gridStrokeAndPieDataStroke,
                        strokeWidth: {light: wp(1), dark: wp(1), indigo: wp(1)}
                    },
                    labels: Object.assign({}, baseLabelStyles, {padding: {light: wp(20), dark: wp(20), indigo: wp(20)}})
                }
            },
            baseProps
        ),
        scatter: Object.assign(
            {
                style: {
                    data: {
                        fill: commonFill,
                        opacity: {light: 1, dark: 1, indigo: 1},
                        stroke: {light: "transparent", dark: "transparent", indigo: "transparent"},
                        strokeWidth: {light: wp(0), dark: wp(0), indigo: wp(0)},
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        stack: Object.assign(
            {
                colorScale: colorScale
            },
            baseProps
        ),
        tooltip: {
            style: Object.assign({}, baseLabelStyles, {
                padding: {light: wp(0), dark: wp(0), indigo: wp(0)},
                pointerEvents: {light: "none", dark: "none", indigo: "none"}
            }),
            flyoutStyle: {
                stroke: commonStroke,
                strokeWidth: {light: wp(1), dark: wp(1), indigo: wp(1)},
                fill: {light: "#f0f0f0", dark: "#f0f0f0", indigo: "#f0f0f0"},
                pointerEvents: {light: "none", dark: "none", indigo: "none"}
            },
            flyoutPadding: {light: wp(5), dark: wp(5), indigo: wp(5)},
            cornerRadius: {light: wp(5), dark: wp(5), indigo: wp(5)},
            pointerLength: {light: wp(10), dark: wp(10), indigo: wp(10)},
        },
        voronoi: Object.assign(
            {
                style: {
                    data: {
                        fill: {light: "transparent", dark: "transparent", indigo: "transparent"},
                        stroke: {light: "transparent", dark: "transparent", indigo: "transparent"},
                        strokeWidth: {light: wp(0), dark: wp(0), indigo: wp(0)},
                    },
                    labels: Object.assign({}, baseLabelStyles, {
                        padding: {light: wp(5), dark: wp(5), indigo: wp(5)},
                        pointerEvents: {light: "none", dark: "none", indigo: "none"}
                    }),
                    flyout: {
                        stroke: commonStroke,
                        strokeWidth: {light: wp(1), dark: wp(1), indigo: wp(1)},
                        fill: {light: "#f0f0f0", dark: "#f0f0f0", indigo: "#f0f0f0"},
                        pointerEvents: {light: "none", dark: "none", indigo: "none"}
                    }
                }
            },
            baseProps
        )
    }
}

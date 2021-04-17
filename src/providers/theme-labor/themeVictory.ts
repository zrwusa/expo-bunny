import {pl, reverseColor} from "../../utils";
import getSizeLabor from "../size-labor/sizeLabor";

export const getVictoryTheme = () => {
    const {wp} = getSizeLabor().designsBasedOn.iphoneX

    const colorScale = [
        {light: pl.deepOrange600, dark: reverseColor(pl.deepOrange600), gradient: reverseColor(pl.deepOrange600)},
        {light: pl.yellow200, dark: reverseColor(pl.yellow200), gradient: reverseColor(pl.yellow200)},
        {light: pl.lime300, dark: reverseColor(pl.lime300), gradient: reverseColor(pl.lime300)},
        {light: pl.lightGreen500, dark: reverseColor(pl.lightGreen500), gradient: reverseColor(pl.lightGreen500)},
        {light: pl.teal700, dark: reverseColor(pl.teal700), gradient: reverseColor(pl.teal700)},
        {light: pl.cyan900, dark: reverseColor(pl.cyan900), gradient: reverseColor(pl.cyan900)}
    ]

    // axis.style.grid.stroke
    // pie.style.data.stroke,
    const gridStrokeAndPieDataStroke = {light: pl.blueGrey50, dark: pl.blueGrey50, gradient: pl.blueGrey50};

    // axis.style.axis.stroke,
    // axis.style.ticks.stroke
    const axisStrokeAndTicksStroke = {light: pl.blueGrey300, dark: pl.blueGrey300, gradient: pl.blueGrey300};

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
    const commonFill = {light: pl.blueGrey700, dark: pl.blueGrey700, gradient: pl.blueIndigo150};

    const lineStyleDataStroke = {light: pl.tealA500, dark: pl.tealA500, gradient: pl.tealA500}

    // area.style.data.fill,
    // histogram.style.data.stroke,
    // tooltip.flyoutStyle.stroke,
    // voronoi.style.flyout.stroke
    const commonStroke = {light: pl.grey900, dark: pl.grey900, gradient: pl.grey900};

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
    const commonPadding = {light: wp(8), dark: wp(8), gradient: wp(8)};
    const baseProps = {
        width: {light: wp(350), dark: wp(350), gradient: wp(350)},
        height: {light: wp(350), dark: wp(350), gradient: wp(350)},
        padding: {light: wp(50), dark: wp(50), gradient: wp(50)}
    };

    // * Labels
    const baseLabelStyles = {
        fontFamily: {light: sansSerif, dark: sansSerif, gradient: sansSerif},
        fontSize: {light: fontSize, dark: fontSize, gradient: fontSize},
        letterSpacing: {light: letterSpacing, dark: letterSpacing, gradient: letterSpacing},
        padding: commonPadding,
        fill: commonFill,
        stroke: {light: "transparent", dark: "transparent", gradient: "transparent"},
        strokeWidth: {light: wp(0), dark: wp(0), gradient: wp(0)}
    };

    const centeredLabelStyles = Object.assign({textAnchor: {light: "middle", dark: "middle", gradient: "middle"}}, baseLabelStyles);

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
                        fill: {light: "transparent", dark: "transparent", gradient: "transparent"},
                        stroke: axisStrokeAndTicksStroke,
                        strokeWidth: {light: wp(2), dark: wp(2), gradient: wp(2)},
                        strokeLinecap: {light: strokeLinecap, dark: strokeLinecap, gradient: strokeLinecap},
                        strokeLinejoin: {light: strokeLinejoin, dark: strokeLinejoin, gradient: strokeLinejoin}
                    },
                    axisLabel: Object.assign({}, centeredLabelStyles, {
                        padding: commonPadding,
                        stroke: {light: "transparent", dark: "transparent", gradient: "transparent"},
                    }),
                    grid: {
                        fill: {light: "none", dark: "none", gradient: "none"},
                        stroke: gridStrokeAndPieDataStroke,
                        strokeDasharray: {light: strokeDasharray, dark: strokeDasharray, gradient: strokeDasharray},
                        strokeLinecap: {light: strokeLinecap, dark: strokeLinecap, gradient: strokeLinecap},
                        strokeLinejoin: {light: strokeLinejoin, dark: strokeLinejoin, gradient: strokeLinejoin},
                        pointerEvents: {light: "painted", dark: "painted", gradient: "painted"}
                    },
                    ticks: {
                        fill: {light: "transparent", dark: "transparent", gradient: "transparent"},
                        size: {light: wp(5), dark: wp(5), gradient: wp(5)},
                        stroke: axisStrokeAndTicksStroke,
                        strokeWidth: {light: wp(1), dark: wp(1), gradient: wp(1)},
                        strokeLinecap: {light: strokeLinecap, dark: strokeLinecap, gradient: strokeLinecap},
                        strokeLinejoin: {light: strokeLinejoin, dark: strokeLinejoin, gradient: strokeLinejoin},
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
                    fill: {light: "transparent", dark: "transparent", gradient: "transparent"},
                    size: {light: wp(1), dark: wp(1), gradient: wp(1)},
                    stroke: {light: "transparent", dark: "transparent", gradient: "transparent"},
                }
            }
        }),
        bar: Object.assign(
            {
                style: {
                    data: {
                        fill: commonFill,
                        padding: commonPadding,
                        strokeWidth: {light: wp(0), dark: wp(0), gradient: wp(0)},
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
                        strokeWidth: {light: wp(1), dark: wp(1), gradient: wp(1)},
                    },
                    maxLabels: Object.assign({}, baseLabelStyles, {padding: {light: wp(3), dark: wp(3), gradient: wp(3)},}),
                    median: {
                        padding: commonPadding,
                        stroke: commonFill,
                        strokeWidth: {light: wp(1), dark: wp(1), gradient: wp(1)},
                    },
                    medianLabels: Object.assign({}, baseLabelStyles, {padding: {light: wp(3), dark: wp(3), gradient: wp(3)},}),
                    min: {
                        padding: commonPadding,
                        stroke: commonFill,
                        strokeWidth: {light: wp(1), dark: wp(1), gradient: wp(1)},
                    },
                    minLabels: Object.assign({}, baseLabelStyles, {padding: {light: wp(3), dark: wp(3), gradient: wp(3)},}),
                    q1: {
                        padding: commonPadding,
                        fill: commonFill
                    },
                    q1Labels: Object.assign({}, baseLabelStyles, {padding: {light: wp(3), dark: wp(3), gradient: wp(3)},}),
                    q3: {
                        padding: commonPadding,
                        fill: commonFill
                    },
                    q3Labels: Object.assign({}, baseLabelStyles, {padding: {light: wp(3), dark: wp(3), gradient: wp(3)},})
                },
                boxWidth: {light: wp(20), dark: wp(20), gradient: wp(20)},
            },
            baseProps
        ),
        candlestick: Object.assign(
            {
                style: {
                    data: {
                        stroke: commonFill
                    },
                    labels: Object.assign({}, baseLabelStyles, {padding: {light: wp(5), dark: wp(5), gradient: wp(5)},})
                },
                candleColors: {
                    positive: {light: "#ffffff", dark: "#ffffff", gradient: "#ffffff"},
                    negative: commonFill
                }
            },
            baseProps
        ),
        chart: baseProps,
        errorbar: Object.assign(
            {
                borderWidth: {light: wp(8), dark: wp(8), gradient: wp(8)},
                style: {
                    data: {
                        fill: {light: "transparent", dark: "transparent", gradient: "transparent"},
                        opacity: {light: 1, dark: 1, gradient: 1},
                        stroke: commonFill,
                        strokeWidth: {light: wp(2), dark: wp(2), gradient: wp(2)}
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
        //                 strokeWidth: {light: wp(2), dark: wp(2), gradient: wp(2)}
        //             },
        //             labels: baseLabelStyles
        //         }
        //     },
        //     baseProps
        // ),
        legend: {
            colorScale: colorScale,
            gutter: {light: wp(10), dark: wp(10), gradient: wp(10)},
            orientation: {light: "vertical", dark: "vertical", gradient: "vertical"},
            titleOrientation: {light: "top", dark: "top", gradient: "top"},
            style: {
                data: {
                    type: {light: "circle", dark: "circle", gradient: "circle"}
                },
                labels: baseLabelStyles,
                title: Object.assign({}, baseLabelStyles, {padding: {light: wp(5), dark: wp(5), gradient: wp(5)}})
            }
        },
        line: Object.assign(
            {
                style: {
                    data: {
                        fill: {light: "transparent", dark: "transparent", gradient: "transparent"},
                        opacity: {light: 1, dark: 1, gradient: 1},
                        stroke: lineStyleDataStroke,
                        strokeWidth: {light: wp(2), dark: wp(2), gradient: wp(2)}
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
                        strokeWidth: {light: wp(1), dark: wp(1), gradient: wp(1)}
                    },
                    labels: Object.assign({}, baseLabelStyles, {padding: {light: wp(20), dark: wp(20), gradient: wp(20)}})
                }
            },
            baseProps
        ),
        scatter: Object.assign(
            {
                style: {
                    data: {
                        fill: commonFill,
                        opacity: {light: 1, dark: 1, gradient: 1},
                        stroke: {light: "transparent", dark: "transparent", gradient: "transparent"},
                        strokeWidth: {light: wp(0), dark: wp(0), gradient: wp(0)},
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
                padding: {light: wp(0), dark: wp(0), gradient: wp(0)},
                pointerEvents: {light: "none", dark: "none", gradient: "none"}
            }),
            flyoutStyle: {
                stroke: commonStroke,
                strokeWidth: {light: wp(1), dark: wp(1), gradient: wp(1)},
                fill: {light: "#f0f0f0", dark: "#f0f0f0", gradient: "#f0f0f0"},
                pointerEvents: {light: "none", dark: "none", gradient: "none"}
            },
            flyoutPadding: {light: wp(5), dark: wp(5), gradient: wp(5)},
            cornerRadius: {light: wp(5), dark: wp(5), gradient: wp(5)},
            pointerLength: {light: wp(10), dark: wp(10), gradient: wp(10)},
        },
        voronoi: Object.assign(
            {
                style: {
                    data: {
                        fill: {light: "transparent", dark: "transparent", gradient: "transparent"},
                        stroke: {light: "transparent", dark: "transparent", gradient: "transparent"},
                        strokeWidth: {light: wp(0), dark: wp(0), gradient: wp(0)},
                    },
                    labels: Object.assign({}, baseLabelStyles, {
                        padding: {light: wp(5), dark: wp(5), gradient: wp(5)},
                        pointerEvents: {light: "none", dark: "none", gradient: "none"}
                    }),
                    flyout: {
                        stroke: commonStroke,
                        strokeWidth: {light: wp(1), dark: wp(1), gradient: wp(1)},
                        fill: {light: "#f0f0f0", dark: "#f0f0f0", gradient: "#f0f0f0"},
                        pointerEvents: {light: "none", dark: "none", gradient: "none"}
                    }
                }
            },
            baseProps
        )
    }
}

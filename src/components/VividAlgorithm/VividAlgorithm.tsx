import * as React from 'react';
import {useEffect, useRef} from 'react';
import {Text, View} from '../UI';
import {Card, Col, Row} from '../../containers';
import {useBunnyKit} from '../../hooks/bunny-kit';
import {makeStyles} from './styles';
import {
    AbstractEdge,
    AbstractGraph,
    AbstractVertex,
    BinaryTree,
    BinaryTreeNode,
    Coordinate,
    DirectedGraph,
    getDirectionVector,
    SinglyLinkedListNode,
    Stack,
    UndirectedGraph,
    uuidV4
} from '../../utils';
import {TreeNode} from '../../types';
import Svg, {Circle, Defs, G, Line, Marker, Path, Rect, Text as SVGText, TSpan} from 'react-native-svg';
import {ScrollView} from 'react-native';

export interface VividAlgorithmProps<T> {
    data?: T,
    referenceData?: any,
    relatedNodeKey?: string,
    relatedRouteKey?: string,
    isDebug?: boolean
}

export const VividAlgorithm = function <T extends { [key in string]: any }>(props: VividAlgorithmProps<T>) {
    const {data, referenceData, relatedNodeKey, relatedRouteKey, isDebug = false} = props;
    const {sizeLabor, themeLabor, wp, colors, ms} = useBunnyKit();
    const styles = makeStyles(sizeLabor, themeLabor);

    let relatedNode: TreeNode<any> | undefined;
    let relatedBinaryNode: BinaryTreeNode<any> | undefined;
    let relatedMatrixCell: Coordinate | undefined;
    if (relatedNodeKey) {
        relatedNode = data?.[relatedNodeKey] as TreeNode<any> | undefined;
        relatedBinaryNode = data?.[relatedNodeKey] as BinaryTreeNode<any> | undefined;
        relatedMatrixCell = data?.[relatedNodeKey] as Coordinate | undefined;
    }

    // TODO render bug needs to be fixed
    let relatedMatrixRoutes: Coordinate[][] | undefined;
    if (relatedRouteKey) {
        relatedMatrixRoutes = data?.[relatedRouteKey] as Coordinate[][] | undefined;
    }

    const VividNumber: React.FC<{ data: number }> = ({data}) => {
        return (
            <Row>
                <Col size={6}><Text>{data.toString()}</Text></Col>
            </Row>
        );
    };

    const getPointsByDelta = (src: Coordinate, dest: Coordinate, cutDelta?: number) => {
        if (cutDelta === undefined) cutDelta = 0;
        const PI = Math.PI;
        let angle: number = Math.atan2((dest.y - src.y), (dest.x - src.x));
        let theta: number = angle * (180 / Math.PI);
        let newSrc = new Coordinate(src.y, src.x);
        let newDest = new Coordinate(dest.y, dest.x);
        if (angle <= 0.5 * PI) {
            newSrc.x = src.x + Math.cos(angle) * cutDelta;
            newSrc.y = src.y + Math.sin(angle) * cutDelta;
            newDest.x = dest.x - Math.cos(angle) * cutDelta;
            newDest.y = dest.y - Math.sin(angle) * cutDelta;
        } else if (angle > 0.5 * PI && angle <= PI) {
            angle = PI - angle;
            newSrc.x = src.x - Math.cos(angle) * cutDelta;
            newSrc.y = src.y + Math.sin(angle) * cutDelta;
            newDest.x = dest.x + Math.cos(angle) * cutDelta;
            newDest.y = dest.y - Math.sin(angle) * cutDelta;
        }

        src = newSrc;
        dest = newDest;
        return {src, dest};
    };

    const LineWithArrow = ({
                               from,
                               to,
                               weight,
                               delta
                           }: { from: Coordinate, to: Coordinate, weight?: number, delta?: number }) => {
        if (delta === undefined) delta = 0;
        const {src, dest} = getPointsByDelta(from, to, delta);

        return <G>
            <Defs>
                <Marker
                    id="Triangle"
                    viewBox="0 0 10 10"
                    refX="0"
                    refY="5"
                    markerWidth="4"
                    markerHeight="3"
                    orient="auto"
                >
                    <Path d="M 0 0 L 10 5 L 0 10 z" fill={arrowColor} stroke={arrowColor}/>
                </Marker>
            </Defs>
            <Path
                d={`M ${src.x} ${src.y} L ${dest.x} ${dest.y}`}
                fill={arrowColor}
                stroke={arrowColor}
                strokeWidth="2"
                markerEnd="url(#Triangle)"
            />
            {
                weight !== undefined && weight !== null
                    ? <SVGText
                        strokeWidth={wp(1)}
                        fontSize={ms.fs.xs}
                        fill={colors.text}
                        fontWeight={100}
                        stroke={colors.text}
                        x={src.x + (dest.x - src.x) / 2 + (src.x > dest.x ? wp(10) : wp(-10))}
                        y={src.y + (dest.y - src.y) / 2 + (src.y > dest.y ? wp(3) : wp(-3))}
                        textAnchor="middle"
                    >{weight}</SVGText>
                    : null
            }

        </G>;
    };

    const VividString: React.FC<{ data: string }> = ({data}) => {
        return (
            <Row>
                <Col size={6}><Text>{data}</Text></Col>
            </Row>
        );
    };


    const TwoWayScrollSVG: React.FC<{ autoScroll: boolean }> = ({children, autoScroll}) => {
        const horizontalScrollView = useRef<ScrollView>(null);
        if (autoScroll) {
            useEffect(() => {
                horizontalScrollView?.current?.scrollTo({
                    x: (treePanelWidth - wp(375)) / 2,
                    y: 0,
                    animated: false
                });
            }, []);
        }


        return (
            <ScrollView nestedScrollEnabled style={{height: wp(375)}}>
                <ScrollView style={{width: wp(375)}}
                            horizontal ref={horizontalScrollView}>
                    <Svg
                        width={treePanelWidth}
                        height={treePanelHeight}
                    >
                        <G fill={colors.background} strokeWidth={strokeWidth} stroke={colors.border}>
                            {
                                children
                            }
                        </G>
                    </Svg>
                </ScrollView>
            </ScrollView>
        );
    };

    const VividTree: React.FC<{ data: TreeNode<any> }> = ({data}) => {
        return (
            <TwoWayScrollSVG autoScroll>
                <VividTreeRecursive node={data} level={1} index={0} familyLength={1} parentX={0} parentY={0}
                                    maxHeight={data.getHeight()}/>
            </TwoWayScrollSVG>
        );
    };

    const VividBinaryTree: React.FC<{ node: BinaryTreeNode<any> | null, maxHeight?: number }> = ({node, maxHeight}) => {
        return (
            <TwoWayScrollSVG autoScroll>
                {
                    node
                        ? <VividBinaryTreeRecursive node={node} level={1} index={0} familyLength={1}
                                                    maxHeight={maxHeight}/>
                        : null
                }
            </TwoWayScrollSVG>
        );
    };

    const VividGraph: React.FC<{ data: AbstractGraph<AbstractVertex, AbstractEdge> }> = ({data}) => {
        return (
            <TwoWayScrollSVG autoScroll={false}>
                {
                    data
                        ? <VividGraphDrawer graph={data}/>
                        : null
                }
            </TwoWayScrollSVG>
        );
    };

    const matrixPanelWidth = wp(360, false);
    const matrixRectStrokeWidth = wp(1, false);
    const arrowCut = 0.3;
    const arrowColor = colors.accent;

    const VividMatrix: React.FC<{ data: Array<Array<any>> }> = ({data}) => {
        const rowCount = data?.length;
        const colCount = data?.[0]?.length;
        if (colCount < 1) {
            return null;
        }
        const rectSize = (matrixPanelWidth - (colCount + 1) * matrixRectStrokeWidth) / colCount;
        const matrixHeight = rectSize * rowCount;

        return (
            <Svg
                width={matrixPanelWidth}
                height={matrixHeight}
            >
                <G>
                    {data.map((row, i) => {
                        return row.map((col, j) => {
                            const colKey = i + '-' + j.toString();
                            const isActive = (relatedMatrixCell?.y === i && relatedMatrixCell?.x === j);
                            return <Rect
                                key={colKey}
                                x={j * rectSize}
                                y={i * rectSize}
                                width={rectSize}
                                height={rectSize}
                                stroke={colors.border}
                                strokeDasharray={`${rectSize},${rectSize * 2},${rectSize}`}
                                strokeWidth={matrixRectStrokeWidth}
                                fill={isActive ? colors.primary : colors.backgroundA}
                            />;
                        });
                    })}
                    {data.map((row, i) => {
                        const rowKey = i.toString();

                        return row.map((col, j) => {
                            const colKey = 'text-' + i + '-' + j.toString();
                            const isActive = (relatedMatrixCell?.y === i && relatedMatrixCell?.x === j);
                            return <SVGText
                                key={colKey}
                                strokeWidth={wp(1)}
                                fontSize={ms.fs.m}
                                fill={isActive ? colors.buttonText : colors.text}
                                fontWeight={100}
                                x={(j + 0.5) * rectSize}
                                y={(i + 0.5) * rectSize}
                                textAnchor="middle"
                            >{data[i][j].toString()}</SVGText>;
                        });
                    })}
                    {
                        relatedMatrixRoutes
                            ? relatedMatrixRoutes.map((route, routeIndex) => {
                                return route.map((cell, cellIndex) => {
                                    const from = cell;
                                    const to = relatedMatrixRoutes?.[routeIndex]?.[cellIndex + 1];
                                    const deviationVector = getDirectionVector(from, to);
                                    if (from && to) {
                                        const src = new Coordinate((from.y + 0.5 + deviationVector.y * arrowCut) * rectSize, (from.x + 0.5 + deviationVector.x * arrowCut) * rectSize);
                                        const dest = new Coordinate((to.y + 0.5 - deviationVector.y * arrowCut) * rectSize, (to.x + 0.5 - deviationVector.x * arrowCut) * rectSize);

                                        return <LineWithArrow key={src.y + ',' + src.x + dest.y + dest.x}
                                                              from={src}
                                                              to={dest}
                                        />;
                                    } else {
                                        return null;
                                    }

                                });
                            })
                            : null
                    }
                </G>
            </Svg>

        );
    };

    const treePanelWidth = wp(20000);
    const treePanelHeight = wp(20000);
    const strokeWidth = wp(2);
    const levelOffset = wp(60);
    const circleR = wp(20);
    const nodeSpace = wp(40);
    const fontSize = wp(12);
    const fontOffsetY = fontSize / 3;


    const VividTreeRecursive: React.FC<{ node: TreeNode<any>, level: number, index: number, familyLength: number, parentX?: number, parentY?: number, maxHeight?: number }> = ({
                                                                                                                                                                                   node,
                                                                                                                                                                                   level = 1,
                                                                                                                                                                                   index = 0,
                                                                                                                                                                                   familyLength = 1,
                                                                                                                                                                                   parentX,
                                                                                                                                                                                   parentY,
                                                                                                                                                                                   maxHeight
                                                                                                                                                                               }) => {
        if (!node) {
            return null;
        }
        // const firstRender = useMemo(
        //     () =>console.log('!!!first Render'),
        //     []
        // );
        let space = 0;
        let offsetX = 0;
        let offsetY = 0;
        let levelNodeSpace = nodeSpace * Math.pow(2, (maxHeight || 5) - level);
        if (level === 1) {
            space = treePanelWidth / 2;
            offsetX = space - circleR;
            offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
        } else {
            offsetX = parentX! - (familyLength / 2) * levelNodeSpace + (index + 0.5) * levelNodeSpace;
            offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
        }

        const isActive = node.id === relatedNode?.id;
        return (
            <G key={node.id}>
                {
                    level > 1
                        ? <Line x1={parentX} y1={parentY} x2={offsetX} y2={offsetY}/>
                        : null
                }
                {node.children
                    ? node.children.map((child, index, family) => <VividTreeRecursive key={child.id}
                                                                                      node={child}
                                                                                      level={level + 1}
                                                                                      index={index}
                                                                                      familyLength={family.length}
                                                                                      parentX={offsetX}
                                                                                      parentY={offsetY}
                                                                                      maxHeight={maxHeight}/>)
                    : null
                }
                <Circle r={circleR} cx={offsetX} cy={offsetY}
                        fill={isActive ? colors.primary : colors.background}/>
                <SVGText
                    strokeWidth={wp(1)}
                    fill={isActive ? colors.buttonText : colors.text}
                    stroke={isActive ? colors.buttonText : colors.text}
                    fontSize={fontSize}
                    fontWeight={100}
                    x={offsetX}
                    y={offsetY + fontOffsetY}
                    textAnchor="middle"
                >{node.name || node.id}</SVGText>
            </G>
        );
    };

    const VividBinaryTreeRecursive: React.FC<{ node: BinaryTreeNode<any>, level: number, index: number, familyLength: number, parentX?: number, parentY?: number, maxHeight?: number }> = ({
                                                                                                                                                                                               node,
                                                                                                                                                                                               level = 1,
                                                                                                                                                                                               index = 0,
                                                                                                                                                                                               familyLength = 1,
                                                                                                                                                                                               parentX,
                                                                                                                                                                                               parentY,
                                                                                                                                                                                               maxHeight
                                                                                                                                                                                           }) => {
        if (!node) {
            return null;
        }
        let space = 0;
        let offsetX;
        let offsetY;
        let levelNodeSpace = nodeSpace * Math.pow(2, (maxHeight || 5) - level);
        if (level === 1) {
            space = treePanelWidth / 2;
            offsetX = space - circleR;
            offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
        } else {
            offsetX = parentX! - ((index < 1) ? levelNodeSpace : -levelNodeSpace);
            offsetY = (level - 1) * levelOffset + circleR + strokeWidth;
        }

        const isActive = node.id === relatedBinaryNode?.id;
        return (
            <G key={node.id}>
                {
                    level > 1
                        ? <Line x1={parentX} y1={parentY} x2={offsetX} y2={offsetY}/>
                        : null
                }
                {
                    node.left
                        ?
                        <VividBinaryTreeRecursive node={node.left} level={level + 1} index={0}
                                                  familyLength={2} parentX={offsetX} parentY={offsetY}
                                                  maxHeight={maxHeight}/>
                        : null
                }
                {
                    node.right
                        ?
                        <VividBinaryTreeRecursive node={node.right} level={level + 1} index={1}
                                                  familyLength={2} parentX={offsetX} parentY={offsetY}
                                                  maxHeight={maxHeight}/>
                        : null
                }
                <Circle r={circleR} cx={offsetX} cy={offsetY}
                        fill={isActive ? colors.primary : colors.background}/>
                <SVGText
                    fill="none"
                    stroke={isActive ? colors.buttonText : colors.text}
                    fontSize={fontSize}
                    fontWeight={1}
                    x={offsetX}
                    y={offsetY + fontOffsetY}
                    textAnchor="middle"
                >
                    <TSpan x={offsetX} y={offsetY + fontOffsetY}>{node.id}</TSpan>
                    <TSpan x={offsetX} y={offsetY + fontOffsetY + fontSize + wp(2)}>{node.count}</TSpan>

                    <TSpan x={offsetX}
                           y={offsetY + fontOffsetY + 2 * fontSize + wp(4)}>{node.allLesserSum}</TSpan>

                </SVGText>
            </G>
        );
    };


    const VividGraphDrawer: React.FC<{ graph: AbstractGraph<any, any> }> = ({graph}) => {
        const vertexDistance = wp(80);
        const vertices = graph.vertexSet();
        const vertexCount = vertices.size;
        const edges = graph.edgeSet();
        let coordsMap: Map<AbstractVertex, Coordinate> = new Map<AbstractVertex, Coordinate>();
        const rowCount = Math.ceil(Math.sqrt(vertexCount));
        let i = 0;
        vertices.forEach((vertex, id) => {
            const rowIndex = Math.floor(i / rowCount);
            const colIndex = Math.floor(i % rowCount);
            const y = (rowIndex) * vertexDistance + circleR;
            const x = (rowIndex % 2 === 0 ? (colIndex + 1) : colIndex) * vertexDistance + circleR;
            coordsMap.set(vertex, new Coordinate(y, x));
            i++;
        });
        return (
            <G>
                {
                    [...vertices].map(([id, vertex]) => {
                        const coordinate = coordsMap.get(vertex);
                        return (
                            coordinate
                                ? <G key={vertex.id}>
                                    <Circle key={vertex.id} r={circleR}
                                            cx={coordinate.x}
                                            cy={coordinate.y}
                                            fill={colors.primary}/>
                                    <SVGText key={vertex.id + 'id'}
                                             fill="none"
                                             stroke={colors.text}
                                             fontSize={fontSize}
                                             fontWeight={1}
                                             x={coordinate.x}
                                             y={coordinate.y + fontOffsetY}
                                             textAnchor="middle"
                                    >
                                        <TSpan x={coordinate.x} y={coordinate.y + fontOffsetY}>{vertex.id}</TSpan>
                                    </SVGText>
                                </G>
                                : null
                        );
                    })}
                {
                    edges.map(edge => {
                        if (graph instanceof UndirectedGraph) {
                            const ends = graph.getEndsOfEdge(edge);
                            if (ends && ends.length > 1) {
                                const v1Coordinate = coordsMap.get(ends[0]);
                                const v2Coordinate = coordsMap.get(ends[1]);
                                if (v1Coordinate && v2Coordinate) {
                                    const {src, dest} = getPointsByDelta(v1Coordinate, v2Coordinate, circleR);
                                    return <G key={edge.hashCode}>
                                        <Line
                                            x1={src.x} y1={src.y} x2={dest.x}
                                            y2={dest.y}/>
                                    </G>;
                                }
                            }
                        } else if (graph instanceof DirectedGraph) {
                            const src = graph.getEdgeSrc(edge);
                            const dest = graph.getEdgeDest(edge);
                            if (src && dest) {
                                const srcCod = coordsMap.get(src);
                                const destCod = coordsMap.get(dest);
                                const edge = graph.getEdge(src, dest);
                                if (srcCod && destCod) {
                                    return <LineWithArrow
                                        key={edge.hashCode}
                                        from={srcCod} to={destCod}
                                        weight={edge?.weight}
                                        delta={circleR}
                                    />;
                                }
                            }
                        }
                    })
                }
            </G>
        );
    };

    const VividArray: React.FC<{ data: any[] }> = ({data}) => {
        return (
            <View>
                {
                    data[0] instanceof Array
                        ? <VividMatrix data={data}/>
                        : data.map(item => {
                            switch (typeof item) {
                                case 'number':
                                    return <View style={styles.arrayItem}
                                                 key={uuidV4()}><Text>{item}</Text></View>;
                                case 'string':
                                    return <View style={styles.arrayItem}
                                                 key={uuidV4()}><Text>{item}</Text></View>;
                                default:
                                    return <View style={styles.arrayItem}
                                                 key={uuidV4()}><Text>{JSON.stringify(item)}</Text></View>;
                            }
                        })

                }
            </View>
        );
    };

    const VividObject: React.FC<{ data: { [key in string]: any } }> = ({data}) => {
        return (
            <Row>
                {
                    Object.keys(data).map(key => {
                        return <View style={styles.arrayItem} key={key}>
                            <Text>{key}</Text>
                            <Text>{data[key]}</Text>
                        </View>;
                    })
                }
            </Row>
        );
    };

    const VividLinkedListNode: React.FC<{ data: SinglyLinkedListNode }> = ({data}) => {
        return (
            <Row>
                <View style={styles.arrayItem} key={data.index}>
                    <Text>{data.index}</Text>
                    <Text>{data.value}</Text>
                </View>
            </Row>
        );
    };

    // TODO
    const VividBinaryTreeNode: React.FC<{ data: BinaryTreeNode<any> }> = ({data}) => {
        return (
            <Row>
                <View style={styles.arrayItem} key={data.id}>
                    <Text>{data.id}</Text>
                </View>
            </Row>
        );
    };

    const VividBinarySearchTreeNode: React.FC<{ data: BinaryTreeNode<any> }> = ({data}) => {
        return (
            <Row>
                <View style={styles.arrayItem} key={data.id}>
                    <Text>{data.id}</Text>
                </View>
            </Row>
        );
    };

    const renderVariable = (item: any) => {
        if (!item) return null;
        switch (typeof item) {
            case 'number':
                return <VividNumber data={item}/>;
            case 'string':
                return <VividString data={item}/>;
            case 'object':
                if (item instanceof TreeNode) {
                    return <VividTree data={item}/>;
                } else if (item instanceof AbstractGraph) {
                    return <VividGraph data={item}/>;
                } else if (item instanceof BinaryTreeNode) {
                    return <VividBinaryTreeNode data={item}/>;
                } else if (item instanceof BinaryTree) {
                    return <VividBinaryTree node={item.root} maxHeight={item.getHeight()}/>;
                } else if (item instanceof SinglyLinkedListNode) {
                    return <VividLinkedListNode data={item}/>;
                } else if (item instanceof Map) {
                    return <VividArray data={Array.from(item)}/>;
                } else if (item instanceof Stack) {
                    return <VividArray data={item.toArray()}/>;
                } else if (item instanceof Array) {
                    return <VividArray data={item}/>;
                } else {
                    return <VividObject data={item}/>;
                }
        }
    };

    return <View>
        {
            referenceData
                ? renderVariable(referenceData)
                : null
        }
        {
            data
                ? Object.keys(data).map(datumKey => {
                    const item = data[datumKey];
                    return (datumKey !== relatedRouteKey && datumKey !== relatedNodeKey)
                        ?
                        <Card title={datumKey} key={datumKey}>
                            {
                                renderVariable(item)
                            }
                        </Card>
                        : null;

                })
                : null
        }
    </View>;
};

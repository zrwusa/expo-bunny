import * as React from 'react';
import {View} from 'react-native';
import {getStyles} from './styles';
import {Text} from '../../../../components/UI'
import {Col, Row} from '../../../../containers';
import {Divider} from '../../../../components/Divider';
import {MonthKey} from '../../../../types';
import {
    VictoryAxis,
    VictoryChart,
    VictoryLabel,
    VictoryLine,
    VictoryTooltip,
    VictoryVoronoiContainer
} from '../../../../components/Victory/Victory';
import {useBunnyKit} from '../../../../hooks/bunny-kit';

export interface BodyPartCardProps {
    title?: string,
    children?: React.ReactNode,
    bodyPart: string,
    month: MonthKey,
    data: { x: Date, y: number }[]
}

export function BodyPartChartCard(props: BodyPartCardProps) {
    const {sizeLabor, themeLabor, theme, wp, ms} = useBunnyKit();
    const {title, children, bodyPart, month, data} = props;
    const {colors, victory} = theme;
    const styles = getStyles(sizeLabor, themeLabor)


    return <View style={styles.bodyPartChartCard}>
        <Row>
            <Col><Text>{bodyPart}</Text></Col>
            <Col style={{alignItems: 'flex-end'}}><Text>{month}</Text></Col>
        </Row>
        <Divider style={{marginTop: wp(10)}}/>
        <Row>
            <VictoryChart
                width={wp(326)}
                height={160}
                theme={victory}
                padding={{top: wp(10), left: wp(42), bottom: wp(42), right: wp(20)}}
                // animate={{
                //     duration: 1000,
                // }}
                domainPadding={{y: wp(15)}}
                containerComponent={
                    <VictoryVoronoiContainer
                        voronoiDimension="x"
                        labels={({datum}: { datum: { x: Date, y: number } }) => `x:${datum.x.toLocaleDateString()} \n y: ${datum.y}`}
                        labelComponent={
                            <VictoryTooltip
                                constrainToVisibleArea
                                cornerRadius={ms.br.s}
                            />
                        }
                    />
                }
                scale={{x: 'time'}}
            >
                <VictoryAxis crossAxis
                             style={{
                                 grid: {stroke: 'none'},
                                 ticks: {stroke: 'none'},
                                 axis: {stroke: 'none'},
                             }}
                             axisLabelComponent={<VictoryLabel dy={wp(22)} dx={wp(0)}/>}
                             label="Time (week)"
                />
                <VictoryAxis dependentAxis
                             axisLabelComponent={<VictoryLabel dy={wp(-26)} dx={wp(-10)}/>}
                             label="Max Weight (kgs)"
                             tickCount={4}
                             style={{
                                 grid: {stroke: 'none'},
                                 ticks: {stroke: 'none'},
                                 axis: {stroke: 'none'},
                             }}/>
                <VictoryLine
                    interpolation="natural"
                    style={{
                        // data: {stroke: colors.secondary},
                        // parent: {border: `1px solid ${colors.border}`}
                    }}
                    data={data}
                />
            </VictoryChart>
        </Row>
    </View>
}

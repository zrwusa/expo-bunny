import * as React from 'react';
import {useState} from 'react';
import {PickerSelect, Text, View} from '../../../components/UI';
import {useTranslation} from 'react-i18next';
import {shortenTFunctionKey} from '../../../providers/i18n-labor';
import {Col, getContainerStyles, Row} from '../../../containers';
import {useSizeLabor} from '../../../providers/size-labor';
import {useThemeLabor} from '../../../providers/theme-labor';
import {Avatar} from '../../../components';
import {E_MONTH} from '../../../constants';
import {MonthKey} from '../../../types';
import {BodyPartCard} from './BodyPartCard';
import {getSharedStyles} from '../../../helpers';
import {BodyPartChartCard} from './BodyPartChartCard';
import {SafeAreaView, ScrollView} from 'react-native';
import {data, data1, data2} from './data';

export function HealthHomeScreen() {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.HealthHome');
    const sizeLabor = useSizeLabor();
    const {designsBasedOn} = sizeLabor;
    const {wp} = designsBasedOn.iphoneX;
    const themeLabor = useThemeLabor();
    const {theme} = themeLabor;
    const {colors} = theme;
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor)
    const [selectedMonth, setSelectedMonth] = useState<MonthKey>('January')
    const monthKeys = Object.keys(E_MONTH) as MonthKey[];
    const monthItems = monthKeys.map(month => ({label: month, value: month, color: colors.text}))
    const dataMapped = data.map((item: { x: string, y: number }, index: number) => {
        return {x: new Date(item.x), y: parseFloat((item.y / 1000).toFixed(0))}
    })
    const data1Mapped = data1.map((item: { x: string, y: number }, index: number) => {
        return {x: new Date(item.x), y: parseFloat((item.y / 1000).toFixed(0))}
    })
    const data2Mapped = data2.map((item: { x: string, y: number }, index: number) => {
        return {x: new Date(item.x), y: parseFloat((item.y / 1000).toFixed(0))}
    })
    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <View style={[containerStyles.Screen]}>
                    <View style={{padding: wp(16)}}>
                        <Row>
                            <Col>
                                <Row>
                                    <Text style={sharedStyles.title}>Welcome,</Text>
                                </Row>
                                <Row>
                                    <Text style={[sharedStyles.title, {fontWeight: 'bold'}]}>Jessica</Text>
                                </Row>
                            </Col>
                            <Col style={{alignItems: 'flex-end'}}>
                                <Avatar
                                    source={{uri: 'https://raw.githubusercontent.com/zrwusa/assets/master/images/mcenany.jpeg'}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Text>Your Workout Summary</Text>
                            </Col>
                            <Col>
                                <PickerSelect
                                    items={monthItems}
                                    value="January"
                                    onValueChange={(value: MonthKey) => {
                                        setSelectedMonth(value)
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row style={{marginTop: 10}}>
                            <Col>
                                <BodyPartCard bodyPart="Chest & Back" date="Mon, Nov 15"/>
                            </Col>
                            <Col>
                                <BodyPartCard bodyPart="Chest & Back" date="Mon, Nov 15"/>
                            </Col>
                            <Col>
                                <BodyPartCard bodyPart="Chest & Back" date="Mon, Nov 15"/>
                            </Col>
                        </Row>

                        <Row>
                            <BodyPartChartCard bodyPart="Chest" month="December" data={dataMapped}/>
                        </Row>
                        <Row>
                            <BodyPartChartCard bodyPart="Legs" month="December" data={data1Mapped}/>
                        </Row>
                        <Row>
                            <BodyPartChartCard bodyPart="Biceps" month="December" data={data2Mapped}/>
                        </Row>
                    </View>
                    {/*<Card title={st(`title`)}>*/}
                    {/*</Card>*/}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

import * as React from "react";
import {useState} from "react";
import {IcoMoon, PickerSelect, SwitchP, Text, View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoHealthTabStackParam, RootStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {Card, getContainerStyles, Row} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {StackNavigationProp} from "@react-navigation/stack";
import {Divider} from "../../../components/Divider";
import {LinearGradientIcon} from "../../../components/LinearGradientIcon";
import {getStyles} from "./styles";
import {Col} from "../../../containers/Col";
import {SafeAreaView, ScrollView, TouchableOpacity} from "react-native";

type HealthSettingsRouteProp = RouteProp<DemoHealthTabStackParam, 'HealthSettings'>;
type HealthSettingsNavigationProp = StackNavigationProp<RootStackParam, 'DemoHealth'>;

export interface HealthSettingsProps {
    route: HealthSettingsRouteProp,
    navigation: HealthSettingsNavigationProp
}

export function HealthSettingsScreen({route, navigation}: HealthSettingsProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.HealthSettings');
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {theme} = themeLabor;
    const {colors} = theme;
    const {wp} = sizeLabor.designsBasedOn.iphoneX
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

    const styles = getStyles(sizeLabor, themeLabor)
    const [weightUnit, setWeightUnit] = useState('kg')
    const [distanceUnit, setDistanceUnit] = useState('km')
    const [lengthUnit, setLengthUnit] = useState('cm')
    const [isNotification, setIsNotification] = useState(true)

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <View style={[containerStyles.Screen, styles.container]}>
                    <Card titleMode="OUT" title="Units">
                        <Row paddingVertical="xl">
                            <Col size={3}>
                                <Row>
                                    <LinearGradientIcon name="profile-male"/>
                                    <Text style={styles.label}>Weight units</Text>
                                </Row>

                            </Col>
                            <Col size={1}>
                                <Row>
                                    <Divider size="l" isVertical/>
                                    <PickerSelect value={weightUnit}
                                                  placeholder={{label: 'none', value: '', color: colors.text}}
                                                  items={[{label: 'kg', value: 'kg', color: colors.text}, {
                                                      label: 'lb',
                                                      value: 'lb',
                                                      color: colors.text
                                                  }]}
                                                  onValueChange={(value) => {
                                                      setWeightUnit(value)
                                                  }}
                                    />
                                </Row>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row paddingVertical="xl">
                            <Col size={3}>
                                <Row>
                                    <LinearGradientIcon name="car"/>
                                    <Text style={styles.label}>Distance units</Text>
                                </Row>
                            </Col>
                            <Col size={1}>
                                <Row>
                                    <Divider size="l" isVertical/>
                                    <PickerSelect value={distanceUnit}
                                                  placeholder={{label: 'none', value: '', color: colors.text}}
                                                  items={[{label: 'km', value: 'km', color: colors.text}, {
                                                      label: 'm',
                                                      value: 'm',
                                                      color: colors.text
                                                  }, {label: 'foot', value: 'foot', color: colors.text}]}
                                                  onValueChange={(value) => {
                                                      setDistanceUnit(value)
                                                  }}
                                    />
                                </Row>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row paddingVertical="xl">
                            <Col size={3}>
                                <Row>
                                    <LinearGradientIcon name="tools"/>
                                    <Text style={styles.label}>Length units</Text>
                                </Row>
                            </Col>
                            <Col size={1}>
                                <Row>
                                    <Divider size="l" isVertical/>
                                    <PickerSelect value={lengthUnit}
                                                  placeholder={{label: 'none', value: '', color: colors.text}}
                                                  items={[{label: 'cm', value: 'cm', color: colors.text}, {
                                                      label: 'm',
                                                      value: 'm',
                                                      color: colors.text
                                                  }]}
                                                  onValueChange={(value) => {
                                                      setLengthUnit(value)
                                                  }}
                                    />
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                    <Card titleMode="OUT" title="Preferences">
                        <Row paddingVertical="xl">
                            <Col size={3}>
                                <Row>
                                    <LinearGradientIcon name="bell-o"/>
                                    <Text style={styles.label}>Notifications</Text>
                                </Row>
                            </Col>
                            <Col size={1} style={styles.rightWrapper}>
                                <SwitchP value={isNotification}
                                         onValueChange={(value) => {
                                             setIsNotification(value)
                                         }}
                                />
                            </Col>
                        </Row>
                        <Divider/>
                        <TouchableOpacity>
                            <Row paddingVertical="xl">
                                <Col size={3}>
                                    <Row>
                                        <LinearGradientIcon name="hand-rock-o"/>
                                        <Text style={styles.label}>Bar Type</Text>
                                    </Row>
                                </Col>
                                <Col size={1} style={styles.rightWrapper}>
                                    <IcoMoon name="chevron-right1"/>
                                </Col>
                            </Row>
                        </TouchableOpacity>
                        <Divider/>
                        <TouchableOpacity>
                            <Row paddingVertical="xl">
                                <Col size={3}>
                                    <Row>
                                        <LinearGradientIcon name="puzzle"/>
                                        <Text style={styles.label}>Appearance & Display</Text>
                                    </Row>
                                </Col>
                                <Col size={1} style={styles.rightWrapper}>
                                    <IcoMoon name="chevron-right1"/>
                                </Col>
                            </Row>
                        </TouchableOpacity>
                    </Card>
                    <Card titleMode="OUT" title="Support">
                        <TouchableOpacity>
                            <Row paddingVertical="xl">
                                <Col size={3}>
                                    <Row>
                                        <LinearGradientIcon name="lab"/>
                                        <Text style={styles.label}>Bug Report</Text>
                                    </Row>
                                </Col>
                                <Col size={1} style={styles.rightWrapper}>
                                    <IcoMoon name="chevron-right1"/>
                                </Col>
                            </Row>
                        </TouchableOpacity>
                        <Divider/>
                        <TouchableOpacity>
                            <Row paddingVertical="xl">
                                <Col size={3}>
                                    <Row>
                                        <LinearGradientIcon name="mail"/>
                                        <Text style={styles.label}>Contact Us</Text>
                                    </Row>
                                </Col>
                                <Col size={1} style={styles.rightWrapper}>
                                    <IcoMoon name="chevron-right1"/>
                                </Col>
                            </Row>
                        </TouchableOpacity>
                        <Divider/>
                        <TouchableOpacity>
                            <Row paddingVertical="xl">
                                <Col size={3}>
                                    <Row>
                                        <LinearGradientIcon name="thumb-up"/>
                                        <Text style={styles.label}>Leave Feedback</Text>
                                    </Row>
                                </Col>
                                <Col size={1} style={styles.rightWrapper}>
                                    <IcoMoon name="chevron-right1"/>
                                </Col>
                            </Row>
                        </TouchableOpacity>
                    </Card>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

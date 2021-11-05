import React from 'react';
import DemoFCCard from '../../components/DemoFCCard';
import DemoRequest from '../../components/DemoRequest';
import {TextInput, View} from '../../components/UI';
import {DemoSvg} from '../../components/DemoSvg';
import {shortenTFunctionKey} from '../../providers/i18n-labor';
import {ScrollView} from 'react-native';
import {getContainerStyles, Row} from '../../containers';
import {DemoPureComponent, DemoRegularComponent} from '../../components/DemoPureComponent';
import {getStyles} from './styles';
import {useBunnyKit} from '../../hooks/bunny-kit';
import {DemoCCClock} from '../../components';

function DemoCollectionScreen() {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.DemoCollection');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    return (
        <ScrollView>
            <View style={[containerStyles.Screen, styles.container]}>
                <Row paddingVertical="l">
                    <View style={containerStyles.Card}>
                        <DemoFCCard title={st(`functionComponent`)}/>
                    </View>
                </Row>
                <Row paddingVertical="l">
                    <View style={containerStyles.Card}>
                        <DemoCCClock title={st(`classComponent`)}
                                     tipLabel={st(`tipLabel`)}
                                     goButtonTitle={st(`go`)}
                                     stopButtonTitle={st(`stop`)}/>
                    </View>
                </Row>
                <Row paddingVertical="l">
                    <View style={containerStyles.Card}>
                        <DemoRegularComponent title={st(`iAmRegular`)}
                                              labelBeenRendered={st(`iHaveBeenRendered`)}
                                              labelRenderedUnit={st(`renderedUnit`)}
                        />
                    </View>
                </Row>
                <Row paddingVertical="l">
                    <View style={containerStyles.Card}>
                        <DemoPureComponent title={st(`iAmPure`)}
                                           labelBeenRendered={st(`iHaveBeenRendered`)}
                                           labelRenderedUnit={st(`renderedUnit`)}
                        />
                    </View>
                </Row>
                <Row paddingVertical="l">
                    <View style={containerStyles.Card}>
                        <DemoRequest title={st(`lbRequest`)} buttonTitle={st(`btnRequest`)}/>
                    </View>
                </Row>
                <Row paddingVertical="l">
                    <View style={containerStyles.Card}>
                        <TextInput placeholder={st(`placeholder`)}/>
                    </View>
                </Row>
                <Row paddingVertical="l">
                    <View style={containerStyles.Card}>
                        <DemoSvg/>
                    </View>
                </Row>
            </View>
        </ScrollView>
    );
}

export default DemoCollectionScreen;

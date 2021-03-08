import React from "react";
import DemoFCCard from "../../components/DemoFCCard";
import DemoCCClock from "../../components/DemoCCClock";
import DemoRequest from "../../components/DemoRequest";
import {TextInput, View} from "../../components/UI";
import {DemoSvg} from "../../components/DemoSvg";
import {useTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../providers/i18n-labor";
import {ScrollView} from "react-native";
import {getContainerStyles} from "../../containers";
import {DemoPureComponent, DemoRegularComponent} from "../../components/DemoPureComponent";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";

function DemoCollectionScreen() {

    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.DemoCollection');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

    return (
        <ScrollView>
            <View style={containerStyles.Screen}>
                <View style={containerStyles.Card}>
                    <DemoFCCard title={st(`functionComponent`)}/>
                </View>
                <View style={containerStyles.Card}>
                    <DemoCCClock title={st(`classComponent`)}
                                 tipLabel={st(`tipLabel`)}
                                 goButtonTitle={st(`go`)}
                                 stopButtonTitle={st(`stop`)}/>
                </View>
                <View style={containerStyles.Card}>
                    <DemoRegularComponent title={st(`iAmRegular`)}
                                          labelBeenRendered={st(`iHaveBeenRendered`)}
                                          labelRenderedUnit={st(`renderedUnit`)}
                    />
                </View>
                <View style={containerStyles.Card}>
                    <DemoPureComponent title={st(`iAmPure`)}
                                       labelBeenRendered={st(`iHaveBeenRendered`)}
                                       labelRenderedUnit={st(`renderedUnit`)}
                    />
                </View>
                <View style={containerStyles.Card}>
                    <DemoRequest title={st(`lbRequest`)} buttonTitle={st(`btnRequest`)}/>
                </View>
                <View style={containerStyles.Card}>
                    <TextInput placeholder={st(`placeholder`)}/>
                </View>
                <View style={containerStyles.Card}>
                    <DemoSvg/>
                </View>
            </View>
        </ScrollView>
    );
}

export default DemoCollectionScreen

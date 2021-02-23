import React, {Component} from "react";
import DemoFCCard from "../../components/DemoFCCard";
import DemoCCClock from "../../components/DemoCCClock";
import DemoRequest from "../../components/DemoRequest";
import {View, TextInput} from "../../components/UI";
import {DemoSvg} from "../../components/DemoSvg";
import {WithTranslation, withTranslation} from "react-i18next";
import {stFactory} from "../../providers/i18nLabor/short-t";
import {ScrollView} from "react-native";
import getContainerStyles from "../../containers";
import {DemoPureComponent, DemoRegularComponent} from "../../components/DemoPureComponent";
import {withSizeLabor, WithSizeLabor} from "../../providers/sizeLabor";
import {withThemeLabor} from "../../providers/themeLabor";
import {WithThemeLabor} from "../../types";

export type DemoCollectionProps = { title?: string }
    & WithTranslation & WithSizeLabor & WithThemeLabor
type States = { name: string }

class DemoCollectionScreen extends Component<DemoCollectionProps, States> {
    constructor(props: DemoCollectionProps) {
        super(props);
    }

    render(): React.ReactNode {
        const {t, sizeLabor, themeLabor} = this.props;
        const {theme} = themeLabor;
        const st = stFactory(t, 'screens.DemoCollection');
        const containerStyles = getContainerStyles(sizeLabor, themeLabor);

        return (
            <ScrollView>
                <View style={containerStyles.screen}>
                    <View style={containerStyles.card}>
                        <DemoFCCard title={st(`functionComponent`)}/>
                    </View>
                    <View style={containerStyles.card}>
                        <DemoCCClock title={st(`classComponent`)}
                                     tipLabel={st(`tipLabel`)}
                                     goButtonTitle={st(`go`)}
                                     stopButtonTitle={st(`stop`)}/>
                    </View>
                    <View style={containerStyles.card}>
                        <DemoRegularComponent title={st(`iAmRegular`)}
                                              labelBeenRendered={st(`iHaveBeenRendered`)}
                                              labelRenderedUnit={st(`renderedUnit`)}
                        />
                    </View>
                    <View style={containerStyles.card}>
                        <DemoPureComponent title={st(`iAmPure`)}
                                           labelBeenRendered={st(`iHaveBeenRendered`)}
                                           labelRenderedUnit={st(`renderedUnit`)}
                        />
                    </View>
                    <View style={containerStyles.card}>
                        <DemoRequest title={st(`lbRequest`)} buttonTitle={st(`btnRequest`)}/>
                    </View>
                    <View style={containerStyles.card}>
                        <TextInput placeholder={st(`placeholder`)}/>
                    </View>
                    <View style={containerStyles.card}>
                        <DemoSvg/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default withTranslation()(withSizeLabor(withThemeLabor(DemoCollectionScreen)))

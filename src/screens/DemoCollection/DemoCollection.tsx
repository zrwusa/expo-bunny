import React, {Component} from "react";
import DemoFCCard from "../../components/DemoFCCard";
import DemoCCClock from "../../components/DemoCCClock";
import DemoRequest from "../../components/DemoRequest";
import {View, TextInput} from "../../components/base-ui";
import containerStyle from "../../containers";
import {DemoSvg} from "../../components/DemoSvg";
import {WithTranslation, withTranslation} from "react-i18next";
import {stFactory} from "../../i18n/short-t";

type Props = { title?: string } & WithTranslation
type States = { name: string }

class DemoCollectionScreen extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        const {t} = this.props;
        const i18nPrefix = 'screens.DemoCollection';
        const st = stFactory(t, i18nPrefix);
        return (
            <View style={containerStyle.screen}>
                <View style={containerStyle.card}>
                    <DemoFCCard title={st(`functionComponent`)}/>
                </View>
                <View style={containerStyle.card}>
                    <DemoCCClock title={st(`classComponent`)}
                                 tipLabel={st(`tipLabel`)}
                                 goButtonTitle={st(`go`)}
                                 stopButtonTitle={st(`stop`)}/>
                </View>
                <View style={containerStyle.card}>
                    <DemoRequest title={st(`lbRequest`)} buttonTitle={st(`btnRequest`)}/>
                </View>
                <View style={containerStyle.card}>
                    <TextInput placeholder={st(`placeholder`)}/>
                </View>
                <View style={containerStyle.card}>
                    <DemoSvg/>
                </View>
            </View>
        );
    }
}

export default withTranslation()(DemoCollectionScreen)

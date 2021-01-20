import React, {Component} from "react";
import DemoFCCard from "../../components/DemoFCCard";
import DemoCCClock from "../../components/DemoCCClock";
import DemoRequest from "../../components/DemoRequest";
import {View, TextInput} from "../../components/base-ui";
import styles from "./styles";
import containerStyle from "../../containers/box";
import {DemoSvg} from "../../components/DemoSvg";
import {WithTranslation, withTranslation} from "react-i18next";

type Props = { title?: string } & WithTranslation
type States = { name: string }

class DemoCollectionScreen extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        const {t} = this.props;
        const i18nPrefix = 'screens.DemoCollection';
        return (<View style={styles.container}>
            <View style={containerStyle.box}>
                <DemoFCCard title={t(`${i18nPrefix}.labels.functionComponent`)}/>
            </View>
            <View style={containerStyle.box}>
                <DemoCCClock title={t(`${i18nPrefix}.labels.classComponent`)}
                             tipLabel={t(`${i18nPrefix}.labels.tipLabel`)}
                             goButtonTitle={t(`${i18nPrefix}.buttons.go`)}
                             stopButtonTitle={t(`${i18nPrefix}.buttons.stop`)}/>
            </View>
            <View style={containerStyle.box}>
                <DemoRequest title={t(`${i18nPrefix}.labels.request`)} buttonTitle={t(`${i18nPrefix}.buttons.request`)}/>
            </View>
            <View style={containerStyle.box}>
                <TextInput placeholder={t(`${i18nPrefix}.labels.placeholder`)}/>
            </View>
            <View style={containerStyle.box}>
                <DemoSvg/>
            </View>
        </View>);
    }
}

export default withTranslation()(DemoCollectionScreen)

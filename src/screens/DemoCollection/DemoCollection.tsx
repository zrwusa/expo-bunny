import React, {Component} from "react";
import DemoFCCard from "../../components/DemoFCCard";
import DemoCCClock from "../../components/DemoCCClock";
import DemoRequest from "../../components/DemoRequest";
import {View, TextInput} from "../../components/base-ui";
import styles from "./styles";
import containerStyle from "../../containers/box";
import {DemoSvg} from "../../components/DemoSvg";

type Props = { title?: string }
type States = { name: string }

class DemoCollectionScreen extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        return (<View style={styles.container}>
            <View style={containerStyle.box}>
                <DemoFCCard title="FunctionComponent"/>
            </View>
            <View style={containerStyle.box}>
                <DemoCCClock title="ClassComponent"/>
            </View>
            <View style={containerStyle.box}>
                <DemoRequest title={"Request"}/>
            </View>
            <View style={containerStyle.box}>
                <TextInput placeholder={"Placeholder"}/>
            </View>
            <View style={containerStyle.box}>
                <DemoSvg />
            </View>
        </View>);
    }
}

export default DemoCollectionScreen

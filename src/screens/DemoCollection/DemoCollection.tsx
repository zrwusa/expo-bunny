import React, {Component} from "react";
import DemoFCCard from "../../components/DemoFCCard";
import DemoCCClock from "../../components/DemoCCClock";
import DemoRequest from "../../components/DemoRequest";
import {Text, View, TextInput} from "react-native";

type Props = { title?: string }
type States = { name: string }

class DemoCollectionScreen extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        return (<View>
            <View>
                <DemoFCCard title="FunctionComponent"/>
            </View>
            <View>
                <DemoCCClock title="ClassComponent"/>
            </View>
            <View>
                <DemoRequest title={"Request"}/>
            </View>
            <View>
                <TextInput placeholder={"Placeholder"}/>
            </View>
        </View>);
    }
}

export default DemoCollectionScreen

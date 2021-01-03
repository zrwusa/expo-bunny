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
            <Text>Demo HomeScreen Page</Text>
            <View>
                <DemoFCCard title="DemoFCCard is a FunctionComponent" paragraph="I am paragraph"/>
            </View>
            <View>
                <DemoCCClock title="DemoCCClock is a ClassComponent"/>
            </View>
            <View>
                <DemoRequest title={"DemoRequest is a http request component"}/>
            </View>
            <View>
                <TextInput placeholder={"I am placeholder"}/>
            </View>
        </View>);
    }
}

export default DemoCollectionScreen

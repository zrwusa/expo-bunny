import React, {Component} from "react";
import {View, Text, Button} from "react-native";

type Props = { title: string, }
type States = { time: Date, intervalID: ReturnType<typeof setInterval>, }

class DemoCCClock extends Component<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            time: new Date(),
            intervalID: setInterval((): void => undefined, 0)
        };
        this.go = this.go.bind(this);
        this.stop = this.stop.bind(this);
        this.handleGoClick = this.handleGoClick.bind(this);
        this.handleStopClick = this.handleStopClick.bind(this);
    }

    tick(): void {
        this.setState({
            time: new Date()
        });
    }

    go(): void {
        const intervalID: ReturnType<typeof setInterval> = setInterval(() => this.tick(), 1000);
        this.setState({
            intervalID: intervalID
        });
    }

    stop(): void {
        clearInterval(this.state.intervalID);
    }

    handleGoClick(): void {
        this.go();
    }

    handleStopClick(): void {
        this.stop();
    }

    componentDidMount(): void {
        this.tick();
        this.go();
    }

    render(): React.ReactNode {
        return (<View>
            <Text>{this.props.title}</Text>
            <Text>The current time is {this.state.time.toLocaleTimeString()}</Text>
            <Button onPress={this.handleStopClick} title="Stop"/>
            <Button onPress={this.handleGoClick} title="Go"/>
        </View>);
    }

    componentWillUnmount(): void {
        this.stop();
    }
}

export default DemoCCClock

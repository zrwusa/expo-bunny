import React, {PureComponent} from "react";
import {View, Text, ButtonTO, TextBtn} from "../base-ui";
import {WithSmartStyle, withSmartStyle} from "../../styles/smart-style";

type Props = { title: string, goButtonTitle: string, stopButtonTitle: string, tipLabel: string }
    & WithSmartStyle
type States = { time: Date, intervalID: ReturnType<typeof setInterval> }

class DemoCCClock extends PureComponent<Props, States> {
    constructor(props: Props) {
        super(props);
        this.state = {
            time: new Date(),
            intervalID: setInterval((): void => undefined, 0)
        };
        this.go = this.go.bind(this);
        this.stop = this.stop.bind(this);
    }

    tick(): void {
        this.setState({
            time: new Date()
        });
    }

    go(): void {
        const intervalID: ReturnType<typeof setInterval> = setInterval(() => this.tick(), 1000);
        this.setState({intervalID: intervalID});
    }

    stop() {
        clearInterval(this.state.intervalID);
    }

    componentDidMount() {
        this.tick();
        this.go();
    }

    render(): React.ReactNode {
        const {tipLabel, goButtonTitle, stopButtonTitle} = this.props;
        return (<View>
            <Text>{this.props.title}</Text>
            <Text>{tipLabel}{this.state.time.toLocaleTimeString()}</Text>
            <ButtonTO onPress={this.go}><TextBtn>{goButtonTitle}</TextBtn></ButtonTO>
            <ButtonTO onPress={this.stop}><TextBtn>{stopButtonTitle}</TextBtn></ButtonTO>
        </View>);
    }

    componentWillUnmount() {
        this.stop();
    }
}

// HOC to pass smartStyle
export default withSmartStyle(DemoCCClock);

import React, {Component} from "react";
import {View, Text, ButtonTO, TextBtn} from "../base-ui";
import {WithMeasure, withMeasure} from "../../styles/utils/withMeasure";
import {getStyles} from "./styles";
import {WithResponsive, withResponsive} from "../../styles/responsive/withResponsive";

type Props = { title: string, goButtonTitle: string, stopButtonTitle: string, tipLabel: string }
    & WithMeasure & WithResponsive
type States = { time: Date, intervalID: ReturnType<typeof setInterval> }

class DemoCCClock extends Component<Props, States> {

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
        const {tipLabel, goButtonTitle, stopButtonTitle, measure, responsive} = this.props;
        const styles = getStyles(measure, responsive)
        return (<View>
            <View style={styles.demoMeasureAndResponsive}/>
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

export default withResponsive(withMeasure(DemoCCClock));

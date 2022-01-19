import React, {PureComponent} from 'react';
import {ButtonTO, InButtonText, Text, View} from '../UI';
import {WithSizeLabor, withSizeLabor} from '../../providers/size-labor';

interface Props extends WithSizeLabor {
    title: string,
    goButtonTitle: string,
    stopButtonTitle: string,
    tipLabel: string
}

interface States { time: Date; intervalID: ReturnType<typeof setInterval> }

export class DemoCCClockInner extends PureComponent<Props, States> {
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
            <ButtonTO onPress={this.go}><InButtonText>{goButtonTitle}</InButtonText></ButtonTO>
            <ButtonTO onPress={this.stop}><InButtonText>{stopButtonTitle}</InButtonText></ButtonTO>
        </View>);
    }

    componentWillUnmount() {
        this.stop();
    }
}

export const DemoCCClock = withSizeLabor(DemoCCClockInner);

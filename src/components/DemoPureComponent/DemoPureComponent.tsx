import React, {PureComponent} from "react";
import {View, Text} from "../base-ui";
import {getStyles} from "./styles";
import SizerContent from "../../styles/sizer/SizerContent";

type Props = { title?: string, labelBeenRendered?: string, labelRenderedUnit?: string }

// PureComponent ensures rendering just from props or contexts changing.Not rendered by parent component
export class DemoPureComponent extends PureComponent<Props> {
    // SizerContent and SizerProvider to pass content
    static contextType = SizerContent;
    private count = 0;

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        const {title, labelBeenRendered, labelRenderedUnit} = this.props;
        // this.context is from the SizerProvider
        const sizer = this.context;
        this.count++
        const styles = getStyles(sizer)
        return (<View>
            <Text>{title}</Text>
            <View style={styles.demoSizer}/>
            <Text>{labelBeenRendered} {this.count} {labelRenderedUnit}</Text>
        </View>);
    }
}

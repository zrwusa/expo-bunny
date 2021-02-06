import React, {PureComponent} from "react";
import {View, Text} from "../base-ui";
import {getStyles} from "./styles";
import ResponsiveContext from "../../styles/responsive/responsiveContext";

type Props = { title?: string ,labelBeenRendered?:string,labelRenderedUnit?:string}

// PureComponent ensures rendering just from props or contexts changing.Not rendered by parent component
export class DemoPureComponent extends PureComponent<Props> {
    // ResponsiveContent and ResponsiveProvider to pass content
    static contextType = ResponsiveContext;
    private count = 0;

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        const {title,labelBeenRendered,labelRenderedUnit} = this.props;
        // this.context is from the ResponsiveProvider
        const responsive = this.context;
        this.count ++
        const styles = getStyles(responsive)
        return (<View>
            <Text>{title}</Text>
            <View style={styles.demoResponsive}/>
            <Text>{labelBeenRendered} {this.count} {labelRenderedUnit}</Text>
        </View>);
    }
}

import React, {Component, PureComponent} from "react";
import {View, Text} from "../UI";
import {getStyles} from "./styles";
import {SizeLaborContext} from "../../providers/sizeLabor";
import {ThemeLaborContext} from "../../providers/themeLabor";

type Props = { title?: string, labelBeenRendered?: string, labelRenderedUnit?: string }

// PureComponent ensures rendering just from props or contexts changing.Not rendered by parent component
export class DemoRegularComponent extends Component<Props> {
    // SizeLaborContent and SizeLaborProvider to pass content
    private count = 0;

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        const {title, labelBeenRendered, labelRenderedUnit} = this.props;
        // this.context is from the SizeLaborProvider
        this.count++
        return (
            <SizeLaborContext.Consumer>
                {(sizeLabor) => {
                    return (
                        <ThemeLaborContext.Consumer>
                            {(theme) => {
                                const styles = getStyles(sizeLabor, theme)
                                return <View>
                                    <Text>{title}</Text>
                                    <View style={styles.demoSizeLabor}/>
                                    <Text>{labelBeenRendered} {this.count} {labelRenderedUnit}</Text>
                                </View>
                            }}
                        </ThemeLaborContext.Consumer>
                    )
                }}
            </SizeLaborContext.Consumer>
        );
    }
}

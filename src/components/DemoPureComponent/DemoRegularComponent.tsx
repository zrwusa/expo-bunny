import React, {Component, PureComponent} from "react";
import {View, Text} from "../base-ui";
import {getStyles} from "./styles";
import SizerContext from "../../styles/sizer/SizerContext";
import {ThemeContext} from "../../styles/theme";

type Props = { title?: string, labelBeenRendered?: string, labelRenderedUnit?: string }

// PureComponent ensures rendering just from props or contexts changing.Not rendered by parent component
export class DemoRegularComponent extends Component<Props> {
    // SizerContent and SizerProvider to pass content
    private count = 0;

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        const {title, labelBeenRendered, labelRenderedUnit} = this.props;
        // this.context is from the SizerProvider
        this.count++
        return (
            <SizerContext.Consumer>
                {(sizer) => {
                    return (
                        <ThemeContext.Consumer>
                            {(theme) => {
                                const styles = getStyles(sizer, theme)
                                return <View>
                                    <Text>{title}</Text>
                                    <View style={styles.demoSizer}/>
                                    <Text>{labelBeenRendered} {this.count} {labelRenderedUnit}</Text>
                                </View>
                            }}
                        </ThemeContext.Consumer>
                    )
                }}
            </SizerContext.Consumer>
        );
    }
}

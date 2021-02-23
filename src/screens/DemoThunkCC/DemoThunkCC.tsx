import React from "react";
import {connect} from "react-redux";
import {ButtonRNE, Text, View} from "../../components/UI";
import {demoThunk} from "../../stores/demo-thunk/actions";
import {DemoThunk, RootState} from "../../types/models";
import {DemoThunkPayload} from "../../types";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {WithTranslation, withTranslation} from "react-i18next";
import {stFactory} from "../../providers/i18nLabor/short-t";
import getContainerStyles from "../../containers";
import {WithSizeLabor, withSizeLabor} from "../../providers/sizeLabor";
import {withThemeLabor} from "../../providers/themeLabor";
import {WithThemeLabor} from "../../types";

const mapStateToProps = (rootState: RootState) => ({...rootState.demoThunkState});
const mapDispatchToProps = (dispatch: ThunkDispatch<DemoThunk, void, Action>) => ({
    demoThunk: async (data: DemoThunkPayload) => dispatch(demoThunk(data)),
});
type Props = ReturnType<typeof mapStateToProps>
    & ReturnType<typeof mapDispatchToProps> & WithTranslation
    & WithThemeLabor & WithSizeLabor;

class DemoThunkCCScreen extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleThunk = this.handleThunk.bind(this);
    }

    handleThunk(): void {
        this.props.demoThunk({
            "text": "text-demo",
            "id": 0
        }).then((value) => {
            console.log('hello world, got', value);
        });
    }

    render(): React.ReactNode {
        const {text, id, t, sizeLabor, themeLabor} = this.props;
        const {theme} = themeLabor;
        const st = stFactory(t, 'screens.DemoThunkCC');
        const containerStyles = getContainerStyles(sizeLabor, themeLabor);

        return (
            <View style={containerStyles.screen}>
                <View style={containerStyles.card}>
                    <Text>{st(`text`)}{text}</Text>
                    <Text>{st(`id`)}{id}</Text>
                    <ButtonRNE onPress={this.handleThunk} title={st(`thunkDispatch`)}/>
                </View>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withThemeLabor(withSizeLabor(DemoThunkCCScreen))));

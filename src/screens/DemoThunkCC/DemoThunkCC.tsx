import React from "react";
import {connect} from "react-redux";
import {ButtonRNE, Text, View} from "../../components/base-ui";
import {demoThunk} from "../../stores/demo-thunk/actions";
import {DemoThunk, RootState} from "../../types/models";
import {DemoThunkPayload} from "../../types/payloads";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {WithTranslation, withTranslation} from "react-i18next";
import {stFactory} from "../../lang/short-t";
import getContainerStyles from "../../containers";
import {WithSizer, withSizer} from "../../styles/sizer";
import {withTheme} from "../../styles/theme";
import {WithTheme} from "../../types/styles";

const mapStateToProps = (rootState: RootState) => ({...rootState.demoThunkState});
const mapDispatchToProps = (dispatch: ThunkDispatch<DemoThunk, void, Action>) => ({
    demoThunk: async (data: DemoThunkPayload) => dispatch(demoThunk(data)),
});
type Props = ReturnType<typeof mapStateToProps>
    & ReturnType<typeof mapDispatchToProps> & WithTranslation
    & WithTheme & WithSizer;

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
        const {t, sizer} = this.props;
        const {text, id, theme} = this.props;
        const st = stFactory(t, 'screens.DemoThunkCC');
        const containerStyles = getContainerStyles(sizer, theme);

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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withTheme(withSizer(DemoThunkCCScreen))));

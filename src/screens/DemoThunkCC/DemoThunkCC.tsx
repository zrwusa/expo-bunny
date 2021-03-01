import React from "react";
import {connect} from "react-redux";
import {ButtonRNE, Text, View} from "../../components/UI";
import {demoThunk} from "../../store/actions";
import {DemoThunkPayload, DemoThunkState, RootState} from "../../types";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {WithTranslation, withTranslation} from "react-i18next";
import {shortenTFuciontKey} from "../../providers/i18n-labor";
import {getContainerStyles} from "../../containers";
import {WithSizeLabor, withSizeLabor} from "../../providers/size-labor";
import {WithThemeLabor, withThemeLabor} from "../../providers/theme-labor";

const mapStateToProps = (rootState: RootState) => ({...rootState.demoThunkState});
const mapDispatchToProps = (dispatch: ThunkDispatch<DemoThunkState, void, Action>) => ({
    demoThunk: async (data: DemoThunkPayload) => dispatch(demoThunk(data)),
});

interface Props extends ReturnType<typeof mapStateToProps>
    , ReturnType<typeof mapDispatchToProps>, WithTranslation
    , WithThemeLabor, WithSizeLabor {
};

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
        const st = shortenTFuciontKey(t, 'screens.DemoThunkCC');
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

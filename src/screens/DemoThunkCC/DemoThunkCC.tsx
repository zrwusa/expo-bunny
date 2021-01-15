import React from 'react';
import {connect} from 'react-redux';
import {ButtonRNE, Text, View} from "../../components/base-ui";
import {demoThunk} from "../../stores/demo-thunk/actions";
import {DemoThunk, RootState} from "../../types/models";
import {DemoThunkPayload} from "../../types/payloads";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import containerStyle from "../../containers/box";

const mapStateToProps = (rootState: RootState) => ({...rootState.demoThunkState});
const mapDispatchToProps = (dispatch: ThunkDispatch<DemoThunk, void, Action>) => ({
    demoThunk: async (data: DemoThunkPayload) => dispatch(demoThunk(data)),
});
type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> ;

export class DemoThunkCCScreen extends React.Component<Props> {
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
        const {text, id} = this.props;
        return <View>
            <View style={containerStyle.box}>
                <Text>text:{text}</Text>
                <Text>id:{id}</Text>
                <ButtonRNE onPress={this.handleThunk} title="Thunk dispatch"/>
            </View>
        </View>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DemoThunkCCScreen);

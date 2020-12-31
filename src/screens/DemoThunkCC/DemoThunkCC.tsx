import React from 'react';
import {connect} from 'react-redux';
import {DemoThunkPayload} from "../../stores/payloads";
import {IRootState} from "../../stores/models";
import {IThunkDispatch} from "../../stores/thunk";
import {demoThunk} from "../../stores/demo-thunk/actions";
import {Button, Text, View} from "react-native";

const mapStateToProps = (rootState: IRootState) => ({...rootState.demoThunkState});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
    demoThunk: (data: DemoThunkPayload) => dispatch(demoThunk(data)),
});

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> ;

export class DemoThunkCC extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleThunk = this.handleThunk.bind(this);
    }

    handleThunk(): void {
        this.props.demoThunk({
            "text": "text1",
            "id":0
        }).then(value => {
            console.log('hello world, got', value);
        });
    }

    render(): React.ReactNode {
        const {text,id} = this.props;
        return <View>
            <Text>Demo Thunk CC Page</Text>
            <Button onPress={this.handleThunk} title="Thunk dispatch" />
            <Text>text:{text}</Text>
            <Text>id:{id}</Text>
            <Text>This demo shows you how to use a thunk dispatcher to dispatch data to Redux reducer,As in http request situation thunk works awesome.And shows you how to map states and dispatchers in Class Component(CC)</Text>
        </View>;
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DemoThunkCC);

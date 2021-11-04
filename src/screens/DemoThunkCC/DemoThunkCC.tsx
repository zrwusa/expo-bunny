import React from 'react';
import {connect} from 'react-redux';
import {Button, Text, View} from '../../components/UI';
import {demoThunk} from '../../store/actions';
import {DemoThunkPayload, DemoThunkState, RootState} from '../../types';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {shortenTFunctionKey} from '../../providers';
import {getContainerStyles} from '../../containers';
import {getSharedStyles} from '../../helpers';
import {WithBunnyKit, withBunnyKit} from '../../hooks';

const mapStateToProps = (rootState: RootState) => ({...rootState.demoThunkState});
const mapDispatchToProps = (dispatch: ThunkDispatch<DemoThunkState, void, Action>) => ({
    demoThunk: async (data: DemoThunkPayload) => dispatch(demoThunk(data)),
});

interface Props extends ReturnType<typeof mapStateToProps>
    , ReturnType<typeof mapDispatchToProps>, WithBunnyKit {
}

class DemoThunkCCScreen extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleThunk = this.handleThunk.bind(this);
    }

    handleThunk(): void {
        this.props.demoThunk({
            'text': 'text-demo',
            'id': 0
        }).then((value) => {
            console.log('hello world, got', value);
        });
    }

    render(): React.ReactNode {
        const {text, id, bunnyKit} = this.props;
        const {sizeLabor, themeLabor, t} = bunnyKit;
        const st = shortenTFunctionKey(t, 'screens.DemoThunkCC');
        const containerStyles = getContainerStyles(sizeLabor, themeLabor);
        const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

        return (
            <View style={[containerStyles.Screen, sharedStyles.centralized]}>
                <Text>{st(`text`)}{text}</Text>
                <Text>{st(`id`)}{id}</Text>
                <Button onPress={this.handleThunk} title={st(`thunkDispatch`)}/>
            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withBunnyKit(DemoThunkCCScreen));

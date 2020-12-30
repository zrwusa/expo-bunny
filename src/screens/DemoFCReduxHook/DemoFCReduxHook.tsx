import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {demoHelloStateAction1} from "../../stores/demo-hello/actions";
import {IRootState} from "../../stores/models";
import {Button, Text, View} from "react-native";


const DemoFCReduxHook: React.FunctionComponent<IRootState> = () => {
    const dispatch = useDispatch();
    const demoHelloState = useSelector((store:IRootState) => store.demoHelloState);
    return (<View>
        <Text>Demo FC Redux Hook Page</Text>
        <Button title={"Dispatch something"} onPress={() => dispatch(demoHelloStateAction1({order:demoHelloState.order+1}))}></Button>
        <Text>order:{demoHelloState.order}</Text>
        <Text>This demo shows you to dispatch an action to redux reducer with hook method in Function Component(FC)</Text>
    </View>);
}
export default DemoFCReduxHook

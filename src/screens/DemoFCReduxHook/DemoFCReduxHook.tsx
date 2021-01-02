import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {demoHello} from "../../stores/demo-hello/actions";
import {Button, Text, View} from "react-native";
import {RootState} from "../../types/models";


const DemoFCReduxHookScreen: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const demoHelloState = useSelector((store:RootState) => store.demoHelloState);
    return (<View>
        <Text>Demo FC Redux Hook Page</Text>
        <Button title={"Dispatch something"} onPress={() => dispatch(demoHello({order:demoHelloState.order+1}))} />
        <Text>order:{demoHelloState.order}</Text>
        <Text>This demo shows you to dispatch an action to redux reducer with hook method in Function Component(FC)</Text>
    </View>);
}
export default DemoFCReduxHookScreen;

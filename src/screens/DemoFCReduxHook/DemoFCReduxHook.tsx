import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {demoHello} from "../../stores/demo-hello/actions";
import {RootState} from "../../types/models";
import {ButtonRNE, Text, View} from "../../components/base-ui";

const DemoFCReduxHookScreen: React.FC = () => {
    const dispatch = useDispatch();
    const demoHelloState = useSelector((store: RootState) => store.demoHelloState);
    return (<View>
        <Text>Demo FC Redux Hook Page</Text>
        <ButtonRNE title={"Dispatch something"}
                onPress={() => dispatch(demoHello({order: demoHelloState.order + 1}))}/>
        <Text>order:{demoHelloState.order}</Text>
        <Text>This demo shows you to dispatch an action to redux reducer with hook method in Function Component(FC)</Text>
    </View>);
}
export default DemoFCReduxHookScreen;

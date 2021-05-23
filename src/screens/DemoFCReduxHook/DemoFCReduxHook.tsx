import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {demoHello} from "../../store/actions";
import {Button, Text, View} from "../../components/UI";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {getContainerStyles} from "../../containers";
import {RootState} from "../../types";
import {getSharedStyles} from "../../helpers/shared-styles";
import {useBunnyKit} from "../../hooks/bunny-kit";

function DemoFCReduxHookScreen() {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const st = shortenTFunctionKey(t, 'screens.DemoFCReduxHook');
    const dispatch = useDispatch();
    const demoHelloState = useSelector((rootState: RootState) => rootState.demoHelloState);
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <Text>{st(`order`)}{demoHelloState.order}</Text>
            <Button title={st(`dispatchSomething`)}
                    onPress={() => dispatch(demoHello({order: demoHelloState.order + 1}))}/>
            {/*<Text>This demo shows you to dispatch an action to redux reducer with hook method in Function Component(FC)</Text>*/}
        </View>
    );
}

export default DemoFCReduxHookScreen;

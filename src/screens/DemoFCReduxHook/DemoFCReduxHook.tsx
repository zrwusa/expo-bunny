import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {demoHello} from "../../stores/demo-hello/actions";
import {RootState} from "../../types/models";
import {ButtonRNE, Text, View} from "../../components/base-ui";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../lang/short-t";
import getContainerStyles from "../../containers";

const DemoFCReduxHookScreen: React.FC = () => {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.DemoFCReduxHook');
    const dispatch = useDispatch();
    const demoHelloState = useSelector((store: RootState) => store.demoHelloState);
    const containerStyles = getContainerStyles()

    return (
        <View style={containerStyles.screen}>
            <View style={containerStyles.card}>
                <Text>{st(`order`)}{demoHelloState.order}</Text>
                <ButtonRNE title={st(`dispatchSomething`)}
                           onPress={() => dispatch(demoHello({order: demoHelloState.order + 1}))}/>
                {/*<Text>This demo shows you to dispatch an action to redux reducer with hook method in Function Component(FC)</Text>*/}
            </View>
        </View>
    );
}
export default DemoFCReduxHookScreen;

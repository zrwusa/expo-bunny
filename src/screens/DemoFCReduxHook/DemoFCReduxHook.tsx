import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {demoHello} from "../../store/actions";
import {Button, Text, View} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../providers/i18n-labor";
import {getContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {RootState} from "../../types";

function DemoFCReduxHookScreen() {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.DemoFCReduxHook');
    const dispatch = useDispatch();
    const demoHelloState = useSelector((rootState: RootState) => rootState.demoHelloState);
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

    return (
        <View style={containerStyles.Screen}>
            <View style={containerStyles.Card}>
                <Text>{st(`order`)}{demoHelloState.order}</Text>
                <Button title={st(`dispatchSomething`)}
                        onPress={() => dispatch(demoHello({order: demoHelloState.order + 1}))}/>
                {/*<Text>This demo shows you to dispatch an action to redux reducer with hook method in Function Component(FC)</Text>*/}
            </View>
        </View>
    );
}

export default DemoFCReduxHookScreen;

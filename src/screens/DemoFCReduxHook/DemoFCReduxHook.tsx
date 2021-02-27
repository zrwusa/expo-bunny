import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {demoHello} from "../../actions";
import {ButtonRNE, Text, View} from "../../components/UI";
import {useTranslation} from "react-i18next";
import {stFactory} from "../../providers/i18nLabor";
import getContainerStyles from "../../containers";
import {useSizeLabor} from "../../providers/sizeLabor";
import {useThemeLabor} from "../../providers/themeLabor";
import {RootState} from "../../types";

function DemoFCReduxHookScreen() {
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.DemoFCReduxHook');
    const dispatch = useDispatch();
    const demoHelloState = useSelector((rootState: RootState) => rootState.demoHelloState);
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);

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

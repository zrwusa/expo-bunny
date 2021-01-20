import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {demoHello} from "../../stores/demo-hello/actions";
import {RootState} from "../../types/models";
import {ButtonRNE, Text, View} from "../../components/base-ui";
import containerStyle from "../../containers/box";
import {useTranslation} from "react-i18next";

const DemoFCReduxHookScreen: React.FC = () => {
    const {t} = useTranslation();
    const i18nPrefix = 'screens.DemoFCReduxHook';
    const dispatch = useDispatch();
    const demoHelloState = useSelector((store: RootState) => store.demoHelloState);
    return (
        <View style={containerStyle.box}>
            <Text>{t(`${i18nPrefix}.labels.order`)}{demoHelloState.order}</Text>
            <ButtonRNE title={t(`${i18nPrefix}.buttons.dispatchSomething`)}
                       onPress={() => dispatch(demoHello({order: demoHelloState.order + 1}))}/>
            {/*<Text>This demo shows you to dispatch an action to redux reducer with hook method in Function Component(FC)</Text>*/}
        </View>
    );
}
export default DemoFCReduxHookScreen;

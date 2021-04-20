import React from "react";
import {Button, Text, View} from "../../components/UI";
import {useDispatch, useSelector} from "react-redux";
import {getDemoSagas} from "../../store/actions";
import {RootState} from "../../types";
import {getSharedStyles} from "../../helpers/shared-styles";
import {getContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";


function DemoSagaScreen() {
    const dispatch = useDispatch();
    const demoSagaState = useSelector((rootState: RootState) => rootState.demoSagaState);
    const {items} = demoSagaState;
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <Button onPress={() => {
                dispatch(getDemoSagas({
                    pageNum: 1, pageCount: 10, filter: {
                        text: 'saga1'
                    }
                }))
            }} title="fetchDemoSagas"/>
            {
                items && items.length > 0
                    ? items.map(item => {
                        return <Text key={item.id}>{item.text}</Text>
                    })
                    : null
            }
        </View>
    )
}

export default DemoSagaScreen

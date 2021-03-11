import React from "react";
import {ButtonRNE, Text, TextXXX, View} from "../../components/UI";
import {useDispatch, useSelector} from "react-redux";
import {getDemoSagas} from "../../store/actions";
import {RootState} from "../../types";
import {createSmartStyles} from "../../utils";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {createStyles} from "./styles";


function DemoSagaScreen() {
    const dispatch = useDispatch();
    const demoSagaState = useSelector((rootState: RootState) => rootState.demoSagaState);
    const {items} = demoSagaState;
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor,themeLabor)
    const smartStyles  = createSmartStyles(sizeLabor, themeLabor);
    return (
        <View>
            <TextXXX style={[smartStyles.btn,{backgroundColor:'red'}]}>xxx</TextXXX>
            <ButtonRNE onPress={() => {
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

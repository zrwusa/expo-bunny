import React from "react";
import {ButtonRNE, Text, View} from "../../components/UI";
import {useDispatch, useSelector} from "react-redux";
import {getDemoSagas} from "../../store/actions";
import {RootState} from "../../types";


function DemoSagaScreen() {
    const dispatch = useDispatch();
    const demoSagaState = useSelector((rootState: RootState) => rootState.demoSagaState);
    const {items} = demoSagaState;

    return (
        <View>
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

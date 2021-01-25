import React from "react";
import {View, Text, TextInput, Button} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../types/models";

type Props = { title?: string }

const Sys: React.FC<Props> = ({title}) => {
    const sysState = useSelector((store: RootState) => store.sysState);
    return (
        <View>
            <Text>{title}</Text>
            {
                (sysState.error||sysState.warn)?
                <View>
                    <TextInput value={sysState.error||sysState.warn}/>

                </View>:
                    <></>
            }
            <Button title="clear" onPress={() => {
                console.log('clear success')
            }}/>
        </View>
    );
}
export default Sys;

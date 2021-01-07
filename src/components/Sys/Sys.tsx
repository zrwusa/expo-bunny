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
                sysState.error
                && <View>
                    <TextInput value={sysState.error}/>
                    <Button title="clear" onPress={() => {
                        console.log(111)
                    }}/>
                </View>
            }
        </View>
    );
}
export default Sys;

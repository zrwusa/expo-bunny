import React, {useEffect, useState} from "react";
import {View, Text, TextInput, Button} from "../base-ui";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types/models";
import {useSizer} from "../../styles/sizer";
import {useTheme} from "../../styles/theme";
import {getStyles} from "./styles";
import {sysClearErrors} from "../../stores/sys/actions";

type Props = { title?: string }

const Sys: React.FC<Props> = ({title}) => {
    const sysState = useSelector((store: RootState) => store.sysState);
    const [isShow, setIsShow] = useState(false)
    const sizer = useSizer();
    const theme = useTheme();
    const styles = getStyles(sizer,theme);
    const dispatch = useDispatch();
    useEffect(()=>{
        setIsShow(sysState.error.length>0)
    },[sysState.error.length])
    return (
        isShow
            ? <View style={styles.errorConsole}>
                <Text>{title}</Text>
                {
                    (sysState.error || sysState.warn) ?
                        <View>
                            <TextInput style={styles.errorText} multiline value={sysState.error.join('\n').toString() || sysState.warn.toString()}/>
                        </View> :
                        <></>
                }
                <View style={styles.buttonBox}>
                    <Button title="clear" onPress={() => {
                        dispatch(sysClearErrors({all:true}))
                    }}/>
                    <Button title="close" onPress={() => {
                        setIsShow(false)
                    }}/>
                </View>
            </View>
            : null
    );
}
export default Sys;

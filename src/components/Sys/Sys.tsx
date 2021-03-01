import React, {useEffect, useState} from "react";
import {Button, Text, TextInput, View} from "../UI";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {createStyles} from "./styles";
import {sysClearErrors} from "../../store/actions";

interface Props {
    title?: string
}

const Sys = ({title}: Props) => {
    const sysState = useSelector((store: RootState) => store.sysState);
    const [isShow, setIsShow] = useState(false)
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsShow(sysState.error.length > 0)
    }, [sysState.error.length])
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
                        dispatch(sysClearErrors({all: true}))
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

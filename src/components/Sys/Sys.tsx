import React, {useEffect, useState} from "react";
import {Text, TextButton, TextInput, View} from "../UI";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {getStyles} from "./styles";
import {sysClearErrors} from "../../store/actions";
import {Row} from "../../containers/Row";

interface Props {
    title?: string
}

const Sys = ({title}: Props) => {
    const sysState = useSelector((store: RootState) => store.sysState);
    const [isShow, setIsShow] = useState(false)
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsShow(sysState.errors.length > 0)
    }, [JSON.stringify(sysState.errors)])
    return (
        isShow
            ? <View style={styles.errorConsole}>
                <Text>{title}</Text>
                {
                    (sysState.errors || sysState.warns) ?
                        <View>
                            <TextInput style={styles.errorText} multiline editable={false}
                                       value={sysState.errors.join('\n').toString() || sysState.warns.toString()}/>
                        </View> :
                        <></>
                }
                <Row style={styles.buttonBox}>
                    <TextButton onPress={() => {
                        dispatch(sysClearErrors({all: true}))
                    }}><Text>Clear</Text></TextButton>
                    <TextButton onPress={() => {
                        setIsShow(false)
                    }}><Text>Close</Text></TextButton>
                </Row>
            </View>
            : null
    );
}
export default Sys;

import React, {useEffect, useState} from "react";
import {Button, Text, TextInput, View} from "../UI";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {createStyles} from "./styles";
import {blInfoClearInfos} from "../../store/actions/";

interface Props {
    title?: string
}

const BLInfo = ({title}: Props) => {
    const blInfoState = useSelector((store: RootState) => store.blInfoState);
    const [isShow, setIsShow] = useState(false)
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsShow(blInfoState.infos.length > 0)
    }, [blInfoState.infos.length])
    const xxx = blInfoState.infos.map((infos) => {
        return JSON.stringify(infos) + '\n'
    })
    return (
        isShow
            ? <View style={styles.errorConsole}>
                <Text>{title}</Text>
                {
                    (blInfoState.infos) ?
                        <View>
                            <TextInput style={styles.errorText} multiline value={xxx.toString()}/>
                        </View> :
                        <></>
                }
                <View style={styles.buttonBox}>
                    <Button title="clear" onPress={() => {
                        dispatch(blInfoClearInfos({all: true}))
                    }}/>
                    <Button title="close" onPress={() => {
                        setIsShow(false)
                    }}/>
                </View>
            </View>
            : null
    );
}
export default BLInfo;

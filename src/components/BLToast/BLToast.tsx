import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {createStyles} from "./styles";
import {Snackbar} from "react-native-paper";
import {Text, View} from "../UI"
import {clearBLResults} from "../../store/actions";

const BLToast = () => {
    const blInfoState = useSelector((store: RootState) => store.blInfoState);
    const [isShow, setIsShow] = useState(false)
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsShow(blInfoState.results.length > 0)
    }, [JSON.stringify(blInfoState.results)])
    const results = blInfoState.results.map((result) => {
        return result.message + '\n'
    })
    const latestResult = results[results.length - 1]
    console.log('isShow', isShow)
    return (
        <Snackbar
            visible={isShow}
            duration={Snackbar.DURATION_SHORT}
            onDismiss={() => {
                setIsShow(false)
            }}
            // action={{
            //     label: 'Close',
            //     onPress: () => {
            //         setIsShow(false)
            //     },
            // }}
            action={{
                label: 'Clear',
                onPress: () => {
                    dispatch(clearBLResults({all: true}))
                },
            }}
        >
            <View>
                <Text style={styles.text}>{latestResult}</Text>
            </View>
        </Snackbar>
    );
}
export default BLToast;

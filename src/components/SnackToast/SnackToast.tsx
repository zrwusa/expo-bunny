import React, {useEffect, useState} from "react";
import {Text, View} from "../UI";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {createStyles} from "./styles";
import {Snackbar} from "react-native-paper";



const SnackToast = () => {
    const sysState = useSelector((store: RootState) => store.sysState);
    const [isShow, setIsShow] = useState(true)
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsShow(sysState.error.length > 0)
    }, [JSON.stringify(sysState.error)])
    return (
        <Snackbar
            visible={isShow}
            duration={Snackbar.DURATION_MEDIUM}
            onDismiss={() => {
                // setIsShow(false)
            }}
            action={{
                label: 'Close',
                onPress: () => {
                    setIsShow(false)
                    // Do something
                },
            }}

            // style={styles.snackbar}
        >
           {sysState.error.join('\n').toString()}
        </Snackbar>
    );
}
export default SnackToast;

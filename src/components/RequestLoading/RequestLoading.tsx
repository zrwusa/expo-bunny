import React, {useEffect, useState} from "react";
import {View} from "../UI";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {getStyles} from "./styles";
import {ActivityIndicator} from "react-native";

const RequestLoading = () => {
    const {requestStatuses} = useSelector((store: RootState) => store.sysState);
    const [isShow, setIsShow] = useState(false)
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch();
    useEffect(() => {
        const loadingRequests = requestStatuses.filter(item => item.status === 'LOADING')
        setIsShow(loadingRequests.length > 0)
    }, [JSON.stringify(requestStatuses)])
    return (
        isShow
            ? <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
            : null
    );
}
export default RequestLoading;

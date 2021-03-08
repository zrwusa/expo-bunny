import React, {useEffect, useState} from "react";
import {View} from "../UI";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../types";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {createStyles} from "./styles";
import {ActivityIndicator} from "react-native";

interface Props {
    title?: string
}

const RequestLoading = ({title}: Props) => {
    const sysState = useSelector((store: RootState) => store.sysState);
    const [isShow, setIsShow] = useState(false)
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = createStyles(sizeLabor, themeLabor);
    const dispatch = useDispatch();
    useEffect(() => {
        const  fetchingRequests = sysState.requestStatuses.filter(item=>item.status ==='FETCHING')
        setIsShow(fetchingRequests.length > 0)
    }, [JSON.stringify(sysState.requestStatuses)])
    return (
        isShow
            ? <View style={styles.container}>
                <ActivityIndicator size="large"/>
                {/*{text*/}
                {/*    ? typeof text === 'string'*/}
                {/*        ? <Text style={styles.text}>*/}
                {/*            {text}*/}
                {/*        </Text>*/}
                {/*        : {text}*/}
                {/*    : null*/}
                {/*}*/}
            </View>
            : null
    );
}
export default RequestLoading;

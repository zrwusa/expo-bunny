import React from "react";
import {useSelector} from "react-redux";
import {IRootState} from "../../../stores/models";
import {Text, View} from "react-native";

interface Props {
    title?: string,
}

const DemoHeader: React.FC<Props> = ({title}) => {
    const {user} = useSelector((store:IRootState) => store.userState);

    return (<View>
                <Text>Header</Text>
                <Text>{title}</Text>
                <Text>{user.nickname}</Text>
            </View>);
}

export default DemoHeader;

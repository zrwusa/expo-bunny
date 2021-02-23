import React from "react";
import {View, Text} from "../UI";

type Props = { title: string, paragraph?: string, }

const DemoFCCard: React.FC<Props> = ({title, paragraph, children}) => {
    return (<View>
        <Text>{title}</Text>
        {/*we can use children even though we haven't defined them in our FCCardProps*/}
        {children}
    </View>);
}
export default DemoFCCard;

import React from "react";
import {ScrollView} from "react-native";
import {DemoTextThemedRN, DemoTOButtonThemedRN} from "../../components/base-ui";

const DemoThemeScreen = () => {
    return (<ScrollView>
        <DemoTOButtonThemedRN><DemoTextThemedRN>Demo</DemoTextThemedRN></DemoTOButtonThemedRN>
    </ScrollView>);
}

export default DemoThemeScreen;

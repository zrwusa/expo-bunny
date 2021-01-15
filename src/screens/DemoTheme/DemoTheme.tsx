import React from "react";
import {ScrollView, View} from "react-native";
import {DemoTextThemedRN, DemoTOButtonThemedRN} from "../../components/base-ui";
import {Button as ButtonP, Text as TextP} from "react-native-paper";

const DemoThemeScreen = () => {
    return (<ScrollView>
        <DemoTOButtonThemedRN><DemoTextThemedRN>Demo</DemoTextThemedRN></DemoTOButtonThemedRN>
        <ButtonP ><TextP>Button from paper</TextP></ButtonP>

    </ScrollView>);
}

export default DemoThemeScreen;

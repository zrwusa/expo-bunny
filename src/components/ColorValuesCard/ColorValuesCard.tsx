import {ColorDiffWithPaletteItem, ColorDiffWithThemeColorsItem, ColorInputItem} from "../../types";
import {Text, View} from "../UI";
import {CopyableText} from "../CopyableText";
import React from "react";
import {getStyles} from "./styles";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";

export const ColorValuesCard = (props: { item: ColorDiffWithThemeColorsItem | ColorDiffWithPaletteItem | ColorInputItem }) => {
    const {item} = props
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const styles = getStyles(sizeLabor, themeLabor)
    return <View>
        <Row>
            <Col size={1}>
                <Text>hex</Text>
                <Text>RGB</Text>
                <Text>HSL</Text>
            </Col>
            <Col size={2}>
                <CopyableText>{item.hex}</CopyableText>
                <CopyableText>{item.RGB}</CopyableText>
                <CopyableText>{item.HSL}</CopyableText>
            </Col>
            <Col size={1}>
                <View style={[styles.colorPanel, {backgroundColor: item.hex}]}/>
                <View style={[styles.colorPanel, {backgroundColor: item.RGB}]}/>
                <View style={[styles.colorPanel, {backgroundColor: item.HSL}]}/>
            </Col>
        </Row>
    </View>
}

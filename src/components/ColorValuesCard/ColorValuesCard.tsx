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
        <Row size="m">
            <Col size={1}>
                <Text>hex</Text>
            </Col>
            <Col size={2}>
                <CopyableText>{item.hex}</CopyableText>
            </Col>
            <Col size={1}>
                <View style={[styles.colorPanel, {backgroundColor: item.hex}]}/>
            </Col>
        </Row>
        <Row size="m">
            <Col size={1}>
                <Text>RGB</Text>
            </Col>
            <Col size={2}>
                <CopyableText>{item.RGB}</CopyableText>
            </Col>
            <Col size={1}>
                <View style={[styles.colorPanel, {backgroundColor: item.RGB}]}/>
            </Col>
        </Row>
        <Row size="m">
            <Col size={1}>
                <Text>HSL</Text>
            </Col>
            <Col size={2}>
                <CopyableText>{item.HSL}</CopyableText>
            </Col>
            <Col size={1}>
                <View style={[styles.colorPanel, {backgroundColor: item.HSL}]}/>
            </Col>
        </Row>
    </View>
}

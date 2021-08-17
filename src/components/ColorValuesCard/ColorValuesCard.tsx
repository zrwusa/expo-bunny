import {ColorDiffWithPaletteItem, ColorDiffWithThemeColorsItem, ColorInputItem} from '../../types';
import {Text, View} from '../UI';
import {CopyableText} from '../CopyableText';
import React from 'react';
import {getStyles} from './styles';
import {Row} from '../../containers/Row';
import {Col} from '../../containers/Col';
import {useBunnyKit} from '../../hooks/bunny-kit';

export const ColorValuesCard = (props: { item: ColorDiffWithThemeColorsItem | ColorDiffWithPaletteItem | ColorInputItem }) => {
    const {sizeLabor, themeLabor} = useBunnyKit();
    const {item} = props
    const styles = getStyles(sizeLabor, themeLabor)
    return <View>
        <Row paddingVertical="m">
            <Col size={1}>
                <Text>Hex</Text>
            </Col>
            <Col size={2}>
                <Row>
                    <Col>
                        <CopyableText>{item.Hex}</CopyableText>
                    </Col>
                    <Col>
                        <CopyableText>{item.Hex.toLowerCase()}</CopyableText>
                    </Col>
                </Row>
            </Col>
            <Col size={1}>
                <View style={[styles.colorPanel, {backgroundColor: item.Hex}]}/>
            </Col>
        </Row>
        <Row paddingVertical="m">
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
        <Row paddingVertical="m">
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

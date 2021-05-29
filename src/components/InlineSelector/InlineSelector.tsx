import {GestureResponderEvent, TouchableOpacity} from "react-native";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {getSharedStyles} from "../../helpers/shared-styles";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";
import {IcoMoon, Text} from "../UI";
import * as React from "react";

export interface InlineProps {
    title: string,
    renderText?: () => string,
    onPress?: (event: GestureResponderEvent) => void
}

export const InlineSelector = (props: InlineProps) => {
    const {title, renderText, onPress} = props;
    const {sizeLabor, themeLabor, wp, t, colors, user} = useBunnyKit();
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    return <TouchableOpacity onPress={(e) => {
        onPress?.(e)
    }}>
        <Row style={{padding: wp(10)}}>
            <Col size={4}>
                <Text style={sharedStyles.text}>{title}</Text>
            </Col>
            <Col size={8} align="flex-end">
                <Text numberOfLines={1} style={sharedStyles.text2}>
                    {renderText?.()}
                </Text>
            </Col>
            <Col size={1} align="flex-end">
                <IcoMoon name="chevron-right1" color={colors.text2}/>
            </Col>
        </Row>
    </TouchableOpacity>
}

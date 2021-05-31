import {FlexAlignType, GestureResponderEvent, StyleProp, TextStyle, TouchableOpacity} from "react-native";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {getSharedStyles} from "../../helpers/shared-styles";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";
import {IcoMoon, Text} from "../UI";
import * as React from "react";

export interface InlineProps {
    title?: string,
    renderText?: () => string,
    onPress?: (event: GestureResponderEvent) => void,
    columns?: [number, number, number],
    isShowChevron?: boolean,
    titleStyle?: StyleProp<TextStyle>,
    textStyle?: StyleProp<TextStyle>,
    textAlign?: FlexAlignType,
}

export const InlineSelector = (props: InlineProps) => {
    const {title, renderText, onPress, columns = [4, 8, 1], isShowChevron = true, titleStyle, textStyle, textAlign = 'flex-end'} = props;
    const {sizeLabor, themeLabor, wp, t, colors, user} = useBunnyKit();
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    return <TouchableOpacity onPress={(e) => {
        onPress?.(e)
    }}>
        <Row style={{padding: wp(10)}}>
            <Col size={columns[0]}>
                {
                    title
                        ? <Text style={[sharedStyles.text, titleStyle]}>{title}</Text>
                        : null
                }
            </Col>
            <Col size={columns[1]} align={textAlign}>
                <Text numberOfLines={1} style={[sharedStyles.text2, textStyle]}>
                    {renderText?.()}
                </Text>
            </Col>
            <Col size={columns[2]} align="flex-end">
                {
                    isShowChevron
                        ? <IcoMoon name="chevron-right1" color={colors.text2}/>
                        : null
                }
            </Col>
        </Row>
    </TouchableOpacity>
}

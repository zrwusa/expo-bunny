import * as React from "react";
import {View} from "react-native";
import {getStyles} from "./styles";
import {Text} from "../../../../components/UI"
import {Col, Row} from "../../../../containers";
import {LinearGradientIcon} from "../../../../components/LinearGradientIcon";
import {useBunnyKit} from "../../../../hooks/bunny-kit";

export interface BodyPartCardProps {
    title?: string,
    children?: React.ReactNode,
    bodyPart: string,
    date: string
}

export function BodyPartCard(props: BodyPartCardProps) {
    const {sizeLabor, themeLabor, colors, ms} = useBunnyKit();
    const {title, children, bodyPart, date} = props;
    const styles = getStyles(sizeLabor, themeLabor)
    return <View style={styles.bodyPartCard}>
        <Row style={{alignItems: 'flex-start'}}>
            <Col size={3} style={{alignItems: 'flex-end'}}>
                <View style={{backgroundColor: colors.surface2, padding: 10, borderRadius: 100}}>
                    <LinearGradientIcon size={30} name="puzzle"/>
                </View>
            </Col>
            <Col size={1} style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                <Text style={{color: colors.btnBackground, fontWeight: 'bold', fontSize: ms.fs.l, lineHeight: 10}}>...</Text>
            </Col>
        </Row>
        <Row style={{justifyContent: 'center', marginTop: 10}}>
            <Text>{bodyPart}</Text>
        </Row>
        <Row style={{justifyContent: 'center', marginTop: 6}}>
            <Text>{date}</Text>
        </Row>
    </View>
}

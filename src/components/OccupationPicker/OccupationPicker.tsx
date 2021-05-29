import {ButtonTO, IcoMoon, InButtonText, Text, TextButton, View} from "../UI";
import {Row} from "../../containers/Row";
import {Col} from "../../containers/Col";
import * as React from "react";
import {useState} from "react";
import {useBunnyKit} from "../../hooks/bunny-kit";
import {getSharedStyles} from "../../helpers/shared-styles";
import {getStyles} from "./styles";


export interface Occupation {
    name: string,
    code: string,
}

export interface OccupationPickerProps {
    onDone?: (result?: Occupation) => void,
    onCancel?: () => void,
    initialOccupation?: Occupation,
    title?: string,
}

export const OccupationPicker = (props: OccupationPickerProps) => {
    const {sizeLabor, themeLabor, wp, colors} = useBunnyKit();
    const {
        onDone,
        onCancel,
        title = 'title',
        initialOccupation,
    } = props;
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const [occupation, setOccupation] = useState(initialOccupation)

    const _reset = () => {

    }

    return <View style={[styles.container]}>
        <View style={styles.header}>
            <Row>
                <Col><TextButton onPress={() => {
                    onCancel?.()
                }}><IcoMoon name="x"/></TextButton></Col>
                <Col align="center"><Text>{title}</Text></Col>
                <Col align="flex-end"><TextButton onPress={_reset}><Text style={sharedStyles.text2}>Reset</Text></TextButton></Col>
            </Row>
        </View>
        <View style={styles.content}>
            <View style={{paddingVertical: wp(10)}}>
                <Text>Todo</Text>
            </View>
        </View>
        <View style={[styles.footer]}>
            <ButtonTO onPress={() => {
                onDone?.(occupation)
            }}><InButtonText>Done</InButtonText></ButtonTO>
        </View>
    </View>
}

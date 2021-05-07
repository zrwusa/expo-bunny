import {useTranslation} from "react-i18next";
import {useLinkTo} from "@react-navigation/native";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {Col, getContainerStyles, Row} from "../../containers";
import {useAuthLabor} from "../../providers/auth-labor";
import {IcoMoon, Link, Text} from "../UI";
import {LinearGradientIcon} from "../LinearGradientIcon";
import {TouchableOpacity} from "react-native";
import * as React from "react";
import {IcoMoonKeys} from "../../types";
import {getStyles} from "./styles";

export interface LineToProps {
    iconName: IcoMoonKeys,
    iconSize?: number,
    text: string,
    to?: string,
    type: 'LINK' | 'LINK_TO' | 'NAV',
    onNav?: () => void
}

export function InlineJump(props: LineToProps) {
    const {t} = useTranslation();
    const linkTo = useLinkTo();
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor)
    const {authFunctions} = useAuthLabor()
    const {wp} = sizeLabor.designsBasedOn.iphoneX;
    const {iconName, iconSize = wp(22), text, to, type, onNav} = props;

    const {colors} = themeLabor.theme
    const iconColor = {color: colors.buttonText};
    return type === 'LINK'
        ? to ? <Link to={to}>
            <Row paddingVertical="xl">
                <Col size={3}>
                    <Row>
                        <LinearGradientIcon size={iconSize} name={iconName}/>
                        <Text style={styles.label}>{text}</Text>
                    </Row>
                </Col>
                <Col size={1} style={styles.rightWrapper}>
                    <IcoMoon name="chevron-right1"/>
                </Col>
            </Row>
        </Link> : null
        : <TouchableOpacity onPress={() => {
            switch (type) {
                case "LINK_TO":
                    if (to) {
                        linkTo(to)
                    }

                    break;
                case "NAV":
                    if (onNav) {
                        onNav()
                    }
                    break;
            }
        }

        }>
            <Row paddingVertical="xl">
                <Col size={3}>
                    <Row>
                        <LinearGradientIcon size={wp(iconSize)} name={iconName}/>
                        <Text style={styles.label}>{text}</Text>
                    </Row>
                </Col>
                <Col size={1} style={styles.rightWrapper}>
                    <IcoMoon name="chevron-right1"/>
                </Col>
            </Row>
        </TouchableOpacity>

}

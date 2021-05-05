import React from "react";
import {Image, View} from "react-native";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {Col, getContainerStyles, Row} from "../../../containers";
import {getSharedStyles} from "../../../helpers/shared-styles";
import {IcoMoon} from "../../../components/UI";

export interface CardItemProps {
    description?: string;
    hasActions?: boolean;
    hasVariant?: boolean;
    image: any;
    isOnline?: boolean;
    matches?: string;
    name: string;
}

const CardItem = ({description, hasActions, hasVariant, image, isOnline, matches, name,}: CardItemProps) => {

    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {colors} = themeLabor.theme;
    const {wp} = sizeLabor.designsBasedOn.iphoneX
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles, sharedStylesFlatten} = getSharedStyles(sizeLabor, themeLabor);
    const imageStyle = [
        {
            borderRadius: wp(22),
            width: hasVariant ? wp(375 / 2 - 30) : wp(375 - 80),
            height: hasVariant ? wp(170) : wp(350),
            margin: hasVariant ? 0 : wp(10),
        },
    ];

    return (
        <View style={{
            ...sharedStylesFlatten.shadowThin,
            backgroundColor: "#ffffff",
            borderRadius: wp(16),
            alignItems: "center",
            margin: wp(10),
        }}>
            <Image source={image} style={imageStyle}/>
            <Row style={{height: wp(80)}}>
                <Col size={1}>
                </Col>
                <Col size={3} align="center">
                    <View style={[sharedStyles.centralized,{width: wp(50), height: wp(50), borderRadius: wp(30), backgroundColor: colors.btnBackground2}]}>
                        <IcoMoon name="cancel" color={colors.primary} />
                    </View>
                </Col>

                <Col size={3} align="center">
                    <View style={[sharedStyles.centralized,{width: wp(50), height: wp(50), borderRadius: wp(30), backgroundColor: colors.btnBackground}]}>
                        <IcoMoon name="heart" color={colors.buttonText} />
                    </View>
                </Col>
                <Col size={1}>
                </Col>
            </Row>
        </View>
    );
};

export default CardItem;

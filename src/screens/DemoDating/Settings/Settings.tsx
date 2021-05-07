import * as React from "react";
import {View} from "../../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {DemoDatingTabStackParam} from "../../../types";
import {useTranslation} from "react-i18next";
import {shortenTFunctionKey} from "../../../providers/i18n-labor";
import {Col, getContainerStyles, Row} from "../../../containers";
import {useSizeLabor} from "../../../providers/size-labor";
import {useThemeLabor} from "../../../providers/theme-labor";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {getSharedStyles} from "../../../helpers/shared-styles";
import {ImageUploader} from "../../../components/ImageUploader";
import {getStyles} from "./styles";
import {ImageURISource} from "react-native";

type DatingSettingsRouteProp = RouteProp<DemoDatingTabStackParam, 'DatingSettings'>;
type DatingSettingsNavigationProp = BottomTabNavigationProp<DemoDatingTabStackParam, 'DatingSettings'>;

export interface DatingSettingsProps {
    route: DatingSettingsRouteProp,
    navigation: DatingSettingsNavigationProp
}

function DatingSettingsScreen({route, navigation}: DatingSettingsProps) {
    const {t} = useTranslation();
    const st = shortenTFunctionKey(t, 'screens.DatingSettings');
    const sizeLabor = useSizeLabor();
    const {wp} = sizeLabor.designsBasedOn.iphoneX
    const themeLabor = useThemeLabor();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const _imageUploaderError = (e: Error) => {
        console.error('---_imageUploaderError', e)
    }
    const _removePhoto = (source: ImageURISource) => {
        console.log('---need remove', source)
    }
    return (
        <View style={[containerStyles.Screen]}>
            <View style={styles.container}>
                <View style={{height: wp(360), width: wp(360)}}>
                    <Row size={2}>
                        <Col size={2}>
                            <ImageUploader
                                source={{uri: "https://firebasestorage.googleapis.com/v0/b/expo-react-bunny.appspot.com/o/1747178c-a650-41c6-9322-f75dcdbd90b6?alt=media&token=fc693d8f-2a41-456d-9932-a9eb0c3a49b1"}}
                                isFullFill
                                onValueChanged={(value) => {
                                    console.log('---onValueChanged', value)
                                }}
                                onUploaded={(uploadedResult) => {
                                    console.log('---uploadedResult', uploadedResult)
                                }}
                                onRemovePhoto={_removePhoto}
                                onError={_imageUploaderError}
                            />
                        </Col>
                        <Col size={1} style={{marginLeft: wp(2)}}>
                            <Row size={1}>
                                <ImageUploader isFullFill/>
                            </Row>
                            <Row size={1} style={{marginTop: wp(2)}}>
                                <ImageUploader isFullFill/>
                            </Row>
                        </Col>
                    </Row>
                    <Row size={1} style={{marginTop: wp(2)}}>
                        <Col size={1}><ImageUploader isFullFill/></Col>
                        <Col size={1} style={{marginLeft: wp(2)}}><ImageUploader isFullFill/></Col>
                        <Col size={1} style={{marginLeft: wp(2)}}><ImageUploader isFullFill/></Col>
                    </Row>
                </View>
            </View>
        </View>
    );
}

export default DatingSettingsScreen;

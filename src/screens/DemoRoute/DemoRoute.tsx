import * as React from "react";
import {Text, View} from "../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types";
import {createStyles} from "./styles";
import {useTranslation} from 'react-i18next';
import {shortenTFuciontKey} from "../../providers/i18n-labor";
import {getContainerStyles} from "../../containers";
import {useSizeLabor} from "../../providers/size-labor";
import {useThemeLabor} from "../../providers/theme-labor";
import {createSmartStyles} from "../../utils";

type ProfileRouteProp = RouteProp<RootStackParam, 'DemoRoute'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'DemoRoute'>;

export interface DemoRouteProps {
    route: ProfileRouteProp;
    navigation: ProfileNavigationProp;
}

function DemoRouteScreen(props: DemoRouteProps) {

    const {id, isHuman, sort} = props.route.params;
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {t} = useTranslation();
    const st = shortenTFuciontKey(t, 'screens.DemoRoute');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor)
    const smartStyles = createSmartStyles(sizeLabor, themeLabor);
    const styles = createStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, smartStyles.centralized]}>
            <View style={styles.wrap}>
                <Text style={smartStyles.paragraph}>
                    {st(`paramId`)}{id}{'\n'}
                    {st(`typeofId`)}{typeof id}{'\n'}
                    {st(`paramIsHuman`)}{isHuman.toString()}{'\n'}
                    {st(`typeofIsHuman`)}{typeof isHuman}{'\n'}
                    {st(`paramSort`)}{sort}{'\n'}
                    {st(`typeofSort`)}{typeof sort}{'\n'}
                </Text>
            </View>
        </View>
    );
}

export default DemoRouteScreen;

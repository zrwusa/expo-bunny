import * as React from "react";
import {Text, View} from "../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types";
import {getStyles} from "./styles";
import {useTranslation} from 'react-i18next';
import {stFactory} from "../../providers/i18nLabor";
import getContainerStyles from "../../containers";
import {useSizeLabor} from "../../providers/sizeLabor";
import {useThemeLabor} from "../../providers/themeLabor";
import getSmartStyles from "../../utils/smartStyles";

type ProfileRouteProp = RouteProp<RootStackParam, 'DemoRoute'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'DemoRoute'>;

export type DemoRouteProps = { route: ProfileRouteProp; navigation: ProfileNavigationProp; }

function DemoRouteScreen(props: DemoRouteProps) {

    const {id, isHuman, sort} = props.route.params;
    const sizeLabor = useSizeLabor();
    const themeLabor = useThemeLabor();
    const {t} = useTranslation();
    const st = stFactory(t, 'screens.DemoRoute');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor)
    const smartStyles = getSmartStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.screen, containerStyles.centralized]}>
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

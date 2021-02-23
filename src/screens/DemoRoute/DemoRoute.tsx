import React, {Component} from 'react';
import {View, Text} from "../../components/UI";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types";
import {getStyles} from "./styles";
import {withTranslation, WithTranslation} from 'react-i18next';
import {stFactory} from "../../providers/i18nLabor/short-t";
import getContainerStyles from "../../containers";
import {withSizeLabor, WithSizeLabor} from "../../providers/sizeLabor";
import {WithThemeLabor} from "../../types";
import {withThemeLabor} from "../../providers/themeLabor";
import getSmartStyles from "../../utils/smartStyles";

type ProfileRouteProp = RouteProp<RootStackParam, 'DemoRoute'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'DemoRoute'>;

export type DemoRouteProps = { route: ProfileRouteProp; navigation: ProfileNavigationProp; }
    & WithTranslation & WithSizeLabor & WithThemeLabor;

class DemoRouteScreen extends Component<DemoRouteProps> {
    constructor(props: DemoRouteProps) {
        super(props);
    }

    render(): React.ReactNode {
        const {id, isHuman, sort} = this.props.route.params;
        const {t, sizeLabor, themeLabor} = this.props;
        const {theme} = themeLabor;
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
}

export default withTranslation()(withSizeLabor(withThemeLabor(DemoRouteScreen)));

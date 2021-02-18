import React, {Component} from 'react';
import {View, Text} from "../../components/base-ui";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParam} from "../../types/stacks";
import {getStyles} from "./styles";
import {withTranslation, WithTranslation} from 'react-i18next';
import {stFactory} from "../../lang/short-t";
import getContainerStyles from "../../containers";
import {withSizer, WithSizer} from "../../styles/sizer";
import {WithTheme} from "../../types/styles";
import {withTheme} from "../../styles/theme";
import getSmartStyles from "../../styles/utils/smartStyles";

type ProfileRouteProp = RouteProp<RootStackParam, 'DemoRoute'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'DemoRoute'>;

export type DemoRouteProps = { route: ProfileRouteProp; navigation: ProfileNavigationProp; }
    & WithTranslation & WithSizer & WithTheme;

class DemoRouteScreen extends Component<DemoRouteProps> {
    constructor(props: DemoRouteProps) {
        super(props);
    }

    render(): React.ReactNode {
        const {id, isHuman, sort} = this.props.route.params;
        const {t, sizer, theme} = this.props;
        const st = stFactory(t, 'screens.DemoRoute');
        const containerStyles = getContainerStyles(sizer, theme)
        const smartStyles = getSmartStyles(sizer, theme);
        const styles = getStyles(sizer,theme);

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

export default withTranslation()(withSizer(withTheme(DemoRouteScreen)));

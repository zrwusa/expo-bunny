import * as React from 'react';
import {Text, View} from '../../components/UI';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParam} from '../../types';
import {getStyles} from './styles';
import {shortenTFunctionKey} from '../../providers';
import {getContainerStyles} from '../../containers';
import {getSharedStyles} from '../../helpers';
import {useBunnyKit} from '../../hooks';

type ProfileRouteProp = RouteProp<RootStackParam, 'DemoRoute'>;
type ProfileNavigationProp = StackNavigationProp<RootStackParam, 'DemoRoute'>;

export interface DemoRouteProps {
    route: ProfileRouteProp;
    navigation: ProfileNavigationProp;
}

function DemoRouteScreen(props: DemoRouteProps) {
    const {sizeLabor, themeLabor, t} = useBunnyKit();
    const {id, isHuman, sort} = props.route.params;
    const st = shortenTFunctionKey(t, 'screens.DemoRoute');
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const {sharedStyles} = getSharedStyles(sizeLabor, themeLabor);

    const styles = getStyles(sizeLabor, themeLabor);

    return (
        <View style={[containerStyles.Screen, sharedStyles.centralized]}>
            <View style={styles.wrap}>
                <Text style={sharedStyles.paragraph}>
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

import {useLinkTo} from '@react-navigation/native';
import {Col, getContainerStyles, Row} from '../../containers';
import {useAuthLabor} from '../../providers';
import {IcoMoon, Link, Text} from '../UI';
import {LinearGradientIcon} from '../LinearGradientIcon';
import {TouchableOpacity} from 'react-native';
import * as React from 'react';
import {IcoMoonKeys} from '../../types';
import {getStyles} from './styles';
import {useBunnyKit} from '../../hooks';

export interface LineToProps {
    iconName?: IcoMoonKeys,
    iconSize?: number,
    text?: string,
    to?: string,
    type: 'LINK' | 'LINK_TO' | 'NAV',
    onNav?: () => void
}

export const InlineJump: React.FC<LineToProps> = (props) => {
    const {sizeLabor, themeLabor, wp} = useBunnyKit();
    const linkTo = useLinkTo();
    const containerStyles = getContainerStyles(sizeLabor, themeLabor);
    const styles = getStyles(sizeLabor, themeLabor);
    const {authFunctions} = useAuthLabor();
    const {iconName, iconSize = wp(22), text, to, type, onNav, children} = props;
    const {colors} = themeLabor.theme;
    const iconColor = {color: colors.buttonText};
    return type === 'LINK'
        ?
        to ? <Link to={to}>
            {
                children
                    ? children
                    : <Row paddingVertical="xl">
                        <Col size={3}>
                            <Row>
                                {
                                    iconName
                                        ? <LinearGradientIcon size={iconSize} name={iconName}/>
                                        : null
                                }
                                <Text style={styles.label}>{text}</Text>
                            </Row>
                        </Col>
                        <Col size={1} style={styles.rightWrapper}>
                            <IcoMoon name="chevron-right1"/>
                        </Col>
                    </Row>
            }
        </Link> : null
        : <TouchableOpacity onPress={() => {
            switch (type) {
                case 'LINK_TO':
                    if (to) {
                        linkTo(to);
                    }
                    break;
                case 'NAV':
                    if (onNav) {
                        onNav();
                    }
                    break;
            }
        }
        }>
            <Row paddingVertical="xl">
                <Col size={3}>
                    <Row>
                        {
                            iconName
                                ? <LinearGradientIcon size={iconSize} name={iconName}/>
                                : null
                        }
                        <Text style={styles.label}>{text}</Text>
                    </Row>
                </Col>
                <Col size={1} style={styles.rightWrapper}>
                    <IcoMoon name="chevron-right1"/>
                </Col>
            </Row>
        </TouchableOpacity>;

};

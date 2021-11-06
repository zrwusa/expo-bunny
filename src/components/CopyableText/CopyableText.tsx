import React from 'react';
import {Clipboard, TextProps, TouchableOpacity} from 'react-native';
import {collectBizLogicResult} from '../../store/actions';
import {bizLogicSuccess} from '../../helpers';
import {useThemeLabor} from '../../providers/theme-labor';
import {Text} from '../UI';
import {useDispatch} from 'react-redux';

export const CopyableText: React.FC<TextProps> = ({children, style, ...rest}) => {
    const dispatch = useDispatch();
    const handleCopyToClipboard = (text: string) => {
        Clipboard.setString(text);
        dispatch(collectBizLogicResult(bizLogicSuccess({}, `Copy ${text} success`, true)));
    };
    const {colors} = useThemeLabor().theme;
    const mergedStyle = [{
        color: colors.accent,
    }, style];
    return <TouchableOpacity
        onPress={() => {
            if (typeof children === 'string') {
                handleCopyToClipboard(children);
            }
        }}>
        <Text style={mergedStyle} {...rest}>{children}</Text>
    </TouchableOpacity>;
};

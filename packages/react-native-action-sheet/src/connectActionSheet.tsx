import * as React from 'react';
import {Consumer} from './context';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {ActionSheetProps} from './types';

export default function connectActionSheet<OwnProps>(
    WrappedComponent: React.ComponentType<OwnProps>
) {
    const ConnectedActionSheet = (props: Omit<OwnProps, keyof ActionSheetProps>) => {
        return (
            <Consumer>
                {({showActionSheetWithOptions}) => {
                    return (
                        <WrappedComponent {...props as OwnProps} showActionSheetWithOptions={showActionSheetWithOptions}/>
                    );
                }}
            </Consumer>
        );
    };

    return hoistNonReactStatic(ConnectedActionSheet, WrappedComponent);
}

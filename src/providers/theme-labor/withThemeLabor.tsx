import {useThemeLabor} from './useThemeLabor';
import React from 'react';
import {ThemeLabor} from '../../types';

export interface WithThemeLabor {
    themeLabor: ThemeLabor;
}

export const withThemeLabor = <T extends WithThemeLabor = WithThemeLabor>(
    WrappedComponent: React.ComponentType<T>
) => {
    // Try to create a nice displayName for React Dev Tools.
    const displayName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component';

    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithThemeLabor = (props: Omit<T, keyof WithThemeLabor>) => {
        // Fetch the props you want to inject. This could be done with context instead.
        const themeLabor = useThemeLabor();

        // props comes afterwards so the can override the default ones.
        return <WrappedComponent {...(props as T)} themeLabor={themeLabor}/>;
    };

    ComponentWithThemeLabor.displayName = `withThemeLabor(${displayName})`;

    return ComponentWithThemeLabor;
};

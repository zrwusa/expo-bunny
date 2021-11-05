import {useSizeLabor} from './useSizeLabor';
import React from 'react';
import {SizeLabor} from '../../types';

export interface WithSizeLabor {
    sizeLabor: SizeLabor;
}

export const withSizeLabor = <T extends WithSizeLabor = WithSizeLabor>(
    WrappedComponent: React.ComponentType<T>
) => {
    // Try to create a nice displayName for React Dev Tools.
    const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithSizeLabor = (props: Omit<T, keyof WithSizeLabor>) => {
        // Fetch the props you want to inject. This could be done with context instead.
        const sizeLabor = useSizeLabor();
        // props comes afterwards so the can override the default ones.
        return <WrappedComponent {...(props as T)} sizeLabor={sizeLabor}/>;
    };

    ComponentWithSizeLabor.displayName = `withSizeLabor(${displayName})`;

    return ComponentWithSizeLabor;
};

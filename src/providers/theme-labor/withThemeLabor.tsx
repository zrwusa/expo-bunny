import {useThemeLabor} from "./useThemeLabor";
import React, {ComponentProps, ComponentType} from "react";
import {ThemeLabor} from "../../types";

export interface WithThemeLabor {
    themeLabor: ThemeLabor
}

export const withThemeLabor = (WrappedComponent: ComponentType<any>) => {
    function WithThemeLabor(props: ComponentProps<any>) {
        const themeLabor = useThemeLabor();
        return <WrappedComponent themeLabor={themeLabor} {...props} />;
    }

    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

    WithThemeLabor.displayName = `withThemeLabor(${wrappedComponentName})`;
    return WithThemeLabor;
}

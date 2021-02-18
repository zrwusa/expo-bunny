import {useTheme} from "./useTheme";
import React, {ComponentProps, ComponentType} from "react";
import {Theme} from "../../types/styles";

export type WithTheme = { theme: Theme }
export const withTheme = (Component: ComponentType<any>) => {
    function WrappedComponent(props: ComponentProps<any>) {
        const theme = useTheme();
        return <Component theme={theme} {...props} />;
    }

    return WrappedComponent;
}

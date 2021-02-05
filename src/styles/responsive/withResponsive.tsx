import {useResponsive} from "./useResponsive";
import React, {ComponentProps, ComponentType} from "react";
import {Responsive} from "../../types/styles";

export type WithResponsive = { responsive: Responsive }
export const withResponsive = (Component: ComponentType<any>) => {
    function WrappedComponent(props: ComponentProps<any>) {
        const responsive = useResponsive();
        return <Component responsive={responsive} {...props} />;
    }

    return WrappedComponent;
}

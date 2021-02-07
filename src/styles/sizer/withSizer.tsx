import {useSizer} from "./useSizer";
import React, {ComponentProps, ComponentType} from "react";
import {Sizer} from "../../types/styles";

export type WithSizer = { sizer: Sizer }
export const withSizer = (Component: ComponentType<any>) => {
    function WrappedComponent(props: ComponentProps<any>) {
        const sizer = useSizer();
        return <Component sizer={sizer} {...props} />;
    }

    return WrappedComponent;
}

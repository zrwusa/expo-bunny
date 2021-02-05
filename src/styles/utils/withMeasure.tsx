import {Measure, useMeasure} from "./measure";
import React, {ComponentProps, ComponentType} from "react";

export type WithMeasure = { measure: Measure } ;
export const withMeasure = (Component: ComponentType<any>) => {
    function WrappedComponent(props: ComponentProps<any>) {
        const measure = useMeasure();
        return <Component measure={measure} {...props} />;
    }

    return WrappedComponent;
}

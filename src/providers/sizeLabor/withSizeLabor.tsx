import {useSizeLabor} from "./useSizeLabor";
import React, {ComponentProps, ComponentType} from "react";
import {SizeLabor} from "../../types";

export type WithSizeLabor = { sizeLabor: SizeLabor }
export const withSizeLabor = (WrappedComponent: ComponentType<any>) => {

    function WithSizeLabor(props: ComponentProps<any>) {
        const sizeLabor = useSizeLabor();
        return <WrappedComponent sizeLabor={sizeLabor} {...props}  />;
    }

    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

    WithSizeLabor.displayName = `withSizeLabor(${wrappedComponentName})`;
    return WithSizeLabor;
}

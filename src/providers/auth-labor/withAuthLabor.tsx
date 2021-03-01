import React, {ComponentProps, ComponentType} from "react";
import {AuthLaborContextTypePartial} from "../../types";
import {useAuthLabor} from "./useAuthLabor";

export interface WithAuthLabor extends AuthLaborContextTypePartial {
};
export const withAuthLabor = (WrappedComponent: ComponentType<any>) => {
    function WithAuthLabor(props: ComponentProps<any>) {
        const auth = useAuthLabor();
        return <WrappedComponent {...props} auth={auth}/>;
    }

    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

    WithAuthLabor.displayName = `withAuthLabor(${wrappedComponentName})`;
    return WithAuthLabor;
}

import React, {ComponentProps, ComponentType} from "react";
import {AuthLaborContextType} from "../../types";
import {useAuthLabor} from "./useAuthLabor";

export type WithAuthLabor = Partial<AuthLaborContextType>
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

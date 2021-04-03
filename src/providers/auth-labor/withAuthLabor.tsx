import React from "react";
import {AuthLaborContextTypePartial} from "../../types";
import {useAuthLabor} from "./useAuthLabor";

export interface WithAuthLabor extends AuthLaborContextTypePartial {
};

export function withAuthLabor<T extends WithAuthLabor = WithAuthLabor>(
    WrappedComponent: React.ComponentType<T>
) {
    // Try to create a nice displayName for React Dev Tools.
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithAuthLabor = (props: Omit<T, keyof WithAuthLabor>) => {
        // Fetch the props you want to inject. This could be done with context instead.
        const authLabor = useAuthLabor();

        // props comes afterwards so the can override the default ones.
        return <WrappedComponent {...(props as T)} authLabor={authLabor}/>;
    };

    ComponentWithAuthLabor.displayName = `withAuthLabor(${displayName})`;

    return ComponentWithAuthLabor;
}

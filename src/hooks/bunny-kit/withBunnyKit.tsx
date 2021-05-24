import React, {ContextType} from "react";
import {BunnyKit, useBunnyKit} from "./useBunnyKit";

export interface WithBunnyKit {
    bunnyKit: BunnyKit
}

export function withBunnyKit<T>(
    WrappedComponent: React.ComponentType<T>
) {
    // Try to create a nice displayName for React Dev Tools.
    const displayName =
        WrappedComponent.displayName || WrappedComponent.name || 'Component';

    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithBunnyKit = (props: Omit<T, keyof WithBunnyKit>) => {
        // Fetch the props you want to inject. This could be done with context instead.
        const bunnyKit = useBunnyKit();
        // props comes afterwards so the can override the default ones.
        return <WrappedComponent {...(props as T)} bunnyKit={bunnyKit}/>;
    };

    ComponentWithBunnyKit.displayName = `withBunnyKit(${displayName})`;

    return ComponentWithBunnyKit;
}

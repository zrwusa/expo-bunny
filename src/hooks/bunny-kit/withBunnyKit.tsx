import React from "react";
import {BunnyKit, useBunnyKit} from "./useBunnyKit";

export interface WithBunnyKit {
    bunnyKit: BunnyKit
}

export function withBunnyKit<T>(
    Component: React.ComponentType<T>
) {
    // Try to create a nice displayName for React Dev Tools.
    const displayName =
        Component.displayName || Component.name || 'Component';

    // TODO not very well for supporting generic components
    const GenericComponent = Component as <ArgumentT extends object>(props: T) => JSX.Element;
    // Creating the inner component. The calculated Props type here is the where the magic happens.
    const ComponentWithBunnyKit = function <ArgumentT extends object>(props: Omit<T, keyof WithBunnyKit>) {
        // Fetch the props you want to inject. This could be done with context instead.
        const bunnyKit = useBunnyKit();
        // props comes afterwards so the can override the default ones.
        // TODO HOC support generic component
        return <GenericComponent<ArgumentT> {...(props as T)} bunnyKit={bunnyKit}/>;
    };

    ComponentWithBunnyKit.displayName = `withBunnyKit(${displayName})`;

    return ComponentWithBunnyKit;
}

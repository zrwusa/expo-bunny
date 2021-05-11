import React from "react";
import {UseKeyboardHeight, useKeyboardHeight} from "./useKeyboardHeight";

export function withKeyboardHeight<T extends UseKeyboardHeight = UseKeyboardHeight>(
    WrappedComponent: React.ComponentType<T>
) {
    const displayName =
        WrappedComponent.displayName || WrappedComponent.name || "Component";
    const ComponentWithKeyboardHeight = (props: Omit<T, keyof UseKeyboardHeight>) => {
        const keyboardHeight = useKeyboardHeight();
        return <WrappedComponent {...(props as T)} keyboardHeight={keyboardHeight}/>;
    };
    ComponentWithKeyboardHeight.displayName = `withKeyboardHeight(${displayName})`;
    return ComponentWithKeyboardHeight;
}

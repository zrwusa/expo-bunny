import {useSmartStyle} from "./useSmartStyle";
import React, {ComponentProps, ComponentType} from "react";
import {SmartStyle} from "../../types/styles";

export type WithSmartStyle = { smartStyle: SmartStyle }
export const withSmartStyle = (Component: ComponentType<any>) => {
    function WrappedComponent(props: ComponentProps<any>) {
        const smartStyle = useSmartStyle();
        return <Component smartStyle={smartStyle} {...props} />;
    }

    return WrappedComponent;
}

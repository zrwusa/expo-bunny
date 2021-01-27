import * as React from "react";
import defaultResponsive from "../helpers/responsive";
import {Responsive, ResponsiveProviderProps} from "../../types/styles";

const ResponsiveContext = React.createContext<Responsive>(defaultResponsive);

function ResponsiveProvider(props: ResponsiveProviderProps): JSX.Element {
    const {children} = props;
    return (
        <ResponsiveContext.Provider value={defaultResponsive}>
            {children}
        </ResponsiveContext.Provider>
    );
}

const useResponsive = (): Responsive => React.useContext(ResponsiveContext);

export {ResponsiveProvider, useResponsive};

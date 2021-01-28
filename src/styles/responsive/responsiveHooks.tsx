import * as React from "react";
import {responsiveFromUE} from "../utils";
import {Responsive, ResponsiveProviderProps} from "../../types/styles";

const ResponsiveContext = React.createContext<Responsive>(responsiveFromUE);

function ResponsiveProvider(props: ResponsiveProviderProps): JSX.Element {
    const {children} = props;
    return (
        <ResponsiveContext.Provider value={responsiveFromUE}>
            {children}
        </ResponsiveContext.Provider>
    );
}

const useResponsive = (): Responsive => React.useContext(ResponsiveContext);

export {ResponsiveProvider, useResponsive};

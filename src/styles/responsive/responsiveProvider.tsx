import * as React from "react";
import {ResponsiveProviderProps} from "../../types/styles";
import {Dimensions, ScaledSize} from "react-native";
import ResponsiveContext from "./responsiveContext";
import getResponsive from "../utils/responsive";
import _ from "lodash"
import BunnyConstants from "../../utils/constants";

function ResponsiveProvider(props: ResponsiveProviderProps): JSX.Element {
    const {children} = props;
    const [reCalculatedResponsiveFromUE, setReCalculatedResponsiveFromUE] = React.useState(getResponsive())
    React.useEffect(() => {
        const onDimensionsChange = _.throttle(({window}: { window: ScaledSize }) => {
            setReCalculatedResponsiveFromUE(getResponsive())
        },BunnyConstants.throttleWait);
        Dimensions.addEventListener('change', onDimensionsChange);
        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    }, []);
    return (
        <ResponsiveContext.Provider value={reCalculatedResponsiveFromUE}>
            {children}
        </ResponsiveContext.Provider>
    );
}

export {ResponsiveProvider};

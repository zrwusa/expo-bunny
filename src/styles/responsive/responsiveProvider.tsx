import * as React from "react";
import responsiveFromUE, {getResponsive} from "../utils";
import {Responsive, ResponsiveProviderProps} from "../../types/styles";
import {Dimensions, ScaledSize} from "react-native";

const ResponsiveContext = React.createContext<Responsive>(responsiveFromUE);

function ResponsiveProvider(props: ResponsiveProviderProps): JSX.Element {
    const {children} = props;
    const [dimensions] = React.useState(Dimensions.get('window'));
    const [reCalculatedResponsiveFromUE, setReCalculatedResponsiveFromUE] = React.useState(responsiveFromUE)
    React.useEffect(() => {
        const onDimensionsChange = ({window}: { window: ScaledSize }) => {
            setReCalculatedResponsiveFromUE(getResponsive())
        };
        Dimensions.addEventListener('change', onDimensionsChange);
        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    }, [dimensions]);
    return (
        <ResponsiveContext.Provider value={reCalculatedResponsiveFromUE}>
            {children}
        </ResponsiveContext.Provider>
    );
}

export {ResponsiveProvider, ResponsiveContext};

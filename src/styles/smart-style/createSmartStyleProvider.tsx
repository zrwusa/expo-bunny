import * as React from "react";
import {MeasureProviderProps} from "../../types/styles";
import {Dimensions, ScaledSize} from "react-native";
import _ from "lodash"
import BunnyConstants from "../../utils/constants";
import {useEffect, useState} from "react";
import getSmartStyle from "../utils/smartStyle";
import SmartStyleContext from "./SmartStyleContent";

function SmartStyleProvider(props: MeasureProviderProps): JSX.Element {
    const {children} = props;
    const [smartStyle, setSmartStyle] = useState(getSmartStyle());

    useEffect(() => {
        const onDimensionsChange = _.throttle(() => {
            setSmartStyle(getSmartStyle())
        }, BunnyConstants.throttleWait);
        Dimensions.addEventListener('change', onDimensionsChange);
        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    });
    return (
        <SmartStyleContext.Provider value={smartStyle}>
            {children}
        </SmartStyleContext.Provider>
    );
}

export {SmartStyleProvider};

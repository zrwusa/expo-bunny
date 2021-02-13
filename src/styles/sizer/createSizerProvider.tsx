import * as React from "react";
import {MeasureProviderProps} from "../../types/styles";
import {Dimensions} from "react-native";
import _ from "lodash"
import BunnyConstants from "../../utils/constants";
import {useEffect, useState} from "react";
import getSizer from "../utils/sizer";
import SizerContext from "./SizerContext";

function SizerProvider(props: MeasureProviderProps): JSX.Element {
    const {children} = props;
    const [sizer, setSizer] = useState(getSizer());

    useEffect(() => {
        const onDimensionsChange = _.throttle(() => {
            setSizer(getSizer())
        }, BunnyConstants.throttleWait);
        Dimensions.addEventListener('change', onDimensionsChange);
        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    });
    return (
        <SizerContext.Provider value={sizer}>
            {children}
        </SizerContext.Provider>
    );
}

export {SizerProvider};

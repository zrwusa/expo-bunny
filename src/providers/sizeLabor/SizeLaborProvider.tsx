import * as React from "react";
import {MeasureProviderProps} from "../../types";
import {Dimensions} from "react-native";
import _ from "lodash"
import BunnyConstants from "../../constants/constants";
import {useEffect, useMemo, useState} from "react";
import getSizeLabor from "./sizeLabor";
import {SizeLaborContext} from "./SizeLaborContext";

function SizeLaborProvider(props: MeasureProviderProps): JSX.Element {
    const {children} = props;
    const [sizeLabor, setSizeLabor] = useState(getSizeLabor());

    useEffect(() => {
        const onDimensionsChange = _.throttle(() => {
            setSizeLabor(getSizeLabor())
        }, BunnyConstants.throttleWait);
        Dimensions.addEventListener('change', onDimensionsChange);
        return () => Dimensions.removeEventListener('change', onDimensionsChange);
    });

    const sizeLaborMemorized = useMemo(() => sizeLabor, [sizeLabor]);

    return (
        <SizeLaborContext.Provider value={sizeLaborMemorized}>
            {children}
        </SizeLaborContext.Provider>
    );
}

export {SizeLaborProvider};

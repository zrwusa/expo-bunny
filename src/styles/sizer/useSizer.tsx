import * as React from "react";
import {Sizer} from "../../types/styles";
import SizerContext from "./SizerContext";

const useSizer = (): Sizer => React.useContext(SizerContext);

export {useSizer};

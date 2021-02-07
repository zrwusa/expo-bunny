import * as React from "react";
import {Sizer} from "../../types/styles";
import SizerContent from "./SizerContent";

const useSizer = (): Sizer => React.useContext(SizerContent);

export {useSizer};

import * as React from "react";
import {ResponsiveContext} from "./responsiveProvider";
import {Responsive} from "../../types/styles";

const useResponsive = (): Responsive => React.useContext(ResponsiveContext);

export {useResponsive};

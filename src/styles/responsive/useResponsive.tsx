import * as React from "react";
import {Responsive} from "../../types/styles";
import ResponsiveContext from "./responsiveContext";

const useResponsive = (): Responsive => React.useContext(ResponsiveContext);

export {useResponsive};

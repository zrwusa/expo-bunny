import * as React from "react";
import { Responsive} from "../../types/styles";
import getResponsive from "../utils/responsive";
const ResponsiveContext = React.createContext<Responsive>(getResponsive() as Responsive);
export default ResponsiveContext

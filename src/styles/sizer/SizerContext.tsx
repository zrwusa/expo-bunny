import * as React from "react";
import {Sizer} from "../../types/styles";
import getSizer from "../utils/sizer";

export default React.createContext<Sizer>(getSizer());

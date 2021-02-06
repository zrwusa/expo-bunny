import * as React from "react";
import {SmartStyle} from "../../types/styles";
import getSmartStyle from "../utils/smartStyle";

export default React.createContext<SmartStyle>(getSmartStyle());

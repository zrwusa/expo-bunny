import * as React from "react";
import {SmartStyle} from "../../types/styles";
import SmartStyleContent from "./SmartStyleContent";

const useSmartStyle = (): SmartStyle => React.useContext(SmartStyleContent);

export {useSmartStyle};

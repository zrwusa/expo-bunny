import * as React from "react";
import {Theme} from "../../types/styles";
import {ThemeContext} from "./ThemeContext";

const useTheme = (): Theme => React.useContext(ThemeContext);

export {useTheme};

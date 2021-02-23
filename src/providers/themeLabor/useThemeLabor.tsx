import * as React from "react";
import {ThemeLabor} from "../../types";
import {ThemeLaborContext} from "./ThemeLaborContext";

const useThemeLabor = (): ThemeLabor => React.useContext(ThemeLaborContext);

export {useThemeLabor};

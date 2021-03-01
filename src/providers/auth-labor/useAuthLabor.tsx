import * as React from "react";
import {AuthLaborContext} from "./AuthLaborContext";

const useAuthLabor = () => React.useContext(AuthLaborContext);

export {useAuthLabor};

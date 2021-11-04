import * as React from 'react';
import {AuthLaborContext} from './AuthLaborContext';

export const useAuthLabor = () => React.useContext(AuthLaborContext);

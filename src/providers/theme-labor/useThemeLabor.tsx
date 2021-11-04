import * as React from 'react';
import {ThemeLabor} from '../../types';
import {ThemeLaborContext} from './ThemeLaborContext';

export const useThemeLabor = (): ThemeLabor => React.useContext(ThemeLaborContext);

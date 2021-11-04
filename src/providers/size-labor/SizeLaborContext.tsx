import * as React from 'react';
import {SizeLabor} from '../../types';
import {getSizeLabor} from './sizeLabor';

export const SizeLaborContext = React.createContext<SizeLabor>(getSizeLabor());
SizeLaborContext.displayName = 'SizeLaborContext';

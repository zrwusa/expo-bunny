import * as React from 'react';
import {SizeLabor} from '../../types';
import {SizeLaborContext} from './SizeLaborContext';

export const useSizeLabor = (): SizeLabor => React.useContext(SizeLaborContext);

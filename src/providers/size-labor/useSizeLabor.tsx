import * as React from 'react';
import {SizeLabor} from '../../types';
import {SizeLaborContext} from './SizeLaborContext';

const useSizeLabor = (): SizeLabor => React.useContext(SizeLaborContext);

export {useSizeLabor};

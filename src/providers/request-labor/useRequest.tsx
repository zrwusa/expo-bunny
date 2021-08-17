import React from 'react';
import bunnyAPI from '../../helpers/bunny-api';
import {RequestContext} from './RequestContext';


export const useRequest = (): typeof bunnyAPI => React.useContext(RequestContext);



import React from 'react';
import {bunnyAPI} from '../../helpers/bunny-api';
import {AxiosInstance} from 'axios';

export const RequestContext = React.createContext<AxiosInstance>(bunnyAPI);

import bunnyAPI from '../../helpers/bunny-api';
import React, {ReactNode} from 'react';
import {AxiosInstance} from 'axios';
import {RequestContext} from './RequestContext';

export interface RequestProviderProps {
    children: ReactNode;
    axiosInstance?: AxiosInstance;
}

export const RequestProvider = (props: RequestProviderProps) => {
    const {children, axiosInstance} = props;
    // if (axiosInstance === undefined) {
    //     throw new Error('The component using the the context must be a descendant of the context provider')
    // }
    return (
        <RequestContext.Provider value={axiosInstance || bunnyAPI}>
            {children}
        </RequestContext.Provider>
    );
};

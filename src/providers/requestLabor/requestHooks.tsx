import {AxiosInstance} from 'axios';
import React, {ReactNode} from 'react';
import api from "../../utils/api";

const RequestContext = React.createContext<typeof api>(new Proxy(api, {
        apply: () => {
            throw new Error('You must wrap your component in an RequestProvider');
        },
        get: () => {
            throw new Error('You must wrap your component in an RequestProvider');
        }
    })
);

export type RequestProviderProps = {
    children: ReactNode;
    axiosInstance?: AxiosInstance;
};

function RequestProvider(props: RequestProviderProps) {
    const {children, axiosInstance} = props;
    // if (axiosInstance === undefined) {
    //     throw new Error('The component using the the context must be a descendant of the context provider')
    // }
    return (
        <RequestContext.Provider value={axiosInstance || api}>
            {children}
        </RequestContext.Provider>
    );
}

const useRequest = (): typeof api => React.useContext(RequestContext);

export {RequestProvider, useRequest};

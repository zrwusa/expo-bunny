import {AxiosInstance} from 'axios';
import React, {ReactNode} from 'react';
import bunnyAPI from "../../helpers/bunny-api";

const RequestContext = React.createContext<typeof bunnyAPI>(new Proxy(bunnyAPI, {
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
        <RequestContext.Provider value={axiosInstance || bunnyAPI}>
            {children}
        </RequestContext.Provider>
    );
}

const useRequest = (): typeof bunnyAPI => React.useContext(RequestContext);

export {RequestProvider, useRequest};

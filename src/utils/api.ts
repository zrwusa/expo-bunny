import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import bunnyConfig from "../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants from "../constants/constants";
import {BunnyAPIError} from "./utils";

type ResponseProtocolStructureBunny<T> = {
    data: T | object,
    created_at?: string,
    http_extra: {
        code?: number,
        message?: string,
        des?: string,
        error_code?: number,
        error_message?: string,
        error_des?: string,
        error_stack?: string,
    }
    business_logic: {
        code?: string,
        message?: string,
        des?: string,
        error_code?: string,
        error_message?: string,
        error_des?: string,
        error_stack?: string,
    }
}

type APIConfig<T> = {
    isHttps: boolean,
    timeout: number,
    responseProtocolStructure: ResponseProtocolStructureBunny<T>,
    errorClass: Error,
    interceptors: {
        request: {
            accessToken?(): Promise<string>,
        },
        response: {
            // 1xx: Informational	Temporary response for the handshake phase of the protocol
            // 2xx: Success	        The client's request was successfully received
            // 3xx: Redirection	    The client must have some additional actions to complete request
            // 4xx: Client Error	Such errors should be the responsibility of the client
            // 5xx: Server Error	Such errors should be the responsibility of the server
            Created: 201 | number,             // e.g
            Accepted: 202 | number,            // just notify client in processing,but not completed
            NoContent: 204 | number,           // e.g. POST,PUT,DELETE success,but no need to response a entity
            SeeOther: 303 | number,            // e.g.  similar to 202, call limit is not exceeded, the server may put your request into the queue and process it slowly.
                                               // At this time, you will receive the 303, and the Location header tells the caller that it should pass that URL is used for next step.
            Forbidden: 403 | number,           // e.g. server refuses to authorize it
            BadRequest: 400 | number,          // client error,but the server needs additional info to notify the client in the protocol structure
            Unauthorized: 401 | number,        // e.g. lacks valid authentication credentials
            NotFound: 404 | number,
            UnprocessableEntity: 422 | number, // e.g. business logic error
            RequestTimeout: 408 | number,      // server is waiting request,but timeout
            Conflict: 409 | number,            // e.g. sign up user info already exists
            Locked: 423 | number,              // e.g. someone is modifying the entity witch your are accessing
            TooManyRequests: 429 | number,     // too many requests,the server can not process now
            NotImplemented: 501 | number,      // need to be implemented
            isMergeHttpStatusDes: boolean,
        }
    },
    isDevServerProxy: boolean,
    devProxyPrefix: string,
}
// interface Seal {
//     name: string;
//     url: string;
// }
// interface API {
//     "/user": { name: string; age: number; phone: string };
//     "/seals": { seal: Seal[] };
// }
// const apiTODO = <URL extends keyof API>(url: URL): Promise<API[URL]> => {
//     return fetch(url).then((res) => res.json());
// };

const httpPrefix = bunnyConfig.isHttps ? 'https://' : 'http://';
const devProxyPrefix = bunnyConfig.isDevServerProxy ? Object.keys(bunnyConfig.devServerProxy)[0] : '';

const apiBunny = axios.create({
    baseURL: bunnyConfig.isDevServerProxy
        ? `${bunnyConfig.devServer.domain}${bunnyConfig.devServer.port}${devProxyPrefix}`
        : bunnyConfig.isRemoteBackEnd
            ? `${httpPrefix}${bunnyConfig.remoteBackEnd.domain}:${bunnyConfig.remoteBackEnd.port}`
            : `${httpPrefix}${bunnyConfig.localBackEnd.domain}:${bunnyConfig.localBackEnd.port}`,
    timeout: 2000
});

apiBunny.interceptors.request.use(
    async (config) => {
        const accessToken = await AsyncStorage.getItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY)
        if (accessToken) {
            config.headers = {
                "Authorization": `Bearer ${accessToken}`,
                // "Accept": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        return config;
    },
    async error => {
        return Promise.reject(error)
    });

apiBunny.interceptors.response.use(
    (response) => {
        // 200-300
        // console.log('---response.config',response.config)
        // if (response.config) {
        //     //perform the manipulation here and change the response object
        // }
        console.log('---interceptors response', response.status)
        return response
    },
    function (error) {
        console.log('---interceptors error')
        const originalRequest = error.config;
        const {response, request} = error;
        if (response) {
            //300-600
            /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */
            const {status} = response;
            const {data} = response;
            console.log('---interceptors error.response');
            console.log('---response.ok',response.ok)
            // if (!response.ok) {
            //     if ([401, 403].indexOf(response.status) !== -1) {
            //         // auto logout if 401 Unauthorized or 403 Forbidden response returned from apiBunny
            //         authenticationService.logout();
            //         location.reload(true);
            //     }
            //
            //     const error = (data && data.message) || response.statusText;
            //     return Promise.reject(error);
            // }
            console.log('---interceptors error.response.status,data', status, data);
            switch (status) {
                case 401:
                    break;
                case 403:
                    console.log('---interceptors error.response.status === 403');
                    originalRequest._retry = true;
                    // const access_token = await refreshAccessToken();
                    const access_token = "";
                    axios.defaults.headers.common["Authorization"] = `Bearer ` + access_token;
                    return apiBunny(originalRequest);
                case 409:
                    break;
                case 422:
                    break;
                default:
                    break;
            }
            return Promise.reject(response)
        } else if (request) {
            // 100-200 timeout
            /*
            * The request was made but no response was received, `error.request`
            * is an instance of XMLHttpRequest in the browser and an instance
            * of http.ClientRequest in Node.js
            */
            console.log('---interceptors error.request', JSON.stringify(error));
            return Promise.reject(request)
        } else {
            // Something happened in setting up the request and triggered an error
            console.log('---interceptors error.message', error.message);
            return Promise.reject(error)
        }
    });
const validAPIProtocolSuccessResponseStructure = (data: any) => {
    let isValid = false;
    const {error_code,error_message,error_stack} = data.business_logic;
    if (error_code) {
        throw new BunnyAPIError(error_message)
    } else {
        const {success_data} = data;
        if (success_data) {
            isValid = true
        } else {
            throw new BunnyAPIError('Not BunnyAPI structure')
        }
    }
    return isValid;
}

const validAPIProtocolError = (data: any) => {
    const {error_code,error_message,error_stack} = data.business_logic;
    return new BunnyAPIError(error_message,error_code,error_stack)
}

const request = async (config: AxiosRequestConfig) => {
    const startTime = new Date().getTime();
    try {
        const result = await apiBunny.request(config);
        console.log('---baseRequest try')
        if (validAPIProtocolSuccessResponseStructure(result.data)) {
            result.data = result.data.success_data
            console.log('---baseRequest try validAPIProtocol(result.data)===true')
        } else {
            console.log('---baseRequest try validAPIProtocol(result.data)===false')
            result.data = {}
        }
        return result;
        // console.log('---base request response')
    } catch (error) {
        // console.log('---base request error')
        const timeSpent = new Date().getTime() - startTime;
        // console.error('---error',error)
        const businessError = validAPIProtocolError(error.data)
        console.error('---businessError',businessError)
        // throw (error)
        throw (businessError)
        // if(bunnyConfig.shouldCollectError){
        //     const {dispatch} = store;
        //     const {request,response} = error;
        //     if (response) {
        //         // Request made and server responded
        //          dispatch(sysError({error: {...response,timeSpent}}))
        //     } else if (request) {
        //         // The request was made but no response was received
        //          dispatch(sysError({error: {...request,timeSpent}}))
        //     } else {
        //         // Something happened in setting up the request that triggered an Error
        //          dispatch(sysError({error: {...error,timeSpent}}))
        //     }
        // }
    }
}

const baseRequest = {
    request: request,
    get: async <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => {
        return await request({...config, method: 'get', url});
    },
    delete: async <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => {
        return await request({...config, method: 'delete', url});
    },
    head: async <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => {
        return await request({...config, method: 'head', url});
    },
    options: async <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => {
        return await request({...config, method: 'options', url});
    },
    post: async <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => {
        return await request({...config, method: 'post', url, data});
    },
    put: async <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => {
        return await request({...config, method: 'put', url, data});
    },
    patch: async <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => {
        return await request({...config, method: 'patch', url, data});
    }
}

export default baseRequest;

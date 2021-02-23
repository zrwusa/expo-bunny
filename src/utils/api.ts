import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import store from "../stores";
import bunnyConfig from "../config.json";
import {getStatusDes} from "../constants/http"
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants from "../constants/constants";

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
const feApiTail = bunnyConfig.isDevServerProxy ? Object.keys(bunnyConfig.devServerProxy)[0] : '';

const api = axios.create({
    baseURL: bunnyConfig.isDevServerProxy
        ? `${bunnyConfig.devServer.domain}${bunnyConfig.devServer.port}${feApiTail}`
        : bunnyConfig.isRemoteBackEnd
            ? `${httpPrefix}${bunnyConfig.remoteBackEnd.domain}:${bunnyConfig.remoteBackEnd.port}`
            : `${httpPrefix}${bunnyConfig.localBackEnd.domain}:${bunnyConfig.localBackEnd.port}`,
    timeout: 2000
});

api.interceptors.request.use(
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

api.interceptors.response.use(
    (response) => {
        // 200-300
        // console.log('---response.config',response.config)
        // if (response.config) {
        //     //perform the manipulation here and change the response object
        // }

        const httpStatusDes = getStatusDes(response.status)
        console.log('---interceptors response', response.status)
        return response
    },
    async function (error) {
        console.log('---interceptors error')
        const originalRequest = error.config;
        // console.log('---error.response.data',error.response.data);
        // console.log('---error.response.status',error.response.status);
        // console.log('---error.response.headers',error.response.headers);
        const {response, request} = error;
        const {dispatch} = store;
        if (response) {
            //300-600
            /*
            * The request was made and the server responded with a
            * status code that falls out of the range of 2xx
            */
            const {status} = response;
            const {data} = response;
            const httpStatusDes = getStatusDes(status)
            console.log('---interceptors error.response');
            // if (!response.ok) {
            //     if ([401, 403].indexOf(response.status) !== -1) {
            //         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            //         authenticationService.logout();
            //         location.reload(true);
            //     }
            //
            //     const error = (data && data.message) || response.statusText;
            //     return Promise.reject(error);
            // }
            console.log('---interceptors error.response.status,data', status, data);

            if (status === 403 && !originalRequest._retry) {
                console.log('---interceptors error.response.status === 403');
                originalRequest._retry = true;
                // const access_token = await refreshAccessToken();
                const access_token = "";
                axios.defaults.headers.common["Authorization"] = `Bearer ` + access_token;
                return api(originalRequest);
            } else if (status === 401) {
                return Promise.reject({serverProtocol: data, httpStatusDes});
            } else if (status === 422) { //Business logic error
                return Promise.reject({serverProtocol: data, httpStatusDes});
            } else if (status === 409) {
                // dispatch(restoreAuthRedirection({redirection: 'sign-in'}))
                return Promise.reject({serverProtocol: data, httpStatusDes});
            } else {
                return Promise.reject({serverProtocol: data, httpStatusDes});
            }
        } else if (request) {
            // 100-200 timeout
            /*
            * The request was made but no response was received, `error.request`
            * is an instance of XMLHttpRequest in the browser and an instance
            * of http.ClientRequest in Node.js
            */
            console.log('---interceptors error.request', JSON.stringify(error));
        } else {
            // Something happened in setting up the request and triggered an Error
            console.log('---interceptors error.message', error.message);
        }
        return Promise.reject(error);
    });
const request = async (config: AxiosRequestConfig) => {
    const startTime = new Date().getTime();

    try {
        const result = await api.request(config);
        // console.log('---base request response')
        return result;
    } catch (error) {
        // console.log('---base request error')
        const timeSpent = new Date().getTime() - startTime;
        throw error // If throw error and not caught,React Native RedBox will catch the errors

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

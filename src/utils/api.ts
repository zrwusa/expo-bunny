import axios, {AxiosResponse} from "axios";
import bunnyConfig from "../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BunnyConstants from "../constants/constants";
import {BunnyAPIError} from "./utils";
import {authLaborContext} from "../providers/auth-labor";

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
const bunnyAPIProtocolResponseData = {
    "http_extra": {
        "code": "",
        "message": "",
        "des": "",
        "error_code": 403,
        "error_message": "Forbidden",
        "error_des": "indicates that the server understood the request but refuses to authorize it.",
        "error_stack": ""
    },
    "business_logic": {
        "code": "",
        "message": "",
        "des": "",
        "error_code": "B403",
        "error_message": "Inappropriate access token is revoked",
        "error_des": "",
        "error_stack": ""
    },
    "success_data": {},
    "time_spend": 2
}

type BunnyAPIProtocolResponseData<T> = {
    "http_extra": {
        "code": number,
        "message": string,
        "des": string,
        "error_code": number,
        "error_message": string,
        "error_des": string,
        "error_stack": string
    },
    "business_logic": {
        "code": string,
        "message": string,
        "des": string,
        "error_code": string,
        "error_message": string,
        "error_des": string,
        "error_stack": string
    },
    "success_data"?: T,
    "time_spend": number
}
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
    (response: AxiosResponse<BunnyAPIProtocolResponseData<any>>) => {
        // status 200-300
        if (validAPIProtocolSuccessResponse(response.data)) {
            response.data = response.data.success_data
        } else {
            response.data = {
                "http_extra": {
                    "code": 0,
                    "message": "",
                    "des": "",
                    "error_code": 0,
                    "error_message": "",
                    "error_des": "",
                    "error_stack": ""
                },
                "business_logic": {
                    "code": "",
                    "message": "",
                    "des": "",
                    "error_code": "",
                    "error_message": "",
                    "error_des": "",
                    "error_stack": ""
                },
                "success_data": {},
                "time_spend": 0
            }
        }
        return response
    },
    async (error) => {
        const {response, request, config} = error;
        if (response) {
            // status 300-600 The request was made and the server responded with a status code that falls out of the range of 2xx
            const {status} = response;
            switch (status) {
                case 403:
                    const refreshToken = await AsyncStorage.getItem(BunnyConstants.REFRESH_TOKEN_PERSISTENCE_KEY)
                    if (refreshToken) {
                        const accessTokenNew = await authLaborContext.authFunctions.refreshAuth()
                        if (accessTokenNew) {
                            await AsyncStorage.setItem(BunnyConstants.ACCESS_TOKEN_PERSISTENCE_KEY, accessTokenNew)
                            const originalRequest = config;
                            originalRequest._retry = true;
                            return apiBunny(originalRequest);
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                default:
                    break;
            }
            const {error_code, error_message, error_stack} = error.data.business_logic;
            if (error_code) {
                return Promise.reject(new BunnyAPIError(error_message, error_code, error_stack));
            } else {
                return Promise.reject(response)
            }
        } else if (request) {
            // status 100-200 timeout The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
            return Promise.reject(request)
        } else {
            // Something happened in setting up the request and triggered an error
            return Promise.reject(error)
        }
    });

const validAPIProtocolSuccessResponse = (data: any) => {
    let isValid = false;
    const {error_code, error_message, error_stack} = data.business_logic;
    if (error_code) {
        throw new BunnyAPIError(error_message, error_code, error_stack)
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

// const request = async (config: AxiosRequestConfig) => {
//     try {
//         const result = await apiBunny.request(config);
//         if (validAPIProtocolSuccessResponse(result.data)) {
//             result.data = result.data.success_data
//         } else {
//             result.data = {}
//         }
//         return result;
//     } catch (error) {
//         const {error_code, error_message, error_stack} = error.data.business_logic;
//         if (error_code) {
//             throw new BunnyAPIError(error_message, error_code, error_stack);
//         } else {
//             throw error
//         }
//     }
// }
//
// const baseRequest = {
//     request: request,
//     get: async <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => {
//         return await request({...config, method: 'get', url});
//     },
//     delete: async <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => {
//         return await request({...config, method: 'delete', url});
//     },
//     head: async <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => {
//         return await request({...config, method: 'head', url});
//     },
//     options: async <T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig) => {
//         return await request({...config, method: 'options', url});
//     },
//     post: async <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => {
//         return await request({...config, method: 'post', url, data});
//     },
//     put: async <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => {
//         return await request({...config, method: 'put', url, data});
//     },
//     patch: async <T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig) => {
//         return await request({...config, method: 'patch', url, data});
//     }
// }

export default apiBunny;

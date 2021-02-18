import axios, {AxiosRequestConfig, AxiosResponse, Method} from "axios";
import store from "../stores";
import bunnyConfig from "../config.json";
import {sysError} from "../stores/sys/actions";

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
    timeout: 1000
});

type TimeRecorder = {
    startTime: number,
    endTime: number,
    duration: number
}

const calculateTimeRecorder = (timeRecorder: TimeRecorder) => {
    timeRecorder.endTime = new Date().getTime();
    timeRecorder.duration = timeRecorder.endTime - timeRecorder.startTime;
    return timeRecorder;
}

api.interceptors.request.use(
    (config) => {

        const {authState} = store.getState();
        if (authState.accessToken) {
            config.headers = {
                "Authorization": `Bearer ${authState.accessToken}`,
                // "Accept": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded"
            }
        }

        // config.timeRecorder = {
        //     startTime: new Date().getTime(),
        //     endTime: 0,
        //     duration: 0
        // };

        return config;
    },
    async error => {
        return Promise.reject(error)
    });

api.interceptors.response.use(
    (response) => {
        // console.log('---response.config',response.config)
        // if (response.config) {
        //     //perform the manipulation here and change the response object
        // }
        // calculateTimeRecorder(response.config.timeRecorder);
        // console.log('---response.config.timeRecorder', response.config.timeRecorder.duration)
        if (response.status === 401) {
            console.log('---response.status === 401', true)
        }
        return response
    },
    async function (error) {
        // calculateTimeRecorder(error.config.timeRecorder);
        // console.log('---error.config.timeRecorder.duration', error.config.timeRecorder.duration)

        const originalRequest = error.config;

        if (error.response) {
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
            if (error.response.status === 403 && !originalRequest._retry) {
                originalRequest._retry = true;
                // const access_token = await refreshAccessToken();
                const access_token = "";
                axios.defaults.headers.common["Authorization"] = `Bearer ` + access_token;
                return api(originalRequest);
            } else if (error.response.status === 401) {

            }
            // if (error.response && error.response.data) {
            //     return Promise.reject(error.response.data);
            // }
        } else {
            // console.error(`[React Bunny Warn]Request failed,first do not forget to run the mock server in another terminal with command 'yarn mock'`)
        }
        return Promise.reject(error);
    });
const request = async <T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig) => {
    const startTime = new Date().getTime();

    try {
        return await api.request(config);
    } catch (error) {
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

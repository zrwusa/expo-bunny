import axios, {AxiosResponse} from "axios";
import {BunnyAPIError} from "../utils";
import {authLaborContext} from "../providers/auth-labor";
import {getApiInstanceConfig, validBunnyAPIResponse} from "./index";
import {BunnyAPIProtocolResponseData} from "../types";

export const bunnyAPIInitResponseData = {
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

const bunnyAPI = axios.create(getApiInstanceConfig());


bunnyAPI.interceptors.request.use(
    async (config) => {
        const accessToken = await authLaborContext.authFunctions.getAccessToken();
        if (accessToken) {
            config.headers = {Authorization: `Bearer ${accessToken}`}
        }
        return config;
    },
    async error => {
        return Promise.reject(error)
    });

bunnyAPI.interceptors.response.use(
    (response: AxiosResponse<BunnyAPIProtocolResponseData<any>>) => {
        // status 200-300
        if (validBunnyAPIResponse(response.data)) {
            response.data = response.data.success_data
        } else {
            response.data = bunnyAPIInitResponseData
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
                    const result = await authLaborContext.authFunctions.refreshAuth()
                    const {success} = result;
                    if (success) {
                        const originalRequest = config;
                        originalRequest._retry = true;
                        return bunnyAPI(originalRequest);
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

export default bunnyAPI;

import axios, {AxiosResponse} from "axios";
import {authLaborContext} from "../providers/auth-labor";
import {checkNomicsAPIProtocol, getApiInstanceConfig} from "./index";
import {NomicsAPIProtocolResponseData} from "../types";

export const defaultNomicsAPIResponseData = {
    "httpExtra": {
        "code": 0,
        "message": "",
        "description": "",
        "errorCode": 0,
        "errorMessage": "",
        "errorDescription": "",
        "errorStack": ""
    },
    "businessLogic": {
        "code": "",
        "message": "",
        "description": "",
        "errorCode": "",
        "errorMessage": "",
        "errorDescription": "",
        "errorStack": ""
    },
    "successData": null,
    "timeSpent": 0
}

const nomicsAPI = axios.create(getApiInstanceConfig('nomics'));

nomicsAPI.interceptors.request.use(
    async (config) => {
        const accessToken = await authLaborContext.authFunctions.getAccessToken();
        // "Accept": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded"
        config.headers['Content-Type'] = 'application/json'
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return config;
    },
    async error => {
        return Promise.reject(error)
    });

nomicsAPI.interceptors.response.use(
    (response: AxiosResponse<NomicsAPIProtocolResponseData<any>>) => {
        // status 200-300
        if (!checkNomicsAPIProtocol(response.data)) {
            response.data = defaultNomicsAPIResponseData
        }
        response.data = response.data.successData
        return response
    },
    async (error) => {
        const {response, request, config} = error;
        if (response) {
            // status 300-600 The request was made and the server responded with a status code that falls out of the range of 2xx
            const {status, data} = response;
            switch (status) {
                case 401:
                    // const {businessLogic} = data
                    // const {errorCode} = businessLogic
                    // if (['BL_BUNNY_002', 'BL_BUNNY_003', 'BL_BUNNY_004', 'BL_BUNNY_005'].includes(errorCode)) {
                    //     const {authFunctions} = authLaborContext;
                    //     const {refreshAuth, signOut} = authFunctions;
                    //     const {success} = await refreshAuth()
                    //     if (!success) {
                    //         await signOut()
                    //     }
                    //     const originalRequest = config;
                    //     originalRequest._retry = true;
                    //     return nomicsAPI(originalRequest);
                    // }
                    break;
                default:
                    break;
            }
            if (checkNomicsAPIProtocol(response.data)) {
                throw error
            }
        } else if (request) {
            // status 100-200 timeout The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
            throw error;
        } else {
            // Something happened in setting up the request and triggered an error
            throw error
        }
    });

export default nomicsAPI;

import axios, {AxiosResponse} from "axios";
import {getApiInstanceConfig, checkAuthAPIProtocol} from "./index";
import {AuthAPIProtocolResponseData} from "../types";

export const defaultAuthAPIResponseData = {
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
    "successData": {},
    "timeSpent": 0
}
export const apiAuth = axios.create(getApiInstanceConfig());

apiAuth.interceptors.request.use(
    async (config) => {
        return config;
    },
    async error => {
        return Promise.reject(error)
    });
apiAuth.interceptors.response.use(
    (response: AxiosResponse<AuthAPIProtocolResponseData<any>>) => {
        // status 200-300
        if (checkAuthAPIProtocol(response.data)) {
            response.data = response.data.successData
        } else {
            response.data = defaultAuthAPIResponseData
        }
        return response
    },
    async (error) => {
        const {response, request} = error;
        if (response) {
            // status 300-600 The request was made and the server responded with a status code that falls out of the range of 2xx
            if(checkAuthAPIProtocol(response.data)){
                throw error
            }
        } else if (request) {
            // status 100-200 timeout The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
            throw error
        } else {
            // Something happened in setting up the request and triggered an error
            throw error
        }
    });

import axios, {AxiosResponse} from "axios";
import {AuthAPIError} from "../utils";
import {getApiInstanceConfig, validAuthAPIResponse} from "./index";
import {AuthAPIProtocolResponseData} from "../types";

export const defaultAuthAPIResponseData = {
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
        if (validAuthAPIResponse(response.data)) {
            response.data = response.data.success_data
        } else {
            response.data = defaultAuthAPIResponseData
        }
        return response
    },
    async (error) => {
        const {response, request} = error;
        if (response) {
            // status 300-600 The request was made and the server responded with a status code that falls out of the range of 2xx
            const {error_code, error_message, error_stack} = response.data.business_logic;
            if (error_code) {
                throw new AuthAPIError(error_message, error_code, error_stack)
            } else {
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

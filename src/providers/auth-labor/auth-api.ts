import axios from "axios";
import bunnyConfig from "../../config.json";
import {BunnyAPIError} from "../../utils";


const httpPrefix = bunnyConfig.isHttps ? 'https://' : 'http://';
const devProxyPrefix = bunnyConfig.isDevServerProxy ? Object.keys(bunnyConfig.devServerProxy)[0] : '';
export const apiAuth = axios.create({
    baseURL: bunnyConfig.isDevServerProxy
        ? `${bunnyConfig.devServer.domain}${bunnyConfig.devServer.port}${devProxyPrefix}`
        : bunnyConfig.isRemoteBackEnd
            ? `${httpPrefix}${bunnyConfig.remoteBackEnd.domain}:${bunnyConfig.remoteBackEnd.port}`
            : `${httpPrefix}${bunnyConfig.localBackEnd.domain}:${bunnyConfig.localBackEnd.port}`,
    timeout: 2000
});

apiAuth.interceptors.request.use(
    async (config) => {
        return config;
    },
    async error => {
        return Promise.reject(error)
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
apiAuth.interceptors.response.use(
    (response) => {
        // status 200-300
        if (validAPIProtocolSuccessResponse(response.data)) {
            response.data = response.data.success_data
        } else {
            response.data = {}
        }
        return response
    },
    async (error) => {
        const {response, request} = error;
        if (response) {
            // status 300-600 The request was made and the server responded with a status code that falls out of the range of 2xx
            const {error_code, error_message, error_stack} = error.data.business_logic;
            if (error_code) {
                Promise.reject(new BunnyAPIError(error_message, error_code, error_stack));
            } else {
                Promise.reject(error)
            }
        } else if (request) {
            // status 100-200 timeout The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
            return Promise.reject(request)
        } else {
            // Something happened in setting up the request and triggered an error
            return Promise.reject(error)
        }
    });

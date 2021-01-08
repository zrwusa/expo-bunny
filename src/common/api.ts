import axios from "axios";
import store from "../stores";

const isDevServerProxy = false;
const api = axios.create({baseURL: isDevServerProxy ? `http://192.168.50.19:3006/api` : `http://35.197.159.128:80`});

api.interceptors.request.use(
    async config => {
        const {authState} = store.getState();
        if (authState.accessToken) {
            config.headers = {
                "Authorization": `Bearer ${authState.accessToken}`,
                // "Accept": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

api.interceptors.response.use(
    (response) => {
        return response
    },
    async function (error) {
        if (error.response === undefined) {
            console.warn(`[React Bunny Warn]Request failed,first do not forget to run the mock server in another terminal with command 'yarn mock'`)
        }
        const originalRequest = error.config;
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
        return Promise.reject(error);
    });
export default api;

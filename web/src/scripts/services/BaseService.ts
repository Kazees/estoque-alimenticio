import axios, {AxiosError} from "axios";

const BaseService = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
})

const responseErrorHandler = (error: AxiosError): Promise<AxiosError> => {
    const currentPath = window.location.pathname;
    if (error.response?.status === 401 && currentPath !== "/login") {
        window.location.href = "/login";
    }
    if (error.response?.status === 403 && currentPath !== "/login") {
        window.location.href = "/login";
    }
    return Promise.reject(error);
}

BaseService.interceptors.response.use(undefined, responseErrorHandler);

export default BaseService;
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { idText } from "typescript";
import { history } from "../..";

axios.defaults.baseURL = "https://localhost:7081/api/";

const sleep = () => new Promise(resolve => setTimeout(resolve,500));

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error:AxiosError) => {
    const {data,status} = error.response!;
    switch (status) {
        case 400:
            if(data.errors){
                const modalStateErrors: string[] = [];
                for(const key in data.errors) {
                    if(data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            var location = {
                pathname: '/server-error',
                state: {data:data.detail}
            };
            history.push(location);
        //     history.push({pathname: '/server-error1',
        //         search: ''
        //  } );
            break;
        case 404:
            toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests= {
    get: (url: string) => axios.get(url).then(responseBody),
    put: (url: string) => axios.put(url).then(responseBody),
    post: (url: string) => axios.post(url).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id:number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;
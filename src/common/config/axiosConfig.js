import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;


axios.interceptors.request.use(
    config => {
        (config.headers['Authorization'] = `${localStorage.getItem('Authorization')}`);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


const AxiosConfigProvider = ({ children }) => {
    return children;
};

export default AxiosConfigProvider;
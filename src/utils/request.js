import axios from 'axios'

// import { Message } from "element-ui";

//创建axios,赋给变量service
const BASEURL = process.env.NODE_ENV === 'production' ? '/' : '/devApi';

const service = axios.create({
    baseURL:BASEURL,
    timeout:30000
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    const config = error.config;
    console.log(config)
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(error);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;

    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(error);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    const backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return service(config);
    });

});

export default service;

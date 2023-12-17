import axios from 'axios'
import { toast } from '~/composables/util'
import { getToken } from '~/composables/auth'

const service = axios.create({
    baseURL:"http://localhost:7007/"
})  

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = getToken()
    if (token) {
        config.headers.accessToken = token
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    toast(error.message || '请求错误',"error")
    return Promise.reject(error);
});


export default service
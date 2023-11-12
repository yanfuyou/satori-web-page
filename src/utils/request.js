import axios from 'axios'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    baseURL: 'https://www.mew-mew-satori.top/satori-service-api/',
    // baseURL: 'http://localhost:3001/satori-service-api/',
    timeout: 10000
})
// 请求拦截
service.interceptors.request.use(
    config => {
        const tokenVal = getToken();
        if (tokenVal) {
            config.headers['Authorization'] = 'Bearer ' + tokenVal;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    response => {
        if(response.config.hasOwnProperty('params') && response.config.params.hasOwnProperty('isThird')){
            return response.data;
        }else if(response.config.hasOwnProperty('data')){
            if(typeof response.config.data == 'string' && response.config.data.indexOf('isThird') != -1){
                return response.data;
            }
        }
        const res = {
            success: response.data.success,
            code: response.data.code,
            errMessage: response.data.errMsg,
            data: response.data.data
        }
        if (res.code === '401') {
            
        }
        if (res.code !== '0') {
            ElMessage({
                showClose: false,
                message: res.errMessage,
                type: 'error',
            })
            return Promise.reject(new Error(res.errMessage || 'Error'))
        } else {
            return res
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default service

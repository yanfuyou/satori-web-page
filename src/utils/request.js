import axios from 'axios'
import { getToken } from '@/utils/auth'
import { ElMessage } from 'element-plus'
const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    baseURL: 'http://localhost:8080/satori-service-api',
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
        const res = {
            code: response.data.code,
            errMessage: response.data.errMsg,
            data: response.data.data
        }
        if (res.code === '401') {
            
        }
        if (res.code !== '200') {
            ElMessage({
                showClose: false,
                message: res.errMessage,
                type: 'error',
            })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default service

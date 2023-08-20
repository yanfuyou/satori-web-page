import axios from 'axios'
import store from '@/store/useUserStore'
// import { getToken } from '@/utils/auth'

const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_API,
    baseURL: _APP_URL,
    timeout: 10000
})
// 请求拦截
service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            // config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截
service.interceptors.response.use(
    response => {
        const res = {
            code: response.data.code,
            message: response.data.msg,
            data: response.data.records
        }
        if (res.code === 401) {
            // MessageBox.confirm('请登录', '退出', {
            //     confirmButtonText: '重登',
            //     cancelButtonText: '关闭',
            //     type: 'warning'
            // }).then(() => {
            //     store.dispatch('user/resetToken').then(() => {
            //         location.reload()
            //     })
            // })
        }
        if (res.code !== 2000) {
            // Message({
            //     message: res.message || 'Error',
            //     type: 'error',
            //     duration: 5 * 1000
            // })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000
        // })
        return Promise.reject(error)
    }
)

export default service

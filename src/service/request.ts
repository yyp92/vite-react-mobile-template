import axios from 'axios'
import {message} from 'antd'
import {sessionCache} from '@/utils'
import {BASE_URL, TIMEOUT} from './config'

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
})

instance.interceptors.request.use((config: any) => {
    // * 添加请求头
    // 这里添加一个自定义的请求头
    // config.headers['Custom-Header'] = 'This is a custom header';

    // // 如果有Token等身份验证信息，也可以在这里添加到请求头中
    // const token = sessionCache.getCache('token');
    // if (token) {
    //     config.headers['Authorization'] = `Bearer ${token}`;
    // }

    return config
})

instance.interceptors.response.use(
    (res: any) => {
        // todo 根据实际的接口返回啥结构，来结合处理，最好把message的错误信息统一处理了
        return res.data
    },
    (err: any) => {
        const {
            code,
            message: msg
        } = err ?? {}

        if (!!code) {
            message.error(msg)
        }
    }
)

export const get = (url: string, data: any) => {
    return instance({
        baseURL: url,
        method: 'get',
        params: data
    })
}

export const post = (url: string, data: any) => {
    return instance({
        baseURL: url,
        method: 'post',
        data: data
    })
}

export default instance

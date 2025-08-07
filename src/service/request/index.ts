import axios from 'axios'
import type {AxiosRequestConfig} from 'axios'
import type { MyInternalAxiosRequestConfig } from './type'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

// * 存储待取消的请求：key 是请求唯一标识，value 是 AbortController 实例
const pendingRequests = new Map()

/**
 * * 生成请求唯一标识
 * @param config - Axios 请求配置
 * @returns 唯一标识字符串
 */
const generateKey = (config: AxiosRequestConfig) => {
    const {
        method,
        url,
        params,
        data
    } = config

    // 拼接方法、URL、参数（params 是 URL 参数，data 是请求体参数）
    return [
        method?.toUpperCase(),
        url,
        JSON.stringify(params || {}),
        JSON.stringify(data || {})
    ].join('&')
}

/**
 * * 添加请求到待取消列表（若存在重复请求则先取消）
 * @param config - Axios 请求配置
 */
const addPendingRequest = (config: AxiosRequestConfig) => {
    const requestKey = generateKey(config)

    // 若存在重复请求，先取消旧请求
    if (pendingRequests.has(requestKey)) {
        const controller = pendingRequests.get(requestKey)
        controller.abort(`取消重复请求：${requestKey}`)
        pendingRequests.delete(requestKey)
    }

    // 创建新的 AbortController 并关联到请求
    const controller = new AbortController()
    // 将 signal 绑定到请求配置
    config.signal = controller.signal
    pendingRequests.set(requestKey, controller)
}

/**
 * * 从待取消列表中移除请求（请求完成/失败/取消时调用）
 * @param config - Axios 请求配置
 */
const removePendingRequest = (config: AxiosRequestConfig) => {
    const requestKey = generateKey(config)

    if (pendingRequests.has(requestKey)) {
        pendingRequests.delete(requestKey)
    }
}

// * 创建 Axios 实例
const instance = axios.create({
    // 从环境变量取 baseURL
    baseURL: import.meta.env.VITE_APP_BASE_API, 
    timeout: 5000
})

// * 请求拦截器：添加取消逻辑
instance.interceptors.request.use(
    (config: MyInternalAxiosRequestConfig) => {
        // 允许通过配置关闭取消功能（例如某些特殊长轮询请求）
        if (config.cancelable !== false) {
            addPendingRequest(config)
        }

        const token = localCache.getCache(LOGIN_TOKEN)

        if (config.headers && token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// * 响应拦截器：清理已完成的请求
instance.interceptors.response.use(
    (response) => {
        removePendingRequest(response.config)

        // 直接返回响应体数据
        return response.data
    },
    (error) => {
        // 移除已失败/取消的请求
        if (error.config) {
            removePendingRequest(error.config)
        }

        // 区分取消错误和其他错误
        if (axios.isCancel(error)) {
            // 取消请求不视为错误，返回 null
            return Promise.resolve(null)
        }

        // 其他错误处理（如网络错误、404等）
        return Promise.reject(error)
    }
);

// 扩展实例：添加手动取消方法
const requestFn = {
    ...instance,

    request<T = any>(config: AxiosRequestConfig) {
        // 返回 promise
        return new Promise<T>((resolve, reject) => {
            instance
                .request<any, T>(config)
                .then((res) => {
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },

    get(config: AxiosRequestConfig) {
        return this.request({
            ...config,
            method: 'GET'
        })
    },

    post(config: AxiosRequestConfig) {
        return this.request({
            ...config,
            method: 'POST'
        })
    },

    delete(config: AxiosRequestConfig) {
        return this.request({
            ...config,
            method: 'DELETE'
        })
    },

    patch(config: AxiosRequestConfig) {
        return this.request({
            ...config,
            method: 'PATCH'
        })
    },

    /**
     * 手动取消单个请求
     * @param config - 请求配置（需包含 method、url，可选 params/data）
     * @param message - 取消原因
     * @returns 是否取消成功
     */
    cancelOne: (
        config: AxiosRequestConfig,
        message: string = '手动取消请求'
    ) => {
        const key = generateKey(config)

        if (pendingRequests.has(key)) {
            pendingRequests.get(key).abort(message)
            pendingRequests.delete(key)

            return true
        }

        return false
    },

    /**
     * 取消所有待处理的请求
     * @param message - 取消原因
     */
    cancelAll: (message: string = '取消所有请求') => {
        pendingRequests.forEach((controller, key) => {
            controller.abort(`${message}：${key}`)
            pendingRequests.delete(key)
        })
    }
}

export default requestFn
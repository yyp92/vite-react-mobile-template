import type { InternalAxiosRequestConfig } from 'axios'

export interface MyInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    cancelable?: boolean
}

import requestFn from './request'
import {apiUrl} from './api'

// 具体的接口
export const getDemo = () => {
    const queryData = {}

    return requestFn.get({
        url: apiUrl.demoUrl,
        params: {
            name: '111',
            age: 20
        }
    })
}

export const postDemo = () => {
    const queryData = {}

    return requestFn.post({
        url: apiUrl.demoUrl1,
        data: {
            name: '111222',
            age: 20
        }
    })
}
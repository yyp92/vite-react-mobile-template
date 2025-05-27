import {get, post} from './request'
import {apiUrl} from './api'

// 具体的接口
export const getDemo = () => {
    const queryData = {}

    return get(
        apiUrl.demoUrl,
        {
            name: '111',
            age: 20
        }
    )
}

export const postDemo = () => {
    const queryData = {}

    return post(
        apiUrl.demoUrl1,
        {
            name: '111222',
            age: 20
        }
    )
}
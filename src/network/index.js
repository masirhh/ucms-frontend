import axios from 'axios'


export function reqUser(config) {
    // 创建axios实例
    const instance = axios.create({
        baseURL: 'http://localhost:8081/ucms/user',
        timeout: 5000
    })
    // 设置拦截器，拦截结果只需要data
    instance.interceptors.response.use(res => {
        return res.data.data
    }, err => {
        err.message = 'Response Error!'
        return err
    })
    return instance(config)
}

export function reqClub(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8081/ucms/club',
        timeout: 5000
    })
    instance.interceptors.response.use(res => {
        return res.data.data
    }, err => {
        err.message = 'Response Error!'
        return err
    })
    return instance(config)

}

export function reqLoginUser(config){
    const instance = axios.create({
        baseURL: 'http://localhost:8081/ucms/redis/getUser',
        timeout: 5000
    })
    instance.interceptors.response.use(res => {
        return res.data.data
    }, err => {
        err.message = 'Response Error!'
        return err
    })
    return instance(config)
}
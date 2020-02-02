import axios from 'axios'


export function reqUser(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8081/ucms/user',
        timeout: 5000
    })
    return instance(config)
}
import axios from 'axios'
export function reqUser(config) {
    const instance = axios.create({
        baseURL: 'http://localhost:8081/user',
        timeout: 5000
    })
    return instance(config)
}
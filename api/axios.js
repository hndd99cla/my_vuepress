/*
 * @Description: axios
 * @Author: lzx
 * @Date: 2021-07-12 16:53:10
 */
import axios from "axios"

const API_BASEURL = "http://node.lzxx.xyz/lzx"//api基础路径
const CLIENT_TIMEOUT = process.env.VUE_APP_TIMEOUT || 8000//链接时间
const service = axios.create({
    baseURL: API_BASEURL,
    timeout: CLIENT_TIMEOUT,
    headers: {
        "Content-Type": "application/json"
    }
})

// 请求
service.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

//响应拦截
service.interceptors.response.use(response => {
    const res = response.data
    return res
}, error => {
    return Promise.reject(error)
})
export default service

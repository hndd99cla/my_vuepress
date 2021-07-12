/*
 * @Description:
 * @Author: lzx
 * @Date: 2021-07-12 16:53:20
 */

import axios from "./axios"

export function getIntroduction (data) {
    return axios({
        method: "get",
        url: "/getIntroduction",
        params: data
    })
}
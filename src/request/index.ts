import axios from "axios"
import type { AxiosRequestConfig } from "axios"
import type { CallApiParams } from "./types"
const instance = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
    // "Access-Control-Allow-Origin": "*"
  },
  // 请求时长
  timeout: 1000 * 10
})

/**
 * @param {string} api 接口名
 * @param {object} params 接口入参
 * @param {string} prefix 接口前缀 默认 /api/draw-lots
 * @param {string} method 请求方法，默认 post
 * @param {AxiosRequestConfig} config axios配置
 */
export const callApi = async ({
  api,
  params = {},
  prefix = "/api/draw-lots",
  method = "post",
  config = {}
}: CallApiParams) => {
  /**
   * 接口请求配置
   */
  const requestParams: AxiosRequestConfig = {
    url: api,
    method,
    baseURL: "http://yyhome.anshuye.cn:3030" + prefix,
    ...config
  }
  const dataKey = method === "get" ? "params" : "data"
  requestParams[dataKey] = params

  try {
    const res = await instance.request<Record<string, any>>(requestParams)
    console.log("相应值", res)
    const { data } = res
    if (res.status === 200) return data
    return Promise.reject(data.msg) as any
  } catch (error) {
    return Promise.reject(error) as any
  }
}

import type { Method, AxiosRequestConfig } from "axios"

export interface RequestParams {
  api: string
  params?: Record<string, any>
  method?: Method
  config?: AxiosRequestConfig
}

export interface CallApiParams extends RequestParams {
  prefix?: string
}

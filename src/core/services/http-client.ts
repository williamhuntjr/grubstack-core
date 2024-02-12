import axios from 'axios'
import { appConfig } from 'common/config'

export const HttpClient = axios.create({
  baseURL: appConfig.apiLocation,
  withCredentials: true,
})

export const httpClientToken = 'HttpClient'

export type IHttpClient = typeof HttpClient

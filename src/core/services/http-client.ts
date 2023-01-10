import axios, { AxiosHeaders } from 'axios'
import { appConfig } from 'common/config'

export const HttpClient = axios.create({
  baseURL: appConfig.apiLocation,
})

export const setAxiosTokenInterceptor = async (getAccessTokenSilently: () => Promise<string>): Promise<void> => {
  HttpClient.interceptors.request.use(async config => {
    const accessToken = await getAccessTokenSilently()
    const updatedConfig = { ...config }
    if (accessToken) {
      (updatedConfig.headers as AxiosHeaders).set('Authorization', `Bearer ${accessToken}`)
    }
    return updatedConfig
  })
}

export const httpClientToken = 'HttpClient'

export type IHttpClient = typeof HttpClient

import axios, { AxiosHeaders } from 'axios'
import jwt_decode from 'jwt-decode'
import { appConfig } from 'common/config'
import { IJWTToken } from 'common/types'
import { getAccessToken, getUsername, getUserId, setAccessToken } from 'common/utils/user'

export const HttpClient = axios.create({
  baseURL: appConfig.apiLocation,
})

export const setAxiosTokenInterceptor = async (getAccessTokenSilently: () => Promise<string>): Promise<void> => {
  HttpClient.interceptors.request.use(async config => {
    let accessToken
    const username = getUsername()
    const userId = getUserId()
    accessToken = getAccessToken()
    if (accessToken == undefined) {
      accessToken = await getAccessTokenSilently()
      if (accessToken) {
        setAccessToken(accessToken)
      }
    }
    else {
      const decoded:IJWTToken = jwt_decode(accessToken)
      if (decoded.exp < Date.now() / 1000) {
        accessToken = await getAccessTokenSilently()
      }
      if (accessToken) {
        setAccessToken(accessToken)
      }
    }
    const updatedConfig = { ...config }
    if (accessToken) {
      (updatedConfig.headers as AxiosHeaders).set('Authorization', `Bearer ${accessToken}`)
    }
    if (username) {
      (updatedConfig.headers as AxiosHeaders).set('Grub-User', `${username}`)
    }
    if (userId) {
      (updatedConfig.headers as AxiosHeaders).set('Grub-User-Id', `${userId}`)
    }
    return updatedConfig
  })
}

export const httpClientToken = 'HttpClient'

export type IHttpClient = typeof HttpClient

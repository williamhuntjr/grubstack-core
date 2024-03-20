import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { IHttpClient } from 'core/services/http-client'
import { IAuthService, RefreshTokenError } from './auth.types'

export class HttpRetryPolicy {
  private retries: number = 2

  private readonly blackListUrls: Map<string, string> = new Map<string, string>()
  // We use separate httpClient to make sure that no interceptors will be applied to retried calls
  private readonly httpClient: IHttpClient

  constructor(private readonly authService: IAuthService, { defaults, interceptors }: IHttpClient) {
    // We clone the initial httpClient to clean up all response interceptors
    this.httpClient = axios.create({ baseURL: defaults.baseURL })
    this.httpClient.interceptors.request = interceptors.request
  }

  public addUrlToBlackList(url: string): void {
    this.blackListUrls.set(url, url)
  }

  public setRetries(retries: number): void {
    if (retries <= 0) {
      throw new Error('Number of retries should be more than 0.')
    }
    this.retries = retries
  }

  public async retry<T>(initialError: AxiosError): Promise<AxiosResponse<T>> {
    const { response, config: request } = initialError
    if (!response || !request?.url || this.blackListUrls.has(request.url)) {
      throw initialError
    }
    try {
      if (response.status === 401) {
        await this.authService.refreshToken()
      }
      return await this.retryRequest(request)
    } catch (e) {
      if (e instanceof RefreshTokenError) {
        throw initialError
      }
      throw e
    }
  }

  private async retryRequest<T>(request: AxiosRequestConfig, retryNumber: number = 1): Promise<AxiosResponse<T>> {
    try {
      return await this.httpClient.request(request)
    } catch (e) {
      if (retryNumber < this.retries) {
        return await this.retryRequest(request, retryNumber + 1)
      }
      throw e
    }
  }
}
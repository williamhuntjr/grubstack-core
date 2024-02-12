import { IHttpClient } from 'core/services/http-client'
import { IAuthService } from './auth.types'

export class AuthRequestInterceptor {
  private blackListUrls: Map<string, string> = new Map<string, string>()

  constructor(private readonly authService: IAuthService, private readonly httpClient: IHttpClient) {}

  public addUrlToBlackList(url: string): void {
    this.blackListUrls.set(url, url)
  }

  public initializeInterceptor(): void {
    this.httpClient.interceptors.request.use(
      (config) => {
        const updatedConfig = { ...config }
        if ((config.method === 'POST' || config.method === 'PATCH' || config.method === 'PUT') && updatedConfig.headers != undefined) {
          updatedConfig.headers['Content-Type'] = 'application/json'
        }
        const token = this.authService.getAccessToken()
        // we the requests for the refresh url will add the refresh token
        // so we avoid adding the access token here
        if (token && config.url && !this.blackListUrls.has(config.url) && updatedConfig.headers) {
          updatedConfig.headers.Authorization = token
        }
        return updatedConfig
      },
      (error) => Promise.reject(error)
    )
  }
}
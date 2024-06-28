import { IHttpClient } from 'core/services/http-client'

export class AuthRequestInterceptor {
  private blackListUrls: Map<string, string> = new Map<string, string>()

  constructor(private readonly httpClient: IHttpClient) {}

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
        return updatedConfig
      },
      (error) => Promise.reject(error)
    )
  }
}

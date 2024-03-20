import { AxiosError } from 'axios'
import { IHttpClient } from 'core/services/http-client'
import { refreshTokenEndpointUrl } from './auth.constants'
import { IAuthService } from './auth.types'
import { HttpRetryPolicy } from './retry-policy'

export class AuthResponseInterceptor {
  private readonly retryPolicy: HttpRetryPolicy

  constructor(
    private readonly httpClient: IHttpClient,
    private readonly authService: IAuthService,
  ) {
    this.retryPolicy = new HttpRetryPolicy(authService, httpClient)
    this.retryPolicy.addUrlToBlackList(refreshTokenEndpointUrl)
  }

  public initializeInterceptor(): void {
    this.httpClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error?.response?.status === 403) {
          throw error
        }
        if (error?.response?.status !== 401) {
          throw error           
        }
        try {
          return await this.retryPolicy.retry(error)
        } catch (e) {
          void this.authService.logout()
        }
        return
      }
    )
  }
}
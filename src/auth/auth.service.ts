import { AxiosInstance } from 'axios'
import { BehaviorSubject, Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { IResponse } from 'common/types'
import { IAuthService, IUser, FailedRefreshTokenError } from './auth.types'
import { refreshTokenEndpointUrl } from './auth.constants'
import { AuthRequestInterceptor } from './request-interceptor'
import { AuthResponseInterceptor } from './response-interceptor'

export class AuthService implements IAuthService {
  constructor(private readonly apiClient: AxiosInstance) {
    this.initializeRequestInterceptor()
    this.initializeResponseInterceptor()
  }

  private initializeRequestInterceptor(): void {
    const requestInterceptor = new AuthRequestInterceptor(this.apiClient)
    requestInterceptor.addUrlToBlackList(refreshTokenEndpointUrl)
    requestInterceptor.initializeInterceptor()
  }

  private initializeResponseInterceptor(): void {
    const responseInterceptor = new AuthResponseInterceptor(this.apiClient, this)
    responseInterceptor.initializeInterceptor()
  }

  private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated())

  public async refreshToken(): Promise<void> {
    const resp = await this.apiClient.post<IResponse<IUser>>(refreshTokenEndpointUrl, null, {})
    if (resp.status !== 201) {
      throw new FailedRefreshTokenError()
    }
    this.authSubject.next(true)
  }

  public isAuthenticated$: Observable<boolean> = this.authSubject.asObservable().pipe(distinctUntilChanged())

  public isAuthenticated(): boolean {
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')()
    if (isBrowser) {
      return true
    }
    return false
  }

  public getUser(): IUser {
    const localStorageUser = localStorage.getItem('grubstackUser')
    return JSON.parse(localStorageUser ?? '') as IUser
  }
}

import { AxiosInstance } from 'axios'
import { BehaviorSubject, Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { IResponse } from 'common/types'
import { 
  IAuthService,
  IUser,
  MissedRefreshTokenError,
  FailedRefreshTokenError
} from './auth.types'
import { refreshTokenEndpointUrl } from './auth.constants'
import { AuthRequestInterceptor } from './request-interceptor'
import { AuthResponseInterceptor } from './response-interceptor'

export class AuthService implements IAuthService {
  constructor(private readonly apiClient: AxiosInstance) {
    this.initializeRequestInterceptor()
    this.initializeResponseInterceptor()
  }
  
  private initializeRequestInterceptor(): void {
    const requestInterceptor = new AuthRequestInterceptor(this, this.apiClient)
    requestInterceptor.addUrlToBlackList(refreshTokenEndpointUrl)
    requestInterceptor.initializeInterceptor()
  }

  private initializeResponseInterceptor(): void {
    const responseInterceptor = new AuthResponseInterceptor(this.apiClient, this)
    responseInterceptor.initializeInterceptor()
  }

  private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isAuthenticated())

  public getUser(): IUser | undefined {
    const localStorageData = localStorage.getItem('grubstackUser')
    if (localStorageData != null) {
      const parsedData:IUser = JSON.parse(localStorageData)
      return parsedData
    }
    return undefined
  }

  public setUser(userInfo: IUser): void {
    localStorage.setItem('grubstackUser', JSON.stringify(userInfo))
  }

  public async fetchUserData(): Promise<IUser> {
    const resp = await this.apiClient.get('/auth/whoami')
    return resp.data.data
  }

  public getAccessToken(): string|undefined {
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')()
    if (isBrowser) {
      const localStorageData = localStorage.getItem('grubstackUser')
      if (localStorageData != null) {
        const parsedData:IUser = JSON.parse(localStorageData)
        return parsedData.access_token
      }
    }
    return undefined
  }

  public getRefreshToken(): string|undefined {
    const localStorageData = localStorage.getItem('grubstackUser')
    if (localStorageData != null) {
      const parsedData:IUser = JSON.parse(localStorageData)
      return parsedData.refresh_token
    }
    return undefined
  }

  public async refreshToken(): Promise<void> {
    const refreshToken = this.getRefreshToken()
    if (!refreshToken) {
      throw new MissedRefreshTokenError()
    }
    const headers = {
      Authorization: `Bearer ${refreshToken}`,
    }
    const resp = await this.apiClient.post<IResponse<IUser>>(refreshTokenEndpointUrl, null, { headers })
    if (resp.status !== 201) {
      throw new FailedRefreshTokenError()
    }
    localStorage.removeItem('grubstackUser')
    localStorage.setItem('grubstackUser', JSON.stringify(resp.data.data))
    this.authSubject.next(true)
  }

  private isTokenExpired(): boolean {
    const user = this.getUser()
    if (!user?.access_token_expiration) {
      return false
    }
    return user.access_token_expiration < Date.now() / 1000
  }

  public isAuthenticated$: Observable<boolean> = this.authSubject.asObservable().pipe(distinctUntilChanged())

  public isAuthenticated(): boolean {
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')()
    if (isBrowser) {
      const token = this.getAccessToken()
      if (!token) {
        return false
      }
      if (!this.isTokenExpired()) {
        return true
      }
      return !this.isRefreshTokenExpired()
    }
    return false
  }

  private isRefreshTokenExpired(): boolean {
    const user = this.getUser()
    if (!user?.refresh_token || !user?.refresh_token_expiration) {
      return true
    }
    return user.refresh_token_expiration < Date.now() / 1000
  }

  public async logout(): Promise<void> {
    await this.apiClient.post('/auth/logout')
    localStorage.removeItem('grubstackUser')
    this.authSubject.next(false)
  }
}
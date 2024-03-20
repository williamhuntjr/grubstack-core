import { Observable } from 'rxjs'

export interface IAuthService {
  getUser(): IUser | undefined
  setUser(userInfo: IUser): void
  fetchUserData(): Promise<IUser> 
  getAccessToken(): string|undefined
  getRefreshToken(): string|undefined
  refreshToken(): Promise<void>
  isAuthenticated$: Observable<boolean>
  isAuthenticated(): boolean
  logout(): Promise<void>
}

export class RefreshTokenError extends Error {}

export class MissedRefreshTokenError extends RefreshTokenError {
  public message: string = 'No refresh token is stored for the current user.'
}

export class FailedRefreshTokenError extends RefreshTokenError {
  public message: string = 'Failed to refresh the access token.'
}

export interface IUser {
  id: string
  first_name: string
  last_name: string
  username: string
  permissions: Array<string>
  stripe_customer_id: string
  access_token: string
  access_token_expiration: number
  access_token_expires_in: number
  access_token_jti: string
  refresh_token: string
  refresh_token_expiration: number
  refresh_token_expires_in: number
  refresh_token_jti: string
}
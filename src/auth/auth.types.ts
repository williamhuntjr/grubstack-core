import { Observable } from 'rxjs'

export interface IAuthService {
  refreshToken(): Promise<void>
  isAuthenticated$: Observable<boolean>
  isAuthenticated(): boolean
  getUser(): IUser
}

export class RefreshTokenError extends Error {}

export class MissedRefreshTokenError extends RefreshTokenError {
  public message: string = 'No refresh token is stored for the current user.'
}

export class FailedRefreshTokenError extends RefreshTokenError {
  public message: string = 'Failed to refresh the access token.'
}

export interface IUser {
  first_name: string
  last_name: string
  username: string
  permissions: Array<string>
}

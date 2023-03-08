import { IUser } from 'common/auth/auth.types'

export function getAccessToken(): string|undefined {
  const localStorageData = localStorage.getItem('grubToken')
  if (localStorageData != null) {
    return localStorageData
  }
  return undefined
}

export function setAccessToken(accessToken: string): void {
  if (accessToken) {
    localStorage.setItem('grubToken', accessToken)
  }
}

export function getUsername(): string {
  let username = ''
  const localStorageData = localStorage.getItem('grubUserInfo')
  if (localStorageData != null) {
    const parsedData:IUser = JSON.parse(localStorageData)
    username = parsedData.email ?? ''
  }
  return username
}

export function getUserId(): string {
  let userId = ''
  const localStorageData = localStorage.getItem('grubUserInfo')
  if (localStorageData != null) {
    const parsedData:IUser = JSON.parse(localStorageData)
    userId = parsedData.sub ?? ''
  }
  return userId
}
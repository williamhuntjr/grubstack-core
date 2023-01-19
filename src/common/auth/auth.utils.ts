import { IUser } from './auth.types'

export function validateRoutePermissions(permissions: string[]): boolean {
  let user:IUser|null = null
  const userInfo = localStorage.getItem('grubUserInfo')
  if (userInfo != null) {
    user = JSON.parse(userInfo)
  }
  return user != null ?
    permissions.filter((permission) => user!.permissions.indexOf(permission) > -1).length > 0 || permissions.length <= 0
  : false
}

export function validatePermissions(permissions: string[]): boolean {
  let user:IUser|null = null
  const userInfo = localStorage.getItem('grubUserInfo')
  if (userInfo != null) {
    user = JSON.parse(userInfo)
  }
  return user != null ?
    permissions.filter((permission) => user!.permissions.indexOf(permission) > -1).length == permissions.length || permissions.length <= 0
  : false
}

export function hasPermission(permission: string): boolean {
  let user:IUser|null = null
  const userInfo = localStorage.getItem('grubUserInfo')
  if (userInfo != null) {
    user = JSON.parse(userInfo)
  }
  return user != null ?
    user.permissions.indexOf(permission) > -1
  : false
}

export function getPermissions(): string[] {
  let user:IUser|null = null
  const userInfo = localStorage.getItem('grubUserInfo')
  if (userInfo != null) {
    user = JSON.parse(userInfo)
  }
  return user != null ? user.permissions ?? [] : []
}
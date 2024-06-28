import { UserPermissions } from 'auth/auth.constants'

export interface IGuardedRoute {
  component?: JSX.Element
  redirectTo?: string
  permissions?: UserPermissions[]
}

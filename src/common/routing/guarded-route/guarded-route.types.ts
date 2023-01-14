import { UserPermissions } from 'common/auth/auth.constants'

export interface IGuardedRoute  {
  component?: JSX.Element
  redirectTo?: string
  permissions?: UserPermissions[]
}
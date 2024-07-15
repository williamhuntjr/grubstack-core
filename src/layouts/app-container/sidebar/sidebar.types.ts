import { OverridableComponent } from '@mui/types'
import { SvgIconTypeMap } from '@mui/material'
import { UserPermissions } from 'auth/auth.constants'

export interface ISidebarRoute {
  label: string
  path: string
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
  permissions?: UserPermissions[]
  rootPermissions?: Array<Array<UserPermissions>>
}

export interface ISidebarNavRoute extends ISidebarRoute {
  submenu?: ISidebarRoute[]
}

export interface ISidebarItem {
  route: ISidebarNavRoute
  onClick: () => void
}

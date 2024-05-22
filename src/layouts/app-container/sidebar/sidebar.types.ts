import { OverridableComponent } from '@mui/types'
import { SvgIconTypeMap } from '@mui/material'
import { UserPermissions } from 'auth/auth.constants'

export interface ISidebarRoute {
  label: string
  path: string
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  }
  permissions?: UserPermissions[]
  shouldReload?: boolean
}

export interface ISidebarNavRoute extends ISidebarRoute {
  submenu?: ISidebarRoute[]
}

export interface ISidebar {
  isMobile: boolean
}

export interface ISidebarItem {
  route: ISidebarNavRoute
}
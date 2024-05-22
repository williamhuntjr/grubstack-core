import { OverridableComponent } from '@mui/types'
import { SvgIconTypeMap } from '@mui/material'
import { UserPermissions } from 'auth/auth.constants'

export interface ISideNavbar {
  label?: string
  rootPath: string
  routes: ISideNavbarRoute[]
}

export interface ISideNavbarRoute {
  label: string
  path: string
  permissions?: UserPermissions[]
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
}
}
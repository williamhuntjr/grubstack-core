import * as React from 'react'
import { OverridableComponent } from '@mui/types'
import { SvgIconTypeMap } from '@mui/material'
import { UserPermissions } from 'common/auth/auth.constants'
import { Required } from 'utility-types'
import { ILazyModule, IModuleDefinition } from 'core/react-lazy-modules/react-lazy-modules.types'

export interface IRouteGuard {
  validate(): boolean // TODO support async validation
}

export type RouteGuardConstructor = new () => IRouteGuard

export interface IRoute {
  path: string
  component?: React.FC<{}>
  name?: string
  children?: IRoute[]
  isSidebarButton?: boolean
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>
  redirectTo?: string
  permissions?: UserPermissions[]
}

export type ChildRoutesFactory<Definition extends IModuleDefinition> = (definition: Definition) => IRoute[]

export interface IAsyncRoute<Definition extends IModuleDefinition> {
  path: string
  module: ILazyModule<Definition>
  childrenRoutesFactory: ChildRoutesFactory<Definition>
  name?: string
  isSidebarButton?: boolean
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>
  redirectTo?: string
  permissions?: UserPermissions[]
}

export type ParentRoute = Required<IRoute, 'children'>

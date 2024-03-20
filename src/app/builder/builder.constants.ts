import { UserPermissions } from 'auth/auth.constants'
export const builderServiceToken = 'BuilderService'
export const builderModule = 'BuilderModule'

export const builderRoutePath = '/builder'

export enum BuilderTypes {
  Item = 'Item',
  Menu = 'Menu',
  Ingredient = 'Ingredient',
  Variety = 'Variety'
}
export enum BuilderParams {
  Item = 'item',
  Menu = 'menu',
  Variety = 'variety'
}

export const builderPermissions = [
  UserPermissions.MaintainItems,
  UserPermissions.MaintainMenus,
  UserPermissions.MaintainVarieties,
]
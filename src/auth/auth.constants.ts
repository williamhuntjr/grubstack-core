export const authServiceToken = 'AuthService'

export const refreshTokenEndpointUrl = '/auth/refresh'

export enum UserPermissions {
  ViewStores = 'ViewStores',
  MaintainStores = 'MaintainStores',
  ViewMenus = 'ViewMenus',
  MaintainMenus = 'MaintainMenus',
  ViewItems = 'ViewItems',
  MaintainItems = 'MaintainItems',
  ViewIngredients = 'ViewIngredients',
  MaintainIngredients = 'MaintainIngredients',
  ViewVarieties = 'ViewVarieties',
  MaintainVarieties = 'MaintainVarieties',
  ViewMediaLibrary = 'ViewMediaLibrary',
  MaintainMediaLibrary = 'MaintainMediaLibrary',
  ViewEmployees = 'ViewEmployees',
  MaintainEmployees = 'MaintainEmployees',
  ViewFranchises = 'ViewFranchises',
  MaintainFranchises = 'MaintainFranchises'
}
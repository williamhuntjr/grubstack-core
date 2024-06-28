export const authServiceToken = 'AuthService'

export const refreshTokenEndpointUrl = '/auth/refresh'

export enum UserPermissions {
  ViewRestaurant = 'ViewRestaurant',
  MaintainRestaurant = 'MaintainRestaurant',
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
  ViewDeliveryZones = 'ViewDeliveryZones',
  MaintainDeliveryZones = 'MaintainDeliveryZones',
  ViewReviews = 'ViewReviews',
  MaintainReviews = 'MaintainReviews',
  ViewReports = 'ViewReports',
  MaintainReports = 'MaintainReports',
  ViewMarketing = 'ViewMarketing',
  MaintainMarketing = 'MaintainMarketing',
}

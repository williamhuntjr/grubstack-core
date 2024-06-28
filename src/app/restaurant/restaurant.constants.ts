import { UserPermissions } from 'auth/auth.constants'

export const restaurantServiceToken = 'RestaurantService'
export const restaurantModule = 'RestaurantModule'
export const restaurantRoutePath = '/restaurant'

export const restaurantBrandingPath = `${restaurantRoutePath}/branding`
export const restaurantLocationsPath = `${restaurantRoutePath}/locations`
export const restaurantMenusPath = `${restaurantRoutePath}/menus`
export const restaurantOrderTypesPath = `${restaurantRoutePath}/order-types`
export const restaurantWorkingHoursPath = `${restaurantRoutePath}/working-hours`
export const restaurantEmployeesPath = `${restaurantRoutePath}/employees`
export const restaurantDeliveryZonesPath = `${restaurantRoutePath}/delivery-zones`
export const restaurantPaymentSetupPath = `${restaurantRoutePath}/payment-setup`
export const restaurantNotificationsPath = `${restaurantRoutePath}/notifications`
export const restaurantOrderSettingsPath = `${restaurantRoutePath}/order-settings`
export const restaurantLoggingPath = `${restaurantRoutePath}/logging`

export const restaurantPermissions = [UserPermissions.ViewRestaurant, UserPermissions.MaintainRestaurant]

export enum RestaurantProperty {
  'RestaurantName' = 'restaurant_name',
  'LogoImageUrl' = 'logo_image_url',
  'BannerImageUrl' = 'banner_image_url',
  'MobileBannerImageUrl' = 'mobile_banner_image_url',
}

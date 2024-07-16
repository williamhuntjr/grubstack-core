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

export const restaurantPermissions = [UserPermissions.ViewRestaurants, UserPermissions.MaintainRestaurants]

export enum RestaurantProperty {
  'RestaurantName' = 'restaurant_name',
  'LogoImageUrl' = 'logo_image_url',
  'BannerImageUrl' = 'banner_image_url',
  'MobileBannerImageUrl' = 'mobile_banner_image_url',
  'PrimaryColor' = 'primary_color',
  'PrimaryColorContrast' = 'primary_color_contrast',
  'SecondaryColor' = 'secondary_color',
  'SecondaryColorContrast' = 'secondary_color_contrast',
  'HeaderBackgroundColor' = 'header_background_color',
  'HeaderForegroundColor' = 'header_foreground_color',
  'FooterBackgroundColor' = 'footer_background_color',
  'FooterForegroundColor' = 'footer_foreground_color',
  'TextColor' = 'text_color',
  'HeadlineTextColor' = 'headline_text_color',
}

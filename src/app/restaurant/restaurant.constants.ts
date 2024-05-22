import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PaymentIcon from '@mui/icons-material/Payment'
import SettingsIcon from '@mui/icons-material/Settings'
import CameraIcon from '@mui/icons-material/Camera'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import ArticleIcon from '@mui/icons-material/Article'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import FaceIcon from '@mui/icons-material/Face'
import PlaceIcon from '@mui/icons-material/Place'
import FoodBankIcon from '@mui/icons-material/FoodBank'
import MenuBookIcon from '@mui/icons-material/MenuBook'

import { UserPermissions } from 'auth/auth.constants'

export const restaurantServiceToken = 'RestaurantService'
export const restaurantModule = 'RestaurantModule'
export const restaurantRoutePath = '/restaurant'

export const restaurantBrandingPath = `${restaurantRoutePath}/branding`
export const restaurantLocationsPath = `${restaurantRoutePath}/locations`
export const restaurantMenusPath = `${restaurantRoutePath}/food-menus`
export const restaurantOrderTypesPath = `${restaurantRoutePath}/order-types`
export const restaurantWorkingHoursPath = `${restaurantRoutePath}/working-hours`
export const restaurantEmployeesPath = `${restaurantRoutePath}/employees`
export const restaurantDeliveryZonesPath = `${restaurantRoutePath}/delivery-zones`
export const restaurantPaymentSetupPath = `${restaurantRoutePath}/payment-setup`
export const restaurantNotificationsPath = `${restaurantRoutePath}/notifications`
export const restaurantOrderSettingsPath = `${restaurantRoutePath}/order-settings`
export const restaurantLoggingPath = `${restaurantRoutePath}/logging`

export const restaurantPermissions = [
  UserPermissions.ViewRestaurant,
  UserPermissions.MaintainRestaurant
]

export const locationPermissions = [
  UserPermissions.ViewLocations,
  UserPermissions.MaintainLocations
]

export const restaurantSideNavbarLinks = [
  {
    label: 'Branding',
    path: '/branding',
    icon: CameraIcon
  },
  {
    label: 'Locations',
    path: '/locations',
    icon: PlaceIcon,
    permissions: locationPermissions
  },
  {
    label: 'Food Menus',
    path: '/food-menus',
    icon: MenuBookIcon,
    permissions: restaurantPermissions
  },
  {
    label: 'Order Types',
    path: '/order-types',
    icon: FoodBankIcon
  },
  {
    label: 'Working hours',
    path: '/working-hours',
    icon: AccessTimeIcon
  },
  {
    label: 'Employees',
    path: '/employees',
    icon: FaceIcon
  },
  {
    label: 'Delivery Zones',
    path: '/delivery-zones',
    icon: DeliveryDiningIcon
  },
  {
    label: 'Payment setup',
    path: '/payment-setup',
    icon: PaymentIcon
  },
  {
    label: 'Notifications',
    path: '/notifications',
    icon: CircleNotificationsIcon
  },
  {
    label: 'Order Settings',
    path: '/order-settings',
    icon: SettingsIcon
  },
  {
    label: 'Logging',
    path: '/logging',
    icon: ArticleIcon
  }
]
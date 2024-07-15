import StorefrontIcon from '@mui/icons-material/Storefront'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { Locations } from './locations/locations'
import { Branding } from './branding/branding'
import { OrderTypes } from './order-types/order-types'
import { RestaurantModule, RestaurantModuleDefinition } from './restaurant.module'
import { restaurantPermissions, restaurantRoutePath } from './restaurant.constants'
import { Restaurant } from './restaurant'
import { FoodMenus } from './food-menus/food-menus'
import { WorkingHours } from './working-hours/working-hours'

function restaurantRouteFactory({}: RestaurantModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      component: Restaurant,
      permissions: restaurantPermissions,
    },
    {
      path: '/branding',
      component: Branding,
      permissions: restaurantPermissions,
    },
    {
      path: '/branding/:locationId',
      component: Branding,
      permissions: restaurantPermissions,
    },
    {
      path: '/locations',
      component: Locations,
      permissions: restaurantPermissions,
    },
    {
      path: '/locations/:locationId',
      component: Locations,
      permissions: restaurantPermissions,
    },
    {
      path: '/menus',
      component: FoodMenus,
      permissions: restaurantPermissions,
    },
    {
      path: '/menus/:locationId',
      component: FoodMenus,
      permissions: restaurantPermissions,
    },
    {
      path: '/order-types',
      component: OrderTypes,
      permissions: restaurantPermissions,
    },
    {
      path: '/order-types/:locationId',
      component: OrderTypes,
      permissions: restaurantPermissions,
    },
    {
      path: '/working-hours',
      component: WorkingHours,
      permissions: restaurantPermissions,
    },
    {
      path: '/working-hours/:locationId',
      component: WorkingHours,
      permissions: restaurantPermissions,
    },
    {
      path: '/delivery-zones',
      component: Branding,
      permissions: restaurantPermissions,
    },
    {
      path: '/payment-setup',
      component: Branding,
      permissions: restaurantPermissions,
    },
    {
      path: '/notifications',
      component: Branding,
      permissions: restaurantPermissions,
    },
    {
      path: '/order-settings',
      component: Branding,
      permissions: restaurantPermissions,
    },
    {
      path: '/logging',
      component: Branding,
      permissions: restaurantPermissions,
    },
  ]
}

export const restaurantRoute: IAsyncRoute<RestaurantModuleDefinition> = {
  module: RestaurantModule,
  path: restaurantRoutePath,
  name: 'Restaurant',
  isSidebarButton: true,
  permissions: restaurantPermissions,
  icon: StorefrontIcon,
  childrenRoutesFactory: restaurantRouteFactory,
}

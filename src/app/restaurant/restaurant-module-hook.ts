import { Overwrite } from 'utility-types'
import { Injector } from 'core/injector/injector.service'
import { moduleHookResolver } from 'core/react-lazy-modules/react-lazy-modules.utils'
import { LazyModulesService } from 'core/react-lazy-modules/react-lazy-modules.service'
import { IRestaurantModuleService, RestaurantModule, RestaurantModuleDefinition } from './restaurant.module'
import { restaurantServiceToken } from './restaurant.constants'
import { IRestaurantService } from './restaurant.types'
import { locationServiceToken } from './locations/locations.constants'
import { ILocationService } from './locations/locations.types'

function resolveRestaurantModule(): Overwrite<RestaurantModuleDefinition, IRestaurantModuleService> {
  const RestaurantService = Injector.resolve<IRestaurantService>(restaurantServiceToken)
  const LocationService = Injector.resolve<ILocationService>(locationServiceToken)

  const module = LazyModulesService.resolveModule<RestaurantModuleDefinition>(RestaurantModule)

  return {
    ...module,
    RestaurantService,
    LocationService,
  }
}

export const useRestaurantModule = moduleHookResolver(resolveRestaurantModule)

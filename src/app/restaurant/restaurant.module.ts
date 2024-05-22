import { ILazyModule } from 'core/react-lazy-modules/react-lazy-modules.types'
import { Injector } from 'core/injector/injector.service'
import { httpClientToken, IHttpClient } from 'core/services/http-client'
import { Scope } from 'core/injector/injector.types'
import { CoreModule } from 'core/core.module'
import { ProductModule } from 'app/products/products.module'
import { ILocationService } from './locations/locations.types'
import { locationServiceToken } from './locations/locations.constants'
import {
  restaurantModule,
  restaurantServiceToken
} from './restaurant.constants'
import { IRestaurantService } from './restaurant.types'

export type RestaurantModuleDefinition = typeof import('./restaurant.exports')

export interface IRestaurantModuleService {
  RestaurantService: IRestaurantService
  LocationService: ILocationService
}

export const RestaurantModule: ILazyModule<RestaurantModuleDefinition> = {
  name: restaurantModule,
  resolver: () => import('./restaurant.exports'),
  initializer: ({
    RestaurantService,
    LocationService
  }) => {
    const httpClient = Injector.resolve<IHttpClient>(httpClientToken)
    Injector.register<IRestaurantService>(restaurantServiceToken, () => new RestaurantService(httpClient), Scope.Singleton)
    Injector.register<ILocationService>(locationServiceToken, () => new LocationService(httpClient), Scope.Singleton)
  },
  dependencies: [CoreModule, ProductModule],
}

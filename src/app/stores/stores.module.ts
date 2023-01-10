import { ILazyModule } from 'core/react-lazy-modules/react-lazy-modules.types'
import { Injector } from 'core/injector/injector.service'
import { httpClientToken, IHttpClient } from 'core/services/http-client'
import { Scope } from 'core/injector/injector.types'
import { CoreModule } from 'core/core.module'
import { ProductModule } from 'app/products/products.module'
import { IStoreService } from './stores.types'
import {
  storeServiceToken,
  storeModule,
} from './stores.constants'

export type StoreModuleDefinition = typeof import('./stores.exports')

export interface IStoreModuleService {
  StoreService: IStoreService
}

export const StoreModule: ILazyModule<StoreModuleDefinition> = {
  name: storeModule,
  resolver: () => import('./stores.exports'),
  initializer: ({
    StoreService,
  }) => {
    const httpClient = Injector.resolve<IHttpClient>(httpClientToken)
    Injector.register<IStoreService>(storeServiceToken, () => new StoreService(httpClient), Scope.Singleton)
  },
  dependencies: [CoreModule, ProductModule],
}

import { ILazyModule } from 'core/react-lazy-modules/react-lazy-modules.types'
import { Injector } from 'core/injector/injector.service'
import { httpClientToken, IHttpClient } from 'core/services/http-client'
import { Scope } from 'core/injector/injector.types'
import { CoreModule } from 'core/core.module'
import { StoreModule } from 'app/stores/stores.module'
import { MediaLibraryModule } from 'app/media-library/media-library.module'
import { IFranchiseService } from './franchises.types'
import {
  franchiseServiceToken,
  franchiseModule,
} from './franchises.constants'

export type FranchiseModuleDefinition = typeof import('./franchises.exports')

export interface IFranchiseModuleService {
  FranchiseService: IFranchiseService
}

export const FranchiseModule: ILazyModule<FranchiseModuleDefinition> = {
  name: franchiseModule,
  resolver: () => import('./franchises.exports'),
  initializer: ({
    FranchiseService,
  }) => {
    const httpClient = Injector.resolve<IHttpClient>(httpClientToken)
    Injector.register<IFranchiseService>(franchiseServiceToken, () => new FranchiseService(httpClient), Scope.Singleton)
  },
  dependencies: [CoreModule, StoreModule, MediaLibraryModule],
}

import { ILazyModule } from 'core/react-lazy-modules/react-lazy-modules.types'
import { Injector } from 'core/injector/injector.service'
import { httpClientToken, IHttpClient } from 'core/services/http-client'
import { Scope } from 'core/injector/injector.types'
import { CoreModule } from 'core/core.module'
import {
  marketingModule,
  marketingServiceToken
} from './marketing.constants'
import { IMarketingService } from './marketing.types'

export type MarketingModuleDefinition = typeof import('./marketing.exports')

export interface IMarketingModuleService {
  MarketingService: IMarketingService
}

export const MarketingModule: ILazyModule<MarketingModuleDefinition> = {
  name: marketingModule,
  resolver: () => import('./marketing.exports'),
  initializer: ({
    MarketingService
  }) => {
    const httpClient = Injector.resolve<IHttpClient>(httpClientToken)
    Injector.register<IMarketingService>(marketingServiceToken, () => new MarketingService(httpClient), Scope.Singleton)
  },
  dependencies: [CoreModule],
}

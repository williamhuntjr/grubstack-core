import { Overwrite } from 'utility-types'
import { Injector } from 'core/injector/injector.service'
import { moduleHookResolver } from 'core/react-lazy-modules/react-lazy-modules.utils'
import { LazyModulesService } from 'core/react-lazy-modules/react-lazy-modules.service'
import { 
  IMarketingModuleService,
  MarketingModule,
  MarketingModuleDefinition
} from './marketing.module'
import { marketingServiceToken } from './marketing.constants'
import { IMarketingService } from './marketing.types'

function resolveMarketingModule(): Overwrite<MarketingModuleDefinition, IMarketingModuleService> {
  const MarketingService = Injector.resolve<IMarketingService>(marketingServiceToken)

  const module = LazyModulesService.resolveModule<MarketingModuleDefinition>(MarketingModule)

  return {
    ...module,
    MarketingService,
  }
}

export const useRestaurantModule = moduleHookResolver(resolveMarketingModule)

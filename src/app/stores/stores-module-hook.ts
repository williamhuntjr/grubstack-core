import { Overwrite } from 'utility-types'
import { Injector } from 'core/injector/injector.service'
import { moduleHookResolver } from 'core/react-lazy-modules/react-lazy-modules.utils'
import { LazyModulesService } from 'core/react-lazy-modules/react-lazy-modules.service'
import { IStoreModuleService, StoreModule, StoreModuleDefinition } from './stores.module'
import { storeServiceToken } from './stores.constants'
import { IStoreService } from './stores.types'

function resolveStoreModule(): Overwrite<StoreModuleDefinition, IStoreModuleService> {
  const StoreService = Injector.resolve<IStoreService>(storeServiceToken)

  const module = LazyModulesService.resolveModule<StoreModuleDefinition>(StoreModule)

  return {
    ...module,
    StoreService,
  }
}

export const useStoreModule = moduleHookResolver(resolveStoreModule)

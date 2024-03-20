import { Overwrite } from 'utility-types'
import { Injector } from 'core/injector/injector.service'
import { moduleHookResolver } from 'core/react-lazy-modules/react-lazy-modules.utils'
import { LazyModulesService } from 'core/react-lazy-modules/react-lazy-modules.service'
import { IFranchiseModuleService, FranchiseModule, FranchiseModuleDefinition } from './franchises.module'
import { franchiseServiceToken } from './franchises.constants'
import { IFranchiseService } from './franchises.types'

function resolveFranchiseModule(): Overwrite<FranchiseModuleDefinition, IFranchiseModuleService> {
  const FranchiseService = Injector.resolve<IFranchiseService>(franchiseServiceToken)

  const module = LazyModulesService.resolveModule<FranchiseModuleDefinition>(FranchiseModule)

  return {
    ...module,
    FranchiseService,
  }
}

export const useFranchiseModule = moduleHookResolver(resolveFranchiseModule)

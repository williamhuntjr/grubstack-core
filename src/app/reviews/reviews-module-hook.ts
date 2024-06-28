import { Overwrite } from 'utility-types'
import { Injector } from 'core/injector/injector.service'
import { moduleHookResolver } from 'core/react-lazy-modules/react-lazy-modules.utils'
import { LazyModulesService } from 'core/react-lazy-modules/react-lazy-modules.service'
import { IReviewModuleService, ReviewModule, ReviewModuleDefinition } from './reviews.module'
import { reviewServiceToken } from './reviews.constants'
import { IReviewService } from './reviews.types'

function resolveReviewModule(): Overwrite<ReviewModuleDefinition, IReviewModuleService> {
  const ReviewService = Injector.resolve<IReviewService>(reviewServiceToken)

  const module = LazyModulesService.resolveModule<ReviewModuleDefinition>(ReviewModule)

  return {
    ...module,
    ReviewService,
  }
}

export const useRestaurantModule = moduleHookResolver(resolveReviewModule)

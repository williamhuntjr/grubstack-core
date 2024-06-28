import { ILazyModule } from 'core/react-lazy-modules/react-lazy-modules.types'
import { Injector } from 'core/injector/injector.service'
import { httpClientToken, IHttpClient } from 'core/services/http-client'
import { Scope } from 'core/injector/injector.types'
import { CoreModule } from 'core/core.module'
import { reviewModule, reviewServiceToken } from './reviews.constants'
import { IReviewService } from './reviews.types'

export type ReviewModuleDefinition = typeof import('./reviews.exports')

export interface IReviewModuleService {
  ReviewService: IReviewService
}

export const ReviewModule: ILazyModule<ReviewModuleDefinition> = {
  name: reviewModule,
  resolver: () => import('./reviews.exports'),
  initializer: ({ ReviewService }) => {
    const httpClient = Injector.resolve<IHttpClient>(httpClientToken)
    Injector.register<IReviewService>(reviewServiceToken, () => new ReviewService(httpClient), Scope.Singleton)
  },
  dependencies: [CoreModule],
}

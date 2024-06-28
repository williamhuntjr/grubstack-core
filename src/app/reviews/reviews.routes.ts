import StarBorderIcon from '@mui/icons-material/StarBorder'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { ReviewModule, ReviewModuleDefinition } from './reviews.module'
import { reviewPermissions, reviewRoutePath } from './reviews.constants'
import { Reviews } from './reviews'

function reviewRouteFactory({}: ReviewModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      component: Reviews,
      permissions: reviewPermissions,
    },
  ]
}

export const reviewRoute: IAsyncRoute<ReviewModuleDefinition> = {
  module: ReviewModule,
  path: reviewRoutePath,
  name: 'Reviews',
  isSidebarButton: true,
  permissions: reviewPermissions,
  icon: StarBorderIcon,
  childrenRoutesFactory: reviewRouteFactory,
}

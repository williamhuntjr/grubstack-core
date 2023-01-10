import { homepageRoute } from 'app/homepage/homepage.routes'
import { storeRoute } from 'app/stores/stores.routes'
import { productRoute } from 'app/products/products.routes'
import { builderRoute } from 'app/builder/builder.routes'
import { processRoutes } from 'common/routing/routing.utils'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'

const AppRoutes: Array<IRoute | IAsyncRoute<never>> = [
  homepageRoute,
  storeRoute,
  productRoute,
  builderRoute,
]

export const appRoutes = processRoutes(AppRoutes)

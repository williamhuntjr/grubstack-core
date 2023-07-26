import { processRoutes } from 'common/routing/routing.utils'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { homepageRoute } from 'app/homepage/homepage.routes'
import { storeRoute } from 'app/stores/stores.routes'
import { productRoute } from 'app/products/products.routes'
import { builderRoute } from 'app/builder/builder.routes'
import { mediaLibraryRoute } from 'app/media-library/media-library.routes'
import { employeeRoute } from 'app/employees/employees.routes'

const AppRoutes: Array<IRoute | IAsyncRoute<never>> = [
  homepageRoute,
  storeRoute,
  employeeRoute,
  productRoute,
  builderRoute,
  mediaLibraryRoute
]

export const appRoutes = processRoutes(AppRoutes)

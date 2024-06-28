import { processRoutes } from 'common/routing/routing.utils'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { homepageRoute } from 'app/homepage/homepage.routes'
import { restaurantRoute } from 'app/restaurant/restaurant.routes'
import { productRoute } from 'app/products/products.routes'
import { builderRoute } from 'app/builder/builder.routes'
import { mediaLibraryRoute } from 'app/media-library/media-library.routes'
import { reviewRoute } from 'app/reviews/reviews.routes'
import { reportRoute } from 'app/reports/reports.routes'
import { marketingRoute } from 'app/marketing/marketing.routes'
import { employeeRoute } from 'app/employees/employees.routes'

const AppRoutes: Array<IRoute | IAsyncRoute<never>> = [
  homepageRoute,
  restaurantRoute,
  productRoute,
  reviewRoute,
  reportRoute,
  marketingRoute,
  builderRoute,
  mediaLibraryRoute,
  employeeRoute,
]

export const appRoutes = processRoutes(AppRoutes)

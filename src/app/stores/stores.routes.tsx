import StorefrontIcon from '@mui/icons-material/Storefront'
import { storeRoutePath } from 'app/stores/stores.constants'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { StoreModule, StoreModuleDefinition } from './stores.module'

function storeRouteFactory({ Stores }: StoreModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      component: Stores,
    },
  ]
}

export const storeRoute: IAsyncRoute<StoreModuleDefinition> = {
  module: StoreModule,
  path: storeRoutePath,
  name: 'Stores',
  isSidebarButton: true,
  icon: StorefrontIcon,
  childrenRoutesFactory: storeRouteFactory
}

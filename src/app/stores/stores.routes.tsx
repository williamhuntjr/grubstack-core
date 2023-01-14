import StorefrontIcon from '@mui/icons-material/Storefront'
import { storeRoutePath, storePermissions } from 'app/stores/stores.constants'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { StoreModule, StoreModuleDefinition } from './stores.module'

function storeRouteFactory({ Stores }: StoreModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      component: Stores,
      permissions: storePermissions,
    },
  ]
}

export const storeRoute: IAsyncRoute<StoreModuleDefinition> = {
  module: StoreModule,
  path: storeRoutePath,
  name: 'Stores',
  isSidebarButton: true,
  permissions: storePermissions,
  icon: StorefrontIcon,
  childrenRoutesFactory: storeRouteFactory
}

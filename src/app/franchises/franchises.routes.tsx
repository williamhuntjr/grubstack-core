import BusinessIcon from '@mui/icons-material/Business'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { FranchiseModule, FranchiseModuleDefinition } from './franchises.module'
import { franchiseRoutePath, franchisePermissions } from './franchises.constants'

function franchiseRouteFactory({ Franchises }: FranchiseModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      component: Franchises,
      permissions: franchisePermissions,
    },
  ]
}

export const franchiseRoute: IAsyncRoute<FranchiseModuleDefinition> = {
  module: FranchiseModule,
  path: franchiseRoutePath,
  name: 'Franchises',
  isSidebarButton: true,
  permissions: franchisePermissions,
  icon: BusinessIcon,
  childrenRoutesFactory: franchiseRouteFactory
}

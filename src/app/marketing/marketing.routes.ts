import CampaignIcon from '@mui/icons-material/Campaign'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { MarketingModule, MarketingModuleDefinition } from './marketing.module'
import { 
  marketingPermissions,
  marketingRoutePath, 
} from './marketing.constants'
import { Marketing } from './marketing'

function marketingRouteFactory({}: MarketingModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      component: Marketing,
      permissions: marketingPermissions,
    },
  ]
}

export const marketingRoute: IAsyncRoute<MarketingModuleDefinition> = {
  module: MarketingModule,
  path: marketingRoutePath,
  name: 'Marketing',
  isSidebarButton: true,
  permissions: marketingPermissions,
  icon: CampaignIcon,
  childrenRoutesFactory: marketingRouteFactory
}

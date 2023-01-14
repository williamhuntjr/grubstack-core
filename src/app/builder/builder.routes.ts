import HardwareIcon from '@mui/icons-material/Hardware'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { BuilderModule, BuilderModuleDefinition } from './builder.module'
import { builderRoutePath, builderPermissions } from './builder.constants'
import { Builder } from './builder'
import { BuilderTool } from './builder-tool/builder-tool'

function builderRouteFactory({}: BuilderModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      component: Builder,
      permissions: builderPermissions,
    },
    {
      path: '/:objectType/:objectId',
      component: BuilderTool,
      permissions: builderPermissions,
    },
  ]
}

export const builderRoute: IAsyncRoute<BuilderModuleDefinition> = {
  module: BuilderModule,
  path: builderRoutePath,
  name: 'Builder Tool',
  isSidebarButton: true,
  permissions: builderPermissions,
  icon: HardwareIcon,
  childrenRoutesFactory: builderRouteFactory
}

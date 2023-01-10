import HardwareIcon from '@mui/icons-material/Hardware'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { BuilderModule, BuilderModuleDefinition } from './builder.module'
import { builderRoutePath } from './builder.constants'
import { Builder } from './builder'
import { BuilderTool } from './builder-tool/builder-tool'

function builderRouteFactory({}: BuilderModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      component: Builder,
    },
    {
      path: '/:objectType/:objectId',
      component: BuilderTool,
    },
  ]
}

export const builderRoute: IAsyncRoute<BuilderModuleDefinition> = {
  module: BuilderModule,
  path: builderRoutePath,
  name: 'Builder Tool',
  isSidebarButton: true,
  icon: HardwareIcon,
  childrenRoutesFactory: builderRouteFactory
}

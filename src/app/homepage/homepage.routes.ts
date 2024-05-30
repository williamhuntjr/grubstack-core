import HomeIcon from '@mui/icons-material/Home'
import { IAsyncRoute } from 'common/routing/routing.types'
import { HomepageModule, HomepageModuleDefinition } from './homepage.module'

export const homepageRoute: IAsyncRoute<HomepageModuleDefinition> = {
  module: HomepageModule,
  path: '/',
  name: 'Home',
  isSidebarButton: true,
  icon: HomeIcon,
  childrenRoutesFactory: ({ Homepage }: HomepageModuleDefinition) => [
    {
      path: '/',
      exact: true,
      component: Homepage,
    },
  ],
}
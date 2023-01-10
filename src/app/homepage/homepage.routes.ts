import { IAsyncRoute } from 'common/routing/routing.types'
import { HomepageModule, HomepageModuleDefinition } from './homepage.module'

export const homepageRoute: IAsyncRoute<HomepageModuleDefinition> = {
  module: HomepageModule,
  path: '/',
  name: 'Home',
  childrenRoutesFactory: ({ Homepage }: HomepageModuleDefinition) => [
    {
      path: '',
      exact: true,
      component: Homepage,
    },
  ],
}
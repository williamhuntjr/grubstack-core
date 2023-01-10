import { IModule } from './core/react-lazy-modules/react-lazy-modules.types'
import { CoreModule } from './core/core.module'

export const AppModule: IModule = {
  name: 'AppModule',
  resolver: () => ({}),
  dependencies: [
    CoreModule,
  ],
}
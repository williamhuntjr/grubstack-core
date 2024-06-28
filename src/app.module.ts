import { CoreModule } from 'core/core.module'
import { AuthModule } from 'auth/auth.module'
import { IModule } from './core/react-lazy-modules/react-lazy-modules.types'

export const AppModule: IModule = {
  name: 'AppModule',
  resolver: () => ({}),
  dependencies: [CoreModule, AuthModule],
}

import { IModule } from 'core/react-lazy-modules/react-lazy-modules.types'
import { Injector } from 'core/injector/injector.service'
import { CoreModule } from 'core/core.module'
import { Scope } from 'core/injector/injector.types'
import { httpClientToken, IHttpClient } from 'core/services/http-client'
import * as AuthModuleExports from './auth.exports'
import { IAuthService } from './auth.types'
import { authServiceToken } from './auth.constants'

export type AuthModuleDefinition = typeof AuthModuleExports

export interface IAuthModuleServices {
  AuthService: IAuthService
}

export const AuthModule: IModule<AuthModuleDefinition> = {
  name: 'AuthModule',
  resolver: () => AuthModuleExports,
  initializer: ({ AuthService }) => {
    Injector.register<IAuthService>(
      authServiceToken,
      (injector) => {
        const httpClient = injector.resolve<IHttpClient>(httpClientToken)
        return new AuthService(httpClient)
      },
      Scope.Singleton
    )
  },
  dependencies: [CoreModule],
}

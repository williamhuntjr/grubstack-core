import { IModule } from './react-lazy-modules/react-lazy-modules.types'
import * as CoreModuleExport from './core.exports'
import { Injector } from './injector/injector.service'
import {
  coreModuleToken,
  errorHandlerServiceToken,
} from './core.constants'
import { Scope } from './injector/injector.types'
import { HttpClient, httpClientToken } from './services/http-client'
import { IErrorHandler } from './services/error-handler'

export type CoreModuleDefinition = typeof import('./core.exports')

export interface ICoreModuleServices {
  ErrorHandler: IErrorHandler
}

function coreModuleInitializer({
  ErrorHandler,
}: CoreModuleDefinition): void {
  Injector.register(httpClientToken, () => HttpClient, Scope.Singleton)
  Injector.register<IErrorHandler>(
    errorHandlerServiceToken,
    () => {
      return new ErrorHandler()
    },
    Scope.Singleton
  )
}

export const CoreModule: IModule<CoreModuleDefinition> = {
  name: coreModuleToken,
  resolver: () => CoreModuleExport,
  initializer: coreModuleInitializer,
  dependencies: [],
}

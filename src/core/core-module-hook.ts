import { ICoreModuleServices } from './core.module'
import { Injector } from './injector/injector.service'
import { moduleHookResolver } from './react-lazy-modules/react-lazy-modules.utils'
import { errorHandlerServiceToken } from './core.constants'
import { IErrorHandler } from './services/error-handler'

function resolveCoreModule(): ICoreModuleServices {
  const ErrorHandler = Injector.resolve<IErrorHandler>(errorHandlerServiceToken)

  return {
    ErrorHandler,
  }
}

export const useCoreModule = moduleHookResolver<ICoreModuleServices>(resolveCoreModule)

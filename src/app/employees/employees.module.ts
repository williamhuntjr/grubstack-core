import { ILazyModule } from 'core/react-lazy-modules/react-lazy-modules.types'
import { Injector } from 'core/injector/injector.service'
import { httpClientToken, IHttpClient } from 'core/services/http-client'
import { Scope } from 'core/injector/injector.types'
import { CoreModule } from 'core/core.module'
import { MediaLibraryModule } from 'app/media-library/media-library.module'
import { IEmployeeService } from './employees.types'
import {
  employeeServiceToken,
  employeeModule,
} from './employees.constants'

export type EmployeeModuleDefinition = typeof import('./employees.exports')

export interface IEmployeeModuleService {
  EmployeeService: IEmployeeService
}

export const EmployeeModule: ILazyModule<EmployeeModuleDefinition> = {
  name: employeeModule,
  resolver: () => import('./employees.exports'),
  initializer: ({
    EmployeeService,
  }) => {
    const httpClient = Injector.resolve<IHttpClient>(httpClientToken)
    Injector.register<IEmployeeService>(employeeServiceToken, () => new EmployeeService(httpClient), Scope.Singleton)
  },
  dependencies: [CoreModule, MediaLibraryModule],
}

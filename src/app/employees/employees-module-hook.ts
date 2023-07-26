import { Overwrite } from 'utility-types'
import { Injector } from 'core/injector/injector.service'
import { moduleHookResolver } from 'core/react-lazy-modules/react-lazy-modules.utils'
import { LazyModulesService } from 'core/react-lazy-modules/react-lazy-modules.service'
import { IEmployeeModuleService, EmployeeModule, EmployeeModuleDefinition } from './employees.module'
import { employeeServiceToken } from './employees.constants'
import { IEmployeeService } from './employees.types'

function resolveEmployeeModule(): Overwrite<EmployeeModuleDefinition, IEmployeeModuleService> {
  const EmployeeService = Injector.resolve<IEmployeeService>(employeeServiceToken)

  const module = LazyModulesService.resolveModule<EmployeeModuleDefinition>(EmployeeModule)

  return {
    ...module,
    EmployeeService,
  }
}

export const useEmployeeModule = moduleHookResolver(resolveEmployeeModule)

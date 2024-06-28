import FaceIcon from '@mui/icons-material/Face'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { EmployeeModule, EmployeeModuleDefinition } from './employees.module'
import { employeeRoutePath, employeePermissions } from './employees.constants'

function employeeRouteFactory({ Employees }: EmployeeModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      component: Employees,
      permissions: employeePermissions,
    },
  ]
}

export const employeeRoute: IAsyncRoute<EmployeeModuleDefinition> = {
  module: EmployeeModule,
  path: employeeRoutePath,
  name: 'Employees',
  isSidebarButton: true,
  permissions: employeePermissions,
  icon: FaceIcon,
  childrenRoutesFactory: employeeRouteFactory,
}

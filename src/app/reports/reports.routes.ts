import AssessmentIcon from '@mui/icons-material/Assessment'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { ReportModule, ReportModuleDefinition } from './reports.module'
import { reportPermissions, reportRoutePath } from './reports.constants'
import { Reports } from './reports'

function reportRouteFactory({}: ReportModuleDefinition): IRoute[] {
  return [
    {
      path: '/',
      component: Reports,
      permissions: reportPermissions,
    },
  ]
}

export const reportRoute: IAsyncRoute<ReportModuleDefinition> = {
  module: ReportModule,
  path: reportRoutePath,
  name: 'Reports',
  isSidebarButton: true,
  permissions: reportPermissions,
  icon: AssessmentIcon,
  childrenRoutesFactory: reportRouteFactory,
}

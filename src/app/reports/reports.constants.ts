import { UserPermissions } from 'auth/auth.constants'

export const reportServiceToken = 'ReportService'
export const reportModule = 'ReportModule'
export const reportRoutePath = '/reports'

export const reportPermissions = [
  UserPermissions.ViewReports,
  UserPermissions.MaintainReports
]
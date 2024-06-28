import { UserPermissions } from 'auth/auth.constants'

export const marketingServiceToken = 'MarketingService'
export const marketingModule = 'MarketingModule'
export const marketingRoutePath = '/marketing'

export const marketingPermissions = [UserPermissions.ViewMarketing, UserPermissions.MaintainMarketing]

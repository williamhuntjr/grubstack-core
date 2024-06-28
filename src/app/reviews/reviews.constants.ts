import { UserPermissions } from 'auth/auth.constants'

export const reviewServiceToken = 'ReviewService'
export const reviewModule = 'ReviewModule'
export const reviewRoutePath = '/reviews'

export const reviewPermissions = [UserPermissions.ViewReviews, UserPermissions.MaintainReviews]

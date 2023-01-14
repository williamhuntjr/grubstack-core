import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { InvalidPagePermissions } from 'common/error-pages'
import { validatePermissions } from 'common/auth/auth.utils'
import { IGuardedRoute } from './guarded-route.types'

export const GuardedRoute: FC<IGuardedRoute> = ({ permissions, component, redirectTo }) => {
  let navigate = useNavigate()
  
  useEffect(() => {
    if (redirectTo) { 
      navigate(redirectTo) 
    }
    // eslint-disable-next-line
  }, [redirectTo])

  return validatePermissions(permissions ?? []) || permissions?.length == 0 ? 
      component ? component : <></> 
    : <InvalidPagePermissions />
}
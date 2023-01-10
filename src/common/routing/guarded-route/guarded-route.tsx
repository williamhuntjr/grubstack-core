import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IGuardedRoute } from './guarded-route.types'

export const GuardedRoute: FC<IGuardedRoute> = ({ component, redirectTo }) => {
  let navigate = useNavigate()

  useEffect(() => {
    if (redirectTo) { 
      navigate(redirectTo) 
    }
    // eslint-disable-next-line
  }, [redirectTo])

  return component ? component : <></>
}
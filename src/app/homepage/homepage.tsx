import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from 'routes'
import { validatePermissions } from 'common/auth/auth.utils'

export const Homepage: FC = () => {
  let navigate = useNavigate()
  let redirectTo:string|null = null

  const routes = appRoutes
  
  const init = (): void => {
    routes.map((route) => {
      if (validatePermissions(route.permissions ?? []) && route.path !== '/' && redirectTo == null) {
        redirectTo = route.path
      }
    })
    if (redirectTo != null) {
      navigate(redirectTo)
    }
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line
  },[])
  
  return (
    <></>
  )
}
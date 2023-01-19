import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from 'routes'
import { validatePermissions, getPermissions } from 'common/auth/auth.utils'
import { NullPermissions } from 'common/error-pages'

export const Homepage: FC = () => {
  let navigate = useNavigate()
  let redirectTo:string|null = null

  const routes = appRoutes
  const permissions = getPermissions()

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
    <>
    {permissions.length == 0 &&
      <NullPermissions />
    }
    </>
  )
}
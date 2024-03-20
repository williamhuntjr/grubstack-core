import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from 'routes'
import { validatePermissions, getPermissions } from 'auth/auth.utils'
import { NullPermissions } from 'common/error-pages'

export const Homepage: FC = () => {
  let navigate = useNavigate()

  const routes = appRoutes
  const permissions = getPermissions()

  const init = (): void => {
    let redirectTo:string|null = null

    routes.map((route) => {
      console.log('testing', validatePermissions(route.permissions ?? []))
      console.log(route.path)
      if (validatePermissions(route.permissions ?? []) && route.path !== '/' && redirectTo == null) {
        console.log("SHOULD REDIRECT")
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
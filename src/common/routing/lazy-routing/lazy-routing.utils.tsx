import React from 'react'
import { Route } from 'react-router-dom'
import { IRoute, IAsyncRoute } from 'common/routing/routing.types'
import { IModuleDefinition } from 'core/react-lazy-modules/react-lazy-modules.types'
import { LazyRoutingModuleLoader } from './lazy-routing-module-loader'

export function buildAsyncRoute<T extends IModuleDefinition = never>(route: IAsyncRoute<T>, render: (route: IRoute) => React.ReactElement): JSX.Element {
  return (
    <Route
      key={route.path}
      path={route.path}
      element={<LazyRoutingModuleLoader route={route} render={render} key={route.path} />}
    />
  )
}
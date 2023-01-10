import React from 'react'
import { Route  } from 'react-router-dom'
import { GuardedRoute } from 'common/routing/guarded-route/guarded-route'
import { IModuleDefinition } from 'core/react-lazy-modules/react-lazy-modules.types'
import { IAsyncRoute, IRoute } from './routing.types'

export function processPath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`
}

function buildPath(routePath: string, parentRoutePath?: string): string {
  const path = parentRoutePath ? `${processPath(parentRoutePath)}${processPath(routePath)}` : processPath(routePath)
  return path !== '/' ? path.replace(/\/$/, '') : path
}

export function isAsyncRoute<T extends IModuleDefinition = never>(route: IRoute | IAsyncRoute<T>): route is IAsyncRoute<T> {
  return 'module' in route
}

/**
 * Updates a route in order to include parent route data like path, guards, children and so on.
 * @param route
 * @param parentRoute
 */
export function processRoute(route: IRoute | IAsyncRoute<never>, parentRoute?: IRoute | IAsyncRoute<never>): IRoute {
  if (isAsyncRoute(route)) {
    return {
      ...route,
      path: buildPath(route.path, parentRoute?.path),
    }
  }

  const processedRoute = {
    ...route,
    path: buildPath(route.path, parentRoute?.path),
  }
  processedRoute.children = route.children?.map((childRoute) => processRoute(childRoute))
  return processedRoute
}

/**
 * Used to update route path, build path for a child route, merge guards
 * @param routes - array of routes
 */
 export function processRoutes(routes: Array<IRoute | IAsyncRoute<never>>): Array<IRoute | IAsyncRoute<never>> {
  return routes.map((route) => processRoute(route))
}

export function buildRoute(route: IRoute, render?: JSX.Element): JSX.Element {
  return render ? render : route.component ?
    <Route
      key={route.path}
      path={route.path}
      element={<GuardedRoute component={<route.component />} redirectTo={route.redirectTo}/>}
    />
    :
    <Route
      key={route.path}
      path={route.path}
      element={<GuardedRoute redirectTo={route.redirectTo}/>}
    />
    
}

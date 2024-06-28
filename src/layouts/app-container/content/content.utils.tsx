import React from 'react'
import { Routes } from 'react-router-dom'
import { IRoute, ParentRoute } from 'common/routing/routing.types'
import { buildRoute } from 'common/routing/routing.utils'

export function isParentRoute(route: IRoute): route is ParentRoute {
  return Array.isArray(route.children) && !!route.children.length
}

export function renderRoute(route: IRoute): JSX.Element {
  if (!isParentRoute(route)) {
    return buildRoute(route)
  }
  const parentRouteRender = <Routes key={`${route.path}-parent`}>{route.children.map((childRoute) => renderRoute(childRoute))}</Routes>

  return buildRoute(route, parentRouteRender)
}

import React, { useEffect, useState } from 'react'
import { LazyModulesService } from 'core/react-lazy-modules/react-lazy-modules.service'
import { processRoute } from 'common/routing/routing.utils'
import { IAsyncRoute, IRoute } from 'common/routing/routing.types'
import { Loading } from 'common/components/loading/loading'
import { IModuleDefinition } from 'core/react-lazy-modules/react-lazy-modules.types'
import styles from './lazy-routing-module.module.scss'

export interface ILazyModuleLoader<AsyncModuleDefinition extends IModuleDefinition> {
  route: IAsyncRoute<AsyncModuleDefinition>
  render: (route: IRoute) => React.ReactElement
}

interface ILazyModuleLoaderState {
  loading: boolean
  route: IRoute | null
  error: string | null
}

export function LazyRoutingModuleLoader<AsyncModuleDefinition extends IModuleDefinition>({
  route,
  render,
}: ILazyModuleLoader<AsyncModuleDefinition>): React.ReactElement {
  const [state, setState] = useState<ILazyModuleLoaderState>({ loading: false, route: null, error: null })
  
  const loadModule: () => Promise<void> = async () => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }))
      const definitions = await LazyModulesService.loadAsyncModule(route.module)
      const childRoutes = route.childrenRoutesFactory(definitions).map((childRoute) => processRoute(childRoute))
      const processedRoute: IRoute = { ...route, children: childRoutes }
      setState({ route: processedRoute, loading: false, error: null })
    } catch (error) {
      const errorText = error as String
      setState((prevState) => ({ ...prevState, loading: false, errorText }))
      console.error(error)
    }
  }

  useEffect(() => {
    void loadModule()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
  }, [state])
  if (state.error) {
    return <div className={styles.lazyRoutingModuleContainer}>Content cannot be loaded. Please try again later.</div>
  }
  if (state.loading || !state.route) {
    return (
      <div className={styles.lazyRoutingModuleContainer}>
        <Loading />
      </div>
    )
  }
  return render(state.route)
}

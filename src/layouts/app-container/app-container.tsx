import React, { FC, useEffect, useState } from 'react'
import { Routes } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useAuth0 } from '@auth0/auth0-react'
import { setAxiosTokenInterceptor } from 'core/services/http-client'
import { smMq } from 'common/constants'
import { Loading } from 'core/components/loading/loading'
import { IRoute } from 'common/routing/routing.types'
import { buildAsyncRoute } from 'common/routing/lazy-routing/lazy-routing.utils'
import { isAsyncRoute, buildRoute } from 'common/routing/routing.utils'
import { IAppContainer } from './app-container.types'
import { Header } from './header/header'
import { Content } from './content/content'
import { Sidebar } from './sidebar/sidebar'
import styles from './app-container.module.scss'

function buildContentRoute(route: IRoute): JSX.Element {
  if (isAsyncRoute(route)) {
    return buildAsyncRoute(route, (processedRoute) => <Content route={processedRoute} />)
  }
  return buildRoute(route, <Content route={route} />)
}

const HttpProvider = () => {
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    void setAxiosTokenInterceptor(getAccessTokenSilently)
  }, [])

  return (
    <></>
  )
}

export const AppContainer: FC<IAppContainer> = ({ routes }) => {
  const { isLoading, isAuthenticated, loginWithRedirect  } = useAuth0()

  const isMobile = useMediaQuery(smMq)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(!isMobile)

  const toggleSidebar = (): void => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = (): void => {
    setSidebarOpen(false)
  }

  useEffect(
    () => {
      if (!isLoading && !isAuthenticated) {
        void loginWithRedirect()
      }
    // eslint-disable-next-line
    }, [])

  return (
    <div className={styles.appContainer}>
      <HttpProvider />
      <Header onToggle={toggleSidebar} sidebarOpen={sidebarOpen || !isMobile}/>
      <div className={styles.appContent}>
        <Sidebar open={sidebarOpen || !isMobile} onCloseSidebar={closeSidebar} />
        <React.Suspense fallback={<Loading />}>
          <Routes>{routes.map((route) => { 
            return buildContentRoute({
              ...route,
              path: `${route.path}/*`
            })
          })}</Routes>
        </React.Suspense>
      </div>
    </div>
  )
}
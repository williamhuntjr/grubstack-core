import React, { FC, useEffect, useState } from 'react'
import { Routes } from 'react-router-dom'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useAuth0 } from '@auth0/auth0-react'
import { setAxiosTokenInterceptor, HttpClient } from 'core/services/http-client'
import { smMq } from 'common/constants'
import { Loading } from 'core/components/loading/loading'
import { IRoute } from 'common/routing/routing.types'
import { Updating } from 'core/components/updating/updating'
import { appConfig } from 'common/config'
import { buildAsyncRoute } from 'common/routing/lazy-routing/lazy-routing.utils'
import { isAsyncRoute, buildRoute } from 'common/routing/routing.utils'
import { IVersion } from 'common/types'
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

const HttpProvider = (): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0()

  const init = async(): Promise<void> => {
    await setAxiosTokenInterceptor(getAccessTokenSilently)
  }

  useEffect(() => {
    void init()
  // eslint-disable-next-line
  }, [])

  return (
    <></>
  )
}

export const AppContainer: FC<IAppContainer> = ({ routes }) => {
  const { isLoading, isAuthenticated, loginWithRedirect  } = useAuth0()
  const [ appLoading, setAppLoading ] = useState<boolean>(true)
  const [ appUpdating, setAppUpdating ] = useState<boolean>(false)

  const isMobile = useMediaQuery(smMq)
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(!isMobile)

  const toggleSidebar = (): void => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = (): void => {
    setSidebarOpen(false)
  }

  const init = async (): Promise<void> => {
    try {
      setAppLoading(true)
      await HttpClient.get('/auth/verify_tenant')
      
      const userInfo = localStorage.getItem('grubUserInfo')
      if (userInfo == null) {
        const {
          data: { data },
        } = await HttpClient.get('/auth/userinfo')
        localStorage.setItem('grubUserInfo', JSON.stringify(data))
      }
      
      if (process.env.NODE_ENV == 'production') {
        const resp = await HttpClient.get('/core/versions')
        const versions:IVersion[] = resp.data.data  
        const currentVersion = versions.filter((version) => version.id == appConfig.appId)[0]
        if (currentVersion && currentVersion.version != appConfig.appVersion) {
          setAppUpdating(true)
          await HttpClient.post('/core/updateApps')
          if (caches) {
            await caches.keys().then(async function(names) {
              for (let name of names) await caches.delete(name)
            })
          }
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        }
      }
      setAppLoading(false)
    } catch (e) {
      console.log("You do not have access to this tenant.")
      window.location.href = `${appConfig.corporateSite}/unauthorized-access`
    }
  }

  useEffect(() => {
    void init()
    if (!isLoading && !isAuthenticated) {
      void loginWithRedirect()
    }
  // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.appContainer}>
      <HttpProvider />
      {appUpdating && <Updating />}
      {appLoading && !appUpdating && <Loading />}
      {!appLoading && !appUpdating &&
      <div>
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
      }
    </div>
  )
}
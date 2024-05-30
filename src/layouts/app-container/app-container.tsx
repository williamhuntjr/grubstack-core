import React, { FC, useEffect, useState } from 'react'
import { Routes } from 'react-router-dom'
import { HttpClient } from 'core/services/http-client'
import { Loading } from 'core/components/loading/loading'
import { IRoute } from 'common/routing/routing.types'
import { Updating } from 'core/components/updating/updating'
import { appConfig } from 'common/config'
import { buildAsyncRoute } from 'common/routing/lazy-routing/lazy-routing.utils'
import { isAsyncRoute, buildRoute } from 'common/routing/routing.utils'
import { IVersion } from 'common/types'
import { Header } from './header/header'
import { DesktopSidebar } from './sidebar/desktop-sidebar/desktop-sidebar'
import { IAppContainer } from './app-container.types'
import { Content } from './content/content'
import styles from './app-container.module.scss'

function buildContentRoute(route: IRoute): JSX.Element {
  if (isAsyncRoute(route)) {
    return buildAsyncRoute(route, (processedRoute) => <Content route={processedRoute} />)
  }
  return buildRoute(route, <Content route={route} />)
}

export const AppContainer: FC<IAppContainer> = ({ routes }) => {
  const [ appLoading, setAppLoading ] = useState<boolean>(true)
  const [ appUpdating, setAppUpdating ] = useState<boolean>(false)

  const verifyTenant = async (): Promise<void> => {
    try {
      const resp = await HttpClient.get('/auth/verify_tenant')
      if (!resp) {
        console.log("You do not have access to this tenant.")
        window.location.href = `${appConfig.productionUrl}/not-authorized`
      }
    } catch (e) {
      console.error(e)
    }
  }

  const init = async (): Promise<void> => {
    try {
      setAppLoading(true)
      await verifyTenant()

      const localStorageUser = localStorage.getItem('grubstackUser')
      if (localStorageUser == null) {
        const {
          data: { data },
        } = await HttpClient.get('/auth/whoami')
  
        const userData = {
          'permissions': data.permissions,
          'first_name': data.first_name,
          'last_name': data.last_name,
          'username': data.username
        }
        localStorage.setItem('grubstackUser', JSON.stringify(userData))  
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
          }, 10000)
        }
      }
      setAppLoading(false)
    } catch (e) {
      console.error(e)
      window.location.href = `${appConfig.productionUrl}/not-authorized`
    }
  }

  useEffect(() => {
    void init()
  // eslint-disable-next-line
  }, [])

  return (
    <div className={styles.appContainer}>
      {appUpdating && <Updating />}
      {appLoading && !appUpdating && <Loading />}
      {!appLoading && !appUpdating &&
      <div className={styles.appContent}>
        <Header />
        <DesktopSidebar />
        <React.Suspense fallback={<Loading />}>
          <Routes>{routes.map((route) => { 
            return buildContentRoute({
              ...route,
              path: `${route.path}/*`
            })
          })}</Routes>
        </React.Suspense>
      </div>
      }
    </div>
  )
}
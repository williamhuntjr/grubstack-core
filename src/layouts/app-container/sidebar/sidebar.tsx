import React, { FC, memo } from 'react'
import List from '@mui/material/List'
import { cls } from 'common/utils/utils'
import { validateRoutePermissions } from 'common/auth/auth.utils'
import { appRoutes } from 'routes'
import { NavListItem } from './nav-list-item/nav-list-item'
import { ISidebar } from './sidebar.types'
import styles from './sidebar.module.scss'

export const Sidebar: FC<ISidebar> = memo(({ open, onCloseSidebar }) => {
  const filteredRoutes = appRoutes.filter(route => route.isSidebarButton)
  const userRoutes = filteredRoutes.filter(route => validateRoutePermissions(route.permissions ?? []))

  return (
    <div className={cls(styles.sidebarContainer, open ? styles.sidebarOpen : styles.sidebarClosed, userRoutes.length == 0 ? styles.sidebarHidden : '')}>
      <List className={styles.sidebarList}>
        {userRoutes.map((route, index)  => {
          return route.path != '*' ? 
            <NavListItem route={route} key={index} onClick={onCloseSidebar} /> : '' 
          }
        )}
      </List>
    </div>
  )
})
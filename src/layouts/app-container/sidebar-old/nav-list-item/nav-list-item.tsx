import React, { FC, memo } from 'react'
import { useMatch, useResolvedPath, Link } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { cls } from 'common/utils/utils'
import { INavListItem } from './nav-list-item.types'
import styles from './nav-list-item.module.scss'

export const NavListItem: FC<INavListItem> = memo(({ route, onClick }) => {
  let resolved = useResolvedPath(route.path)
  let match = useMatch({ path: `${resolved.pathname}`, end: false })

  return (
    <ListItemButton
      className={cls(styles.listItem, match ? styles.listItemSelected : '')}
      component={Link}
      to={route.redirectTo ? route.redirectTo : `${route.path}`}
      onClick={onClick}
    >
      <ListItemIcon className={styles.listItemIcon}>
        {route.icon != undefined && <route.icon className={styles.listItemIconSvg} />}
      </ListItemIcon>
      <ListItemText primary={route.name} className={styles.listItemText} />
    </ListItemButton>
  )
})

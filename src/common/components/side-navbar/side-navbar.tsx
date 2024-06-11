import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { cls } from 'common/utils/utils'
import { ISideNavbar, ISideNavbarRoute } from './side-navbar.types'
import styles from './side-navbar.module.scss'
import { validateRoutePermissions } from 'auth/auth.utils'

export const SideNavbar: FC<ISideNavbar> = ({ label, rootPath, routes }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const splitPath = location.pathname.split('/')
  const activePath = `/${splitPath[2]}`

  const generateLink = (navLink: ISideNavbarRoute) => {
    return (
      validateRoutePermissions(navLink.permissions ?? []) ?
      <ListItem 
        key={`navLink-${navLink.label}`}
        disablePadding
        className={cls(
          styles.listItem,
          activePath == navLink.path ? styles.activeLink : '',
        )}
        onClick={() => navigate(`${rootPath}${navLink.path}`)}
      >
        <ListItemButton>
          <navLink.icon />
          <ListItemText primary={navLink.label} className={styles.listItemText} />
          {activePath == navLink.path ? <NavigateNextIcon /> : <></>}
        </ListItemButton>
      </ListItem>
      : <></>
    )
  }

  return (
    <nav aria-label={`${label ?? 'navbar'}-list`} className={styles.sideNavbar}>
      <List className={styles.sideNavbarList}>
        {label &&
        <ListItem 
          disablePadding
          className={cls(styles.listItem, styles.labelItem)}
          selected={true}
        >
          <ListItemButton>
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
        }
        {routes.map((navLink) => generateLink(navLink))}
      </List>
    </nav>
  )
}
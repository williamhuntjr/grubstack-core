import React, { FC, useState } from 'react'
import { useMatch, useResolvedPath, Link, useNavigate } from 'react-router-dom'
import Fade from '@mui/material/Fade'
import Tooltip from '@mui/material/Tooltip'
import { cls } from 'common/utils/utils'
import { validateRoutePermissions } from 'auth/auth.utils'
import { UserPermissions } from 'auth/auth.constants'
import { homepageRoutePath } from 'app/homepage/homepage.constants'
import { sidebarRoutes } from '../sidebar.constants'
import { ISidebarItem } from '../sidebar.types'
import styles from './desktop-sidebar.module.scss'

function validateRootPermissions(rootPermissions: Array<Array<UserPermissions>>): boolean {
  let permissionCount = 0
  rootPermissions.forEach((permissionArray) => {
    if (validateRoutePermissions(permissionArray)) {
      permissionCount += 1
    }
  })
  if (permissionCount == rootPermissions.length) {
    return true
  }
  return false
}

const SidebarSubMenuItem: FC<ISidebarItem> = ({ route, onClick }) => {
  let resolved = useResolvedPath(route.path)

  let isMatch = useMatch({ path: `${resolved.pathname}`, end: false })
  let isHomepage = useMatch({ path: `${homepageRoutePath}`, end: true })

  let match = route.path == homepageRoutePath ? isHomepage : isMatch

  return (
    <>
      {route.icon && (
        <Link onClick={onClick} role="menuitem" to={route.path} className={cls(styles.subMenuLink, match ? styles.activeSubMenuLink : '')}>
          <route.icon className={styles.subNavIcon} /> {route.label}
        </Link>
      )}
      {!route.icon && (
        <Link onClick={onClick} role="menuitem" to={route.path} className={cls(styles.subMenuLink, match ? styles.activeSubMenuLink : '')}>
          {route.label}
        </Link>
      )}
    </>
  )
}

const SidebarItem: FC<ISidebarItem> = ({ route }) => {
  let resolved = useResolvedPath(route.path)

  let isMatch = useMatch({ path: `${resolved.pathname}`, end: false })
  let isHomepage = useMatch({ path: `${homepageRoutePath}`, end: true })

  let match = route.path == homepageRoutePath ? isHomepage : isMatch

  return (
    <>
      {route.icon != undefined && !route.submenu && (
        <Tooltip
          arrow
          disableInteractive
          title={route.label}
          placement="right"
          TransitionComponent={Fade}
          TransitionProps={{ timeout: 600 }}
        >
          <div className={cls(styles.navItem, match ? styles.activeNavItem : '')}>
            <route.icon className={styles.navIcon} />
          </div>
        </Tooltip>
      )}
      {route.icon != undefined && route.submenu && (
        <div className={cls(styles.navItem, match ? styles.activeNavItem : '')}>
          <route.icon className={styles.navIcon} />
        </div>
      )}
    </>
  )
}

export const DesktopSidebar = (): JSX.Element => {
  const [anchor, setAnchor] = useState<string>()
  const [open, setOpen] = useState<boolean>(false)

  const navigate = useNavigate()

  const userRoutes = sidebarRoutes.filter((route) => validateRoutePermissions(route.permissions ?? []))

  const handleListHover = (name: string, isOpen: boolean): void => {
    setOpen(isOpen)
    if (name) {
      setAnchor(name)
    }
  }

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.desktopContainer}>
        <ul className={styles.navbarList}>
          {userRoutes.map((route, index) => (
            <li
              key={`navbar-link-${index}`}
              role="menuitem"
              onClick={() => {
                if (!route.submenu) {
                  navigate(route.path)
                }
              }}
              onKeyDown={() => handleListHover(`submenu-${index}`, true)}
              onMouseEnter={() => handleListHover(`submenu-${index}`, true)}
            >
              <SidebarItem route={route} key={index} onClick={() => handleListHover('', false)} />
            </li>
          ))}
        </ul>
        {userRoutes.map((route, index) => (
          <div key={index}>
            {route.submenu && (
              <div
                className={cls(styles.subMenuContainer, open && anchor == `submenu-${index}` ? styles.activeSubmenu : '')}
                onMouseLeave={() => handleListHover('', false)}
              >
                <h4>{route.label}</h4>
                <div className={styles.subMenuLinks}>
                  {route.submenu.map((subRoute, subIndex) => {
                    if (validateRoutePermissions(subRoute.permissions ?? []) && validateRootPermissions(subRoute.rootPermissions ?? [])) {
                      return (
                        <SidebarSubMenuItem route={subRoute} key={subIndex} onClick={() => handleListHover('', false)} />
                      )
                    }
                    return (<div key={subIndex}></div>)
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

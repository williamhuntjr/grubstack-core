import React, { FC, memo } from 'react'
import { Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import logo from 'assets/img/grubstack-logo-dark.png'
import { appConfig } from 'common/config'
import { UserMenu } from './user-menu/user-menu'
import { IHeader } from './header.types'
import styles from './header.module.scss'

export const Header: FC<IHeader> = memo(({ onToggle, sidebarOpen }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Button onClick={onToggle} className={styles.menuToggleButton}>
          {sidebarOpen && (<MenuOpenIcon />) }
          {!sidebarOpen && (<MenuIcon />) }
        </Button>
        <div className={styles.logoContainer}>
          <a href={`${appConfig.corporateSite}/dashboard`}><img src={logo} alt="" className={styles.logoImage}/></a>
        </div>
        <div className={styles.userMenu}
          ><UserMenu />
        </div>
      </div>
    </div>
  )
})
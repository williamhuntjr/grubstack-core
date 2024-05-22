import React from 'react'
import { appConfig } from 'common/config'
import logo from 'assets/img/grubstack-logo-dark.png'
import styles from './header.module.scss'

export const Header = (): JSX.Element => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <a href={`${appConfig.productionUrl}/dashboard`}><img src={logo} alt="" className={styles.logoImage}/></a>
        </div>
      </div>
    </div>
  )
}
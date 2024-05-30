import React from 'react'
import Divider from '@mui/material/Divider'
import styles from './reports.module.scss'

export const Reports = (): JSX.Element => {
  return (
    <div className={styles.reportsContainer}>
      <h2 className="page-header">Reports</h2>
      <Divider className={styles.divider} />
    </div>
  )
}
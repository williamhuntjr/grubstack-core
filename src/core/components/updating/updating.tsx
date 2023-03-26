import React, { FC } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import styles from './updating.module.scss'

export const Updating: FC = () => {
  return (
    <div className={styles.updatingContainer}>
      <div className={styles.updatingContent}>
        <h3>Updating...</h3>
        <LinearProgress />
      </div>
    </div>
  )
}
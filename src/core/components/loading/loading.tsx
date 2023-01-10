import React, { FC } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import styles from './loading.module.scss'

export const Loading: FC = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <h2>Loading...</h2>
        <LinearProgress />
      </div>
    </div>
  )
}
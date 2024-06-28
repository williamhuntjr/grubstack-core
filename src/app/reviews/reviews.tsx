import React from 'react'
import Divider from '@mui/material/Divider'
import styles from './reviews.module.scss'

export const Reviews = (): JSX.Element => {
  return (
    <div className={styles.reviewsContainer}>
      <h2 className="page-header">Reviews</h2>
      <Divider className={styles.divider} />
    </div>
  )
}

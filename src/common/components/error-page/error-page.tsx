import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import LockIcon from '@mui/icons-material/Lock'
import { cls } from 'common/utils/utils'
import { IErrorPage } from './error-page.types'
import styles from './error-page.module.scss'

export const ErrorPage: FC<IErrorPage> = ({ headline, message, hideButton, fullPage }) => {
  const navigate = useNavigate()

  return (
    <div className={cls(styles.errorPageContainer, fullPage ? styles.fullPage : '')}>
      <LockIcon className={styles.lockIcon} color="primary" />
      <h2 className={styles.errorPageHeadline}>{headline}</h2>
      <p className={styles.errorPageMessage}>{message}</p>
      <Button onClick={() => navigate(-1)} variant="outlined" color="primary" className={hideButton ? styles.hiddenButton : ''}>Go Back</Button>
    </div>
  )
}
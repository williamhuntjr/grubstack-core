import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IContent } from './content.types'
import { renderRoute } from './content.utils'
import styles from './content.module.scss'

export const Content: FC<IContent> = ({ route }) => {
  let navigate = useNavigate()

  useEffect(() => {
    if (route.redirectTo) {
      navigate(route.redirectTo)
    }
    // eslint-disable-next-line
  }, [route.redirectTo])

  return (
    <div className={styles.contentContainer}>
      {renderRoute(route)}
    </div>
  )
}
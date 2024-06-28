import React, { FC } from 'react'
import { cls } from 'common/utils/utils'
import { ICardButton } from './card-button.types'
import styles from './card-button.module.scss'

export const CardButton: FC<ICardButton> = ({ title, description, icon, onClick, responsive }) => {
  return (
    <div
      className={cls(styles.cardButtonContainer, responsive ? styles.cardButtonContainerResponsive : '')}
      onClick={onClick}
      onKeyDown={onClick}
      tabIndex={0}
      role="button"
    >
      <div className={styles.cardButtonIcon}>{icon}</div>
      <h2 className={styles.cardButtonHeader}>{title}</h2>
      <p className={styles.cardButtonDescription}>{description}</p>
    </div>
  )
}

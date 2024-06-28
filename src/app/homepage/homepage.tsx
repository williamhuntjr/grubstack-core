import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import { cls } from 'common/utils/utils'
import { homepageCards } from './homepage.constants'
import styles from './homepage.module.scss'

export const Homepage: FC = () => {
  let navigate = useNavigate()

  return (
    <div className={styles.homepage}>
      <h2 className={cls(styles.title, 'page-header')}>Manage your Restaurant</h2>
      <p className="page-description">Explore some of our app features</p>
      <Divider className={styles.divider} />
      <ul className={styles.homepageCards}>
        {homepageCards.map((card, index) => (
          <li
            className={styles.homepageCard}
            key={`homepage-card-${index}`}
            onKeyDown={() => navigate(card.path)}
            onClick={() => navigate(card.path)}
            role="menuitem"
          >
            <div className={styles.homepageCardContent}>
              <card.icon className={styles.cardIcon} />
              <h3>{card.label}</h3>
              <p>{card.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

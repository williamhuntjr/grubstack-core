import React, { FC } from 'react'
import Divider from '@mui/material/Divider'
import AddLocationIcon from '@mui/icons-material/AddLocation'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import FaceIcon from '@mui/icons-material/Face'
import ImageIcon from '@mui/icons-material/Image'
import StarsIcon from '@mui/icons-material/Stars'
import CampaignIcon from '@mui/icons-material/Campaign'
import styles from './homepage.module.scss'

export const Homepage: FC = () => {
  return (
    <div className={styles.homepage}>
      <h2 className={styles.title}>Manage your Restaurant</h2>
      <p className={styles.subTitle}>Explore some of our app features</p>
      <Divider className={styles.divider}/>
      <ul className={styles.homepageCards}>
        <li className={styles.homepageCard}>
          <div className={styles.homepageCardContent}>
            <AddLocationIcon className={styles.cardIcon} />
            <h3>Add a Location</h3>
            <p>Create new restaurant locations</p>
          </div>
        </li>
        <li className={styles.homepageCard}>
          <div className={styles.homepageCardContent}>
            <ImageIcon className={styles.cardIcon} />
            <h3>Media Library</h3>
            <p>Add images for your menus</p>
          </div>
        </li>
        <li className={styles.homepageCard}>
          <div className={styles.homepageCardContent}>
            <FastfoodIcon className={styles.cardIcon} />
            <h3>Create a Product</h3>
            <p>Add a product for your food menu</p>
          </div>
        </li>
        <li className={styles.homepageCard}>
          <div className={styles.homepageCardContent}>
            <FaceIcon className={styles.cardIcon} />
            <h3>Add Employees</h3>
            <p>Keep track of location employees</p>
          </div>
        </li>
        <li className={styles.homepageCard}>
          <div className={styles.homepageCardContent}>
            <StarsIcon className={styles.cardIcon} />
            <h3>Manage Reviews</h3>
            <p>See what your customers are saying</p>
          </div>
        </li>
        <li className={styles.homepageCard}>
          <div className={styles.homepageCardContent}>
            <CampaignIcon className={styles.cardIcon} />
            <h3>Create a Campaign</h3>
            <p>Boost sales and revenue</p>
          </div>
        </li>
      </ul>
    </div>
  )
}
import React, { FC } from 'react'
import Button from '@mui/material/Button'
import { cls } from 'common/utils/utils'
import { filterProperty } from 'app/restaurant/restaurant.utilities'
import { IRestaurantImages } from './restaurant-images.types'
import { brandingImages } from './restaurant-images.constants'
import styles from './restaurant-images.module.scss'

export const RestaurantImages: FC<IRestaurantImages> = ({ state, canEditLocations, onOpenFilePickerDialog }) => {
  return (
    <div className={styles.restaurantImages}>
      {brandingImages.map((restaurantImage, index) => 
      <div className={cls(styles.imageContainer, styles.logoContainer)} key={index}>
        <div className={styles.imageContent}>
          <h4>{restaurantImage.name}</h4>
          <p className={styles.subTitle}>{restaurantImage.description}</p>
          <img src={filterProperty(state.properties, restaurantImage.property)} alt="" />
          <div className={styles.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!canEditLocations}
              onClick={() => onOpenFilePickerDialog(restaurantImage.property)}
            >
              Change
            </Button>
          </div>
        </div>
      </div>
      )}

    </div>
  )
}
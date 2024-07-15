import React, { FC } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { RestaurantProperty } from 'app/restaurant/restaurant.constants'
import { filterProperty } from 'app/restaurant/restaurant.utilities'
import { IRestaurantName } from './restaurant-name.types'
import styles from './restaurant-name.module.scss'

export const RestaurantName: FC<IRestaurantName> = ({ state, canEditLocations, onUpdate, onSubmit }) => {
  return (
    <div className={styles.restaurantName}>
      <h4>Restaurant Name</h4>
      <TextField
        id="restaurant-name"
        variant="outlined"
        className={styles.textField}
        value={filterProperty(state.properties, RestaurantProperty.RestaurantName)}
        disabled={!canEditLocations}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onUpdate(event.target.value)
        }}
      />
      <div className={styles.buttonContainer}>
        <Button variant="contained" color="primary" disabled={!canEditLocations} onClick={onSubmit}>
          Save
        </Button>
      </div>
    </div>
  )
}
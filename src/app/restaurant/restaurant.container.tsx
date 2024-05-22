import React, { FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { usePagination } from 'common/hooks/pagination.hook'
import { ILocation } from './locations/locations.types'
import { useRestaurantModule } from './restaurant-module-hook'
import { IRestaurantContainer } from './restaurant.types'
import styles from './restaurant.module.scss'

export const RestaurantContainer: FC<IRestaurantContainer> = ({ label, route, children, routeReload }) => {
  const { LocationService } = useRestaurantModule()

  const { locationId } = useParams()
  const navigate = useNavigate()

  const {
    state: paginationState,
  } = usePagination<ILocation>(LocationService.getAll, 1000)

  const handleChange = (event: SelectChangeEvent): void => {
    if (route) {
      navigate(`${route}/${event.target.value as String}`)
      if (routeReload) {
        window.location.reload()
      }
    }
  }

  return (
    <div className={styles.restaurantContainer}>
      <div className={styles.restaurantContent}>
        <div className={styles.restaurantHeader}>
          {label &&
          <div className={styles.restaurantLabel}>
            <h3>{label}</h3>
          </div>
          }
          <div className={styles.locationPicker}>
            <FormControl fullWidth>
              <InputLabel id="location-picker">Location</InputLabel>
              <Select
                labelId="location-picker-select-label"
                id="location-picker-select"
                label="Location"
                onChange={handleChange}
                value={locationId ?? ''}
              >
                {paginationState.data.map((location) => 
                  <MenuItem value={location.id!} key={`location-${location.id}`}>{location.name}</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
        </div>
        <Divider className={styles.divider} />
        {children}
      </div>
    </div>
  )
}
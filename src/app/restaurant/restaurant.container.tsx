import React, { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Loading } from 'common/components/loading/loading'
import { usePagination } from 'common/hooks/pagination.hook'
import { ILocation } from './locations/locations.types'
import { useRestaurantModule } from './restaurant-module-hook'
import { IRestaurantContainer } from './restaurant.types'
import styles from './restaurant.module.scss'
import { restaurantLocationsPath } from './restaurant.constants'

export const RestaurantContainer: FC<IRestaurantContainer> = ({ label, route, children }) => {
  const [ isLoading, setLoading ] = useState<boolean>(true)

  const { LocationService } = useRestaurantModule()
  const { locationId } = useParams()

  const navigate = useNavigate()

  const {
    state: paginationState,
  } = usePagination<ILocation>(LocationService.getAll, 1000)

  const handleChange = (event: SelectChangeEvent): void => {
    if (route) {
      navigate(`${route}/${event.target.value as String}`)
    }
  }

  const checkLocation = async(locationIdToCheck: string): Promise<void> => {
    try {
      await LocationService.get(locationIdToCheck)
      setLoading(false)
    } catch(e) {
      toast.error('The URL provided is invalid. There is no such location.')
      navigate(`${restaurantLocationsPath}`)
      console.error(e)
    }
  }

  const init = async (): Promise<void> => {
    try {
      if (!locationId && route && route != restaurantLocationsPath) {
        setLoading(true)
        const { data } = await LocationService.getAll({ page: 1, limit: 100 })
        if (data.length > 0) {
          navigate(`${route}/${data[0].id}`)
        }
        else {
          toast.error('You need to add a restaurant location first.')
          navigate(`${restaurantLocationsPath}`)
        }
        setLoading(false)
      }
      else {
        if (locationId) {
          await checkLocation(locationId!)
        }
      }
      setLoading(false)
    } catch(e) {
      console.error(e)
    }
  }

  // eslint-disable-next-line
  useEffect(() => void init(), [])

  return (
    <div className={styles.restaurantContainer}>
      {isLoading && <Loading />}
      {!isLoading &&
      <div className={styles.restaurantContent}>
        <div className={styles.restaurantHeader}>
          {label &&
          <div className={styles.restaurantLabel}>
            <h2>{label}</h2>
          </div>
          }
          {route &&
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
          }
        </div>
        {label &&
          <Divider className={styles.divider} />
        }
        {children}
      </div>
      }
    </div>
  )
}
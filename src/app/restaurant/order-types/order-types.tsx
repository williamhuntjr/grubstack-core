import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Switch from '@mui/material/Switch'
import { UserPermissions } from 'auth/auth.constants'
import { hasPermission } from 'auth/auth.utils'
import { RestaurantContainer } from '../restaurant.container'
import { restaurantOrderTypesPath } from '../restaurant.constants'
import { useRestaurantModule } from '../restaurant-module-hook'
import { IOrderType } from './order-types.types'
import styles from './order-types.module.scss'

export const OrderTypes = (): JSX.Element => {
  const [orderTypes, setOrderTypes] = useState<IOrderType[]>()
  const [locationOrderTypes, setLocationOrderTypes] = useState<IOrderType[]>([])

  const { locationId } = useParams()
  const { RestaurantService, LocationService } = useRestaurantModule()

  const canEditLocations = hasPermission(UserPermissions.MaintainLocations)

  const fetchData = async (): Promise<void> => {
    try {
      const resp = await RestaurantService.getOrderTypes()
      setOrderTypes(resp.data)
      const activeOrderTypes = await LocationService.getOrderTypes(locationId!)
      setLocationOrderTypes(activeOrderTypes.data ?? [])
    } catch (e) {
      console.error(e)
    }
  }

  const isOrderTypeActive = (orderTypeId: string): boolean => {
    const filtered = locationOrderTypes.filter((orderType) => orderType.id == orderTypeId)
    return filtered?.length > 0 ? true : false
  }

  const toggleOrderType = async (orderTypeId: string, checked: boolean): Promise<void> => {
    try {
      if (!checked) {
        await LocationService.deleteOrderType(locationId!, orderTypeId)
      } else {
        await LocationService.addOrderType(locationId!, orderTypeId)
      }
      await fetchData()
    } catch (e) {
      console.error(e)
    }
  }

  // eslint-disable-next-line
  useEffect(() => void fetchData(), [locationId])

  return (
    <RestaurantContainer label={'Order Types'} route={restaurantOrderTypesPath}>
      <div className={styles.orderTypesContainer}>
        <ul className={styles.orderTypesList}>
          {orderTypes?.map((orderType, index) => (
            <li key={index}>
              <h3>{orderType.name}</h3>
              <p>{orderType.description}</p>
              <Switch
                disabled={!canEditLocations}
                aria-label="Enable Order Type"
                checked={isOrderTypeActive(orderType.id)}
                onChange={(e) => toggleOrderType(orderType.id, e.target.checked)}
              />{' '}
              {isOrderTypeActive(orderType.id) ? 'Enabled' : 'Disabled'}
            </li>
          ))}
        </ul>
      </div>
    </RestaurantContainer>
  )
}

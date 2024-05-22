import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from 'core/components/loading/loading'
import { useRestaurantModule } from '../restaurant-module-hook'
import { RestaurantContainer } from '../restaurant.container'
import { ILocation } from '../locations/locations.types'
import { LocationList } from '../locations/location-list/location-list'
import { orderTypeRoutePath } from './order-types.constants'

export const OrderTypes = (): JSX.Element => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [locations, setLocations] = useState<ILocation[]>([])

  const { LocationService } = useRestaurantModule()
  const { locationId } = useParams()

  const init = async (): Promise<void> => {
    setLoading(true)
    const resp = await LocationService.getAll({ page: 1, limit: 1000 })
    if (resp.data) {
      setLocations(resp.data)
    }
    setLoading(false)
  }

  // eslint-disable-next-line
  useEffect(() => void init(), [])

  return (
    <>
    {isLoading && <Loading />}
    <RestaurantContainer label={"Order Types"}>
      <LocationList locationId={locationId} routePath={orderTypeRoutePath} locations={locations} />
    </RestaurantContainer>
    </>
 )
}
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { restaurantLocationsPath } from './restaurant.constants'

export const Restaurant = (): JSX.Element => {
  const navigate = useNavigate()

  useEffect(() => navigate(`${restaurantLocationsPath}`))

  return <></>
}

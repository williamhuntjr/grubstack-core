import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { restaurantRoutePath } from './restaurant.constants'

export const Restaurant = (): JSX.Element => {
  const navigate = useNavigate()

  useEffect(() => navigate(`${restaurantRoutePath}/branding`))

  return <></>
}

import { RestaurantProperty } from 'app/restaurant/restaurant.constants'
import { IBrandingState } from '../branding.types'

export interface IRestaurantColors {
  state: IBrandingState
  onUpdate: (key: string, value: string) => void
}

export interface IRestaurantColor {
  name: string
  description: string
  property: RestaurantProperty
}
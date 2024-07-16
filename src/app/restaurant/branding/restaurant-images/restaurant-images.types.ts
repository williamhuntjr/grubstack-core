import { RestaurantProperty } from 'app/restaurant/restaurant.constants'
import { IBrandingState } from '../branding.types'

export interface IRestaurantImages {
  state: IBrandingState
  canEditLocations: boolean
  onOpenFilePickerDialog: (data: string | null) => void
}

export interface IBrandingImage {
  name: string
  description: string
  property: RestaurantProperty
}

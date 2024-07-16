import { IBrandingState } from '../branding.types'

export interface IRestaurantName {
  state: IBrandingState
  canEditLocations: boolean
  onUpdate: (value: string) => void
  onSubmit: () => Promise<void>
}

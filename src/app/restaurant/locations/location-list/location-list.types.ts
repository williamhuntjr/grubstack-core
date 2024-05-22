import { ILocation } from '../locations.types'

export interface ILocationList {
  locations: ILocation[]
  routePath: string
  locationId?: string
}
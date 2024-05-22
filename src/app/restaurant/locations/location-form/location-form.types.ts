import { GSMode } from 'common/utils/mode/mode.types'
import { ILocation } from '../locations.types'

export enum LocationFormField {
  Name = 'name',
  Address = 'address1',
  City = 'city',
  State = 'state',
  Postal = 'postal',
  Icon = 'icon',
  LocationType = 'location_type',
  PhoneNumber = 'phone_number',
  IsActive = 'is_active'
}

export enum LocationFormLabel {
  Name = 'Location Name',
  Address = 'Address',
  City = 'City',
  State = 'State',
  Postal = 'Postal',
  Icon = 'Icon',
  LocationType = 'Location Type',
  PhoneNumber = 'Phone Number',
  IsActive = 'Is Active'
}

export interface ILocationFormValues {
  [LocationFormField.Name]: string
  [LocationFormField.Address]: string
  [LocationFormField.City]: string
  [LocationFormField.State]: string
  [LocationFormField.Postal]: string
  [LocationFormField.LocationType]: string
  [LocationFormField.PhoneNumber]: string
  [LocationFormField.IsActive]: boolean
}

export interface ILocationForm {
  onSubmit(data: ILocationFormValues): Promise<void>
  data?: ILocation|null
  mode: GSMode
}
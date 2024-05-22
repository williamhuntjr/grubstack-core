import { LocationFormField } from './location-form.types'

export const locationTypes = [
  {
    select_value: 'restaurant',
    select_label: 'Restaurant'
  },
  { 
    select_value: 'food-truck',
    select_label: 'Food Truck'
  }
]

export const defaultLocationFormData = {
  [LocationFormField.Name]: '',
  [LocationFormField.Address]: '',
  [LocationFormField.City]: '',
  [LocationFormField.State]: '',
  [LocationFormField.Postal]: '',
  [LocationFormField.LocationType]: 'restaurant',
  [LocationFormField.PhoneNumber]: '',
  [LocationFormField.IsActive]: false
}
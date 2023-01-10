import { StoreFormField } from './store-form.types'

export const storeTypes = [
  {
    select_value: 'store-front',
    select_label: 'Store Front'
  },
  { 
    select_value: 'food-truck',
    select_label: 'Food Truck'
  }
]

export const defaultStoreFormData = {
  [StoreFormField.Name]: '',
  [StoreFormField.Address]: '',
  [StoreFormField.City]: '',
  [StoreFormField.State]: '',
  [StoreFormField.Postal]: '',
  [StoreFormField.StoreType]: 'store-front',
  [StoreFormField.Thumbnail]: ''
}
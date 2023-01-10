import { GSMode } from 'common/utils/mode/mode.types'
import { IStore } from 'app/stores/stores.types'
import { IQuickPickerItem } from 'core/components/quick-picker/quick-picker.types'

export enum StoreFormField {
  Name = 'name',
  Address = 'address1',
  City = 'city',
  State = 'state',
  Postal = 'postal',
  Icon = 'icon',
  StoreType = 'store_type',
  Thumbnail = 'thumbnail_url'
}

export enum StoreFormLabel {
  Name = 'Store Name',
  Address = 'Address',
  City = 'City',
  State = 'State',
  Postal = 'Postal',
  Icon = 'Icon',
  StoreType = 'Store Type',
  Thumbnail = 'Thumbnail URL'
}

export interface IStoreFormValues {
  [StoreFormField.Name]: string
  [StoreFormField.Address]: string
  [StoreFormField.City]: string
  [StoreFormField.State]: string
  [StoreFormField.Postal]: string
  [StoreFormField.Icon]: string
  [StoreFormField.StoreType]: string
  [StoreFormField.Thumbnail]: string
}

export interface IStoreForm {
  onClose(): void
  onDeleteMenu(storeId: string, menuId: string): void
  onSubmit(data: IStoreFormValues): Promise<void>
  data?: IStore|null
  mode: GSMode
  onOpenAddDialog: (data: IQuickPickerItem[]) => void
  
}
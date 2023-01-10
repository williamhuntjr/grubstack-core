import { GSMode } from 'common/utils/mode/mode.types'
import { IItem } from 'app/products/items/items.types'

export enum ItemFormField {
  Id = 'id',
  Name = 'name',
  Description = 'description',
  Thumbnail = 'thumbnail_url',
}

export enum ItemFormLabel {
  Name = 'Item Name',
  Description = 'Description',
  Thumbnail = 'Thumbnail URL',
}

export interface IItemFormValues {
  [ItemFormField.Name]: string
  [ItemFormField.Description]: string
  [ItemFormField.Thumbnail]: string
}

export interface IItemForm {
  onClose(): void
  onSubmit(data: IItemFormValues): Promise<void>
  data?: IItem|null
  mode: GSMode
}
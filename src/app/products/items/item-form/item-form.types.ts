import { GSMode } from 'common/utils/mode/mode.types'
import { IItem } from 'app/products/items/items.types'
import { IVariety } from 'app/products/varieties/varieties.types'

export enum ItemFormField {
  Id = 'id',
  Name = 'name',
  Description = 'description',
  Thumbnail = 'thumbnail_url',
  Varieties = 'varieties',
}

export enum ItemFormLabel {
  Name = 'Item Name',
  Description = 'Description',
  Thumbnail = 'Thumbnail URL',
  Varieties = 'Varieties',
}

export interface IItemFormValues {
  [ItemFormField.Name]: string
  [ItemFormField.Description]: string
  [ItemFormField.Thumbnail]: string
  [ItemFormField.Varieties]: IVariety[]
}

export interface IItemForm {
  onClose(): void
  onSubmit(data: IItemFormValues): Promise<void>
  data?: IItem|null
  mode: GSMode
  isPickerDirty: boolean
  onOpenFilePicker: (data: null) => void
}
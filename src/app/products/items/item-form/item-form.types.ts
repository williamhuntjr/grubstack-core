import { GSMode } from 'common/utils/mode/mode.types'
import { IItem } from 'app/products/items/items.types'
import { IVariety } from 'app/products/varieties/varieties.types'

export enum ItemFormField {
  Id = 'id',
  Name = 'name',
  Description = 'description',
  Thumbnail = 'thumbnail_url',
  Varieties = 'varieties',
  LabelColor = 'label_color'
}

export enum ItemFormLabel {
  Name = 'Item Name',
  Description = 'Description',
  Thumbnail = 'Thumbnail URL',
  Varieties = 'Varieties',
  LabelColor = 'Label Color'
}

export interface IItemFormValues {
  [ItemFormField.Name]: string
  [ItemFormField.Description]: string
  [ItemFormField.Thumbnail]: string
  [ItemFormField.Varieties]: IVariety[]
  [ItemFormField.LabelColor]: string
}

export interface IItemForm {
  onSubmit(data: IItemFormValues): Promise<void>
  data?: IItem|null
  mode: GSMode
  isPickerDirty: boolean
  onOpenFilePicker: (data: IItem|null) => void
}
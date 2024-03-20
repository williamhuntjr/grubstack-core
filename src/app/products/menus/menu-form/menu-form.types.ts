import { GSMode } from 'common/utils/mode/mode.types'
import { IMenu } from 'app/products/menus/menus.types'

export enum MenuFormField {
  Name = 'name',
  Description = 'description',
  Thumbnail = 'thumbnail_url',
  LabelColor = 'label_color'
}

export enum MenuFormLabel {
  Name = 'Menu Name',
  Description = 'Description',
  Thumbnail = 'Thumbnail URL',
  LabelColor = 'Label Color'
}

export interface IMenuFormValues {
  [MenuFormField.Name]: string
  [MenuFormField.Description]: string
  [MenuFormField.Thumbnail]: string
  [MenuFormField.LabelColor]: string
}

export interface IMenuForm {
  onSubmit(data: IMenuFormValues): Promise<void>
  data?: IMenu|null
  mode: GSMode
  isPickerDirty: boolean
  onOpenFilePicker: (data: IMenu|null) => void
}
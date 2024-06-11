import { GSMode } from 'common/utils/mode/mode.types'
import { IVariety } from 'app/products/varieties/varieties.types'

export enum VarietyFormField {
  Id = 'id',
  Name = 'name',
  Description = 'description',
  Thumbnail = 'thumbnail_url',
}

export enum VarietyFormLabel {
  Name = 'Variety Name',
  Description = 'Description',
  Thumbnail = 'Thumbnail URL',
}

export interface IVarietyFormValues {
  [VarietyFormField.Name]: string
  [VarietyFormField.Description]: string
  [VarietyFormField.Thumbnail]: string
}

export interface IVarietyForm {
  onClose(): void
  onSubmit(data: IVarietyFormValues): Promise<void>
  data?: IVariety|null
  mode: GSMode
  isPickerDirty: boolean
  onOpenFilePicker: (data: IVariety|null) => void
}
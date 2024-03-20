import { GSMode } from 'common/utils/mode/mode.types'
import { IFranchise } from 'app/franchises/franchises.types'
import { IQuickPickerItem } from 'core/components/quick-picker/quick-picker.types'

export enum FranchiseFormField {
  Name = 'name',
  Description = 'description',
  Thumbnail = 'thumbnail_url',
}

export enum FranchiseFormLabel {
  Name = 'Franchise Name',
  Description = 'Description',
  Thumbnail = 'Thumbnail URL',
}

export interface IFranchiseFormValues {
  [FranchiseFormField.Name]: string
  [FranchiseFormField.Description]: string
  [FranchiseFormField.Thumbnail]: string
}

export interface IFranchiseForm {
  onClose(): void
  onDeleteStore(franchiseId: string, storeId: string): void
  onSubmit(data: IFranchiseFormValues): Promise<void>
  data?: IFranchise|null
  mode: GSMode
  onOpenAddDialog: (data: IQuickPickerItem[]) => void
  onOpenFilePicker: (data: IFranchise|null) => void
  isPickerDirty: boolean
}
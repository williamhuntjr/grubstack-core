import { IItem } from 'app/products/items/items.types'
import { GSMode } from 'common/utils/mode/mode.types'
import { IQuickPickerItem } from 'core/components/quick-picker/quick-picker.types'
import { ItemFormField } from './item-form.constants'

export interface IBuilderItemFormValues {
  [ItemFormField.Price]: number
  [ItemFormField.SalePrice]: number
  [ItemFormField.OnSale]: boolean
}

export interface IItemForm {
  onClose(): void
  onSubmit(data: IBuilderItemFormValues): Promise<void>
  data?: IItem|null
  mode: GSMode
  onOpenAddDialog: (data: IQuickPickerItem[]) => void
}
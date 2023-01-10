import * as Yup from 'yup'
import { validationMessage } from 'common/validation/validation'
import { ItemFormField } from './item-form.types'

export const ItemFormSchema = Yup.object().shape({
  [ItemFormField.Name]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [ItemFormField.Description]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [ItemFormField.Thumbnail]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
})
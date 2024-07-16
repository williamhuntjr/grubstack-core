import * as Yup from 'yup'
import { validationMessage } from 'common/validation/validation'
import { ItemFormField } from './item-form.types'

export const ItemFormSchema = Yup.object().shape({
  [ItemFormField.Name]: Yup.string().required(validationMessage.isRequired).typeError(validationMessage.isRequired),
  [ItemFormField.Slug]: Yup.string().required(validationMessage.isRequired).typeError(validationMessage.isRequired),
})

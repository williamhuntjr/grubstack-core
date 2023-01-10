import * as Yup from 'yup'
import { validationMessage } from 'common/validation/validation'
import { MenuFormField } from './menu-form.types'

export const MenuFormSchema = Yup.object().shape({
  [MenuFormField.Name]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [MenuFormField.Description]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [MenuFormField.Thumbnail]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
})
import * as Yup from 'yup'
import { validationMessage } from 'common/validation/validation'
import { VarietyFormField } from './variety-form.types'

export const VarietyFormSchema = Yup.object().shape({
  [VarietyFormField.Name]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [VarietyFormField.Description]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [VarietyFormField.Thumbnail]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
})
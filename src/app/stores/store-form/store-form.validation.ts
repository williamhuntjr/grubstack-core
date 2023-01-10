import * as Yup from 'yup'
import { validationMessage } from 'common/validation/validation'
import { StoreFormField } from './store-form.types'

export const StoreFormSchema = Yup.object().shape({
  [StoreFormField.Name]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [StoreFormField.Address]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [StoreFormField.City]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [StoreFormField.State]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [StoreFormField.Postal]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [StoreFormField.StoreType]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
})
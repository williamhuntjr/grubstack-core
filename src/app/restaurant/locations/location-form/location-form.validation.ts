import * as Yup from 'yup'
import { validationMessage } from 'common/validation/validation'
import { LocationFormField } from './location-form.types'

export const LocationFormSchema = Yup.object().shape({
  [LocationFormField.Name]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [LocationFormField.Address]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [LocationFormField.City]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [LocationFormField.State]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [LocationFormField.Postal]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [LocationFormField.PhoneNumber]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired),
  [LocationFormField.LocationType]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired)
})
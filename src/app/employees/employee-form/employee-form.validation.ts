import * as Yup from 'yup'
import { validationMessage } from 'common/validation/validation'
import { EmployeeFormField } from './employee-form.types'

export const EmployeeFormSchema = Yup.object().shape({
  [EmployeeFormField.FirstName]: Yup.string().required(validationMessage.isRequired).typeError(validationMessage.isRequired),
  [EmployeeFormField.LastName]: Yup.string().required(validationMessage.isRequired).typeError(validationMessage.isRequired),
  [EmployeeFormField.Gender]: Yup.string().required(validationMessage.isRequired).typeError(validationMessage.isRequired),
  [EmployeeFormField.Address]: Yup.string().required(validationMessage.isRequired).typeError(validationMessage.isRequired),
  [EmployeeFormField.City]: Yup.string().required(validationMessage.isRequired).typeError(validationMessage.isRequired),
  [EmployeeFormField.State]: Yup.string().required(validationMessage.isRequired).typeError(validationMessage.isRequired),
  [EmployeeFormField.Postal]: Yup.string().required(validationMessage.isRequired).typeError(validationMessage.isRequired),
  [EmployeeFormField.JobTitle]: Yup.string().required(validationMessage.isRequired).typeError(validationMessage.isRequired),
})

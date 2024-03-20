import * as Yup from 'yup'
import { validationMessage } from 'common/validation/validation'
import { FranchiseFormField } from './franchise-form.types'

export const FranchiseFormSchema = Yup.object().shape({
  [FranchiseFormField.Name]: Yup.string()
    .required(validationMessage.isRequired)
    .typeError(validationMessage.isRequired)
})
import * as Yup from 'yup'
import { validationMessage } from 'common/validation/validation'
import { IngredientFormField } from './ingredient-form.types'

export const IngredientFormSchema = Yup.object().shape({
  [IngredientFormField.Name]: Yup.string().required(validationMessage.isRequired).typeError(validationMessage.isRequired),
})

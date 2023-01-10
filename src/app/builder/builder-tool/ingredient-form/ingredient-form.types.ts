import { IIngredient } from 'app/products/ingredients/ingredients.types'
import { GSMode } from 'common/utils/mode/mode.types'
import { IngredientFormField } from './ingredient-form.constants'

export interface IBuilderIngredientFormValues {
  [IngredientFormField.Optional]: boolean 
  [IngredientFormField.Addon]: boolean
  [IngredientFormField.Extra]: boolean
}

export interface IIngredientForm {
  onClose(): void
  onSubmit(data: IBuilderIngredientFormValues): Promise<void>
  data?: IIngredient|null
  mode: GSMode
}
import { GSMode } from 'common/utils/mode/mode.types'

export const ingredientServiceToken = 'IngredientService'
 
export const defaultIngredientState = {
  isLoading: false,
  data: [],
  mode: GSMode.New,
  total: 0,
  pages: 1,
  page: 1,
}
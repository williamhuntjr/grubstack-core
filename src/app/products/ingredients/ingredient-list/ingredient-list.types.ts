import { IIngredient } from 'app/products/ingredients/ingredients.types'

export interface IIngredientListItem extends IIngredient {
  render?: JSX.Element
}
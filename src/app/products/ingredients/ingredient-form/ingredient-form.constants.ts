import { IngredientFormField } from './ingredient-form.types'

export const defaultIngredientMeasurements = {
  [IngredientFormField.Calories]: 0,
  [IngredientFormField.Fat]: 0,
  [IngredientFormField.SaturatedFat]: 0,
  [IngredientFormField.TransFat]: 0,
  [IngredientFormField.Cholesterol]: 0,
  [IngredientFormField.Sodium]: 0,
  [IngredientFormField.Carbs]: 0,
  [IngredientFormField.Protein]: 0,
  [IngredientFormField.Sugar]: 0,
  [IngredientFormField.Fiber]: 0,
  [IngredientFormField.Price]: 0,
}
export const defaultIngredientFormData = {
  [IngredientFormField.Id]: '',
  [IngredientFormField.Name]: '',
  [IngredientFormField.Description]: '',
  [IngredientFormField.Thumbnail]: '',
  ...defaultIngredientMeasurements,
}

import { GSMode } from 'common/utils/mode/mode.types'
import { IIngredient } from 'app/products/ingredients/ingredients.types'

export enum IngredientFormField {
  Id = 'id',
  Name = 'name',
  Description = 'description',
  Thumbnail = 'thumbnail_url',
  Calories = 'calories',
  Fat = 'fat',
  SaturatedFat = 'saturated_fat',
  TransFat = 'trans_fat',
  Cholesterol = 'cholesterol',
  Carbs = 'carbs',
  Sodium = 'sodium',
  Protein = 'protein',
  Sugar = 'sugar',
  Fiber = 'fiber',
  Price = 'price',
}

export enum IngredientFormLabel {
  Name = 'Ingredient Name',
  Description = 'Description',
  Thumbnail = 'Thumbnail URL',
  Calories = 'Calories',
  Fat = 'Fat (g)',
  SaturatedFat = 'Saturated Fat (g)',
  TransFat = 'Trans Fat (g)',
  Cholesterol = 'Cholesterol (mg)',
  Carbs = 'Carbs (g)',
  Sodium = 'Sodium (mg)',
  Protein = 'Protein (g)',
  Sugar = 'Sugar (g)',
  Fiber = 'Fiber (g)',
  Price = 'Price',
}

export interface IIngredientFormValues {
  [IngredientFormField.Name]: string
  [IngredientFormField.Description]: string
  [IngredientFormField.Thumbnail]: string
  [IngredientFormField.Calories]: number
  [IngredientFormField.Fat]: number
  [IngredientFormField.SaturatedFat]: number
  [IngredientFormField.TransFat]: number
  [IngredientFormField.Cholesterol]: number
  [IngredientFormField.Sodium]: number
  [IngredientFormField.Carbs]: number
  [IngredientFormField.Protein]: number
  [IngredientFormField.Sugar]: number
  [IngredientFormField.Fiber]: number
  [IngredientFormField.Price]: number
}

export interface IIngredientForm {
  onSubmit(data: IIngredientFormValues): Promise<void>
  data?: IIngredient|null
  mode: GSMode
  isPickerDirty: boolean
  onOpenFilePicker: (data: IIngredient|null) => void
}
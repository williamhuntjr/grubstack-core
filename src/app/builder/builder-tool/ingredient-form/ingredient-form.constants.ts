export enum IngredientFormField {
  Optional = 'is_optional',
  Addon = 'is_addon',
  Extra = 'is_extra',
}

export enum IngredientFormLabel {
  Optional = 'Ingredient is optional',
  Addon = 'This ingredient is an add-on and will cost an additional fee',
  Extra = 'Allow customer to add extra to order for an additional fee',
}

export const defaultIngredientFormData = {
  [IngredientFormField.Optional]: false,
  [IngredientFormField.Addon]: false,
  [IngredientFormField.Extra]: false,
}

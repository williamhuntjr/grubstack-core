import { buildItemData } from 'app/products/ingredients/ingredient-list/ingredient-list.utils'
import { IIngredientSpecs, IIngredient } from 'app/products/ingredients/ingredients.types'
import { IVariety } from 'app/products/varieties/varieties.types'
import { IGrubListItem } from 'core/components/grub-list/grub-list.types'
import { IBuilderDataItem } from './builder-tool.types'

export function buildNutritionLabel(data: IBuilderDataItem[]): JSX.Element {
  let newData:IIngredientSpecs = {
    calories: 0,
    fat: 0,
    saturated_fat: 0,
    trans_fat: 0,
    cholesterol: 0,
    sodium: 0,
    carbs: 0,
    protein: 0,
    sugar: 0,
    fiber: 0
  }
  data.forEach((ingredient) => {
    const convertedData = {...ingredient} as IIngredient
    newData.calories = Number(newData.calories) + Number(convertedData.calories)
    newData.fat = Number(newData.fat) + Number(convertedData.fat)
    newData.saturated_fat = Number(newData.saturated_fat) + Number(convertedData.saturated_fat)
    newData.trans_fat = Number(newData.trans_fat) + Number(convertedData.trans_fat)
    newData.cholesterol = Number(newData.cholesterol) + Number(convertedData.cholesterol)
    newData.sodium = Number(newData.sodium) + Number(convertedData.sodium)
    newData.carbs = Number(newData.carbs) + Number(convertedData.carbs)
    newData.protein = Number(newData.protein) + Number(convertedData.protein)
    newData.sugar = Number(newData.sugar) + Number(convertedData.sugar)
    newData.fiber = Number(newData.fiber) + Number(convertedData.fiber)
  })
  return buildItemData(newData)
}

export function normalizeData(data: IVariety[]): IGrubListItem[] {
  return data.map((item) => ({
    label: item.name,
    value: item.id ?? ''
  }))
}
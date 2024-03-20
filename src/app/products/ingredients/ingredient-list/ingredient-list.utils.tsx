import React from 'react'
import { IIngredient, IIngredientSpecs } from 'app/products/ingredients/ingredients.types'
import { IIngredientListItem } from './ingredient-list.types'
import styles from './ingredient-list.module.scss'

export function buildItemData(item: IIngredientSpecs): JSX.Element {
  return (
    <div>
      <h4 className={styles.nutritionHeadline}>Nutrition Facts</h4>
      <ul className={styles.ingredientsLabel}>
        <li><strong>Calories:</strong> {item.calories}g</li>
        <li><strong>Fat:</strong> {item.fat}g</li>
        <li><strong>Saturated Fat:</strong> {item.saturated_fat}g</li>
        <li><strong>Trans Fat:</strong> {item.trans_fat}g</li>
        <li><strong>Cholesterol:</strong> {item.cholesterol}mg</li>
        <li><strong>Sodium:</strong> {item.sodium}mg</li>
        <li><strong>Carbs:</strong> {item.carbs}g</li>
        <li><strong>Protein:</strong> {item.protein}g</li>
        <li><strong>Sugar: </strong> {item.sugar}g</li>
        <li><strong>Fiber:</strong> {item.fiber}g</li>
      </ul>
    </div>
  )
}

export function normalizeData(data: IIngredient[]): IIngredientListItem[] {
  let newData:IIngredientListItem[] = []
  data.map((item) => {
    if (item.calories === 0 && item.fat === 0 && item.saturated_fat === 0 && item.trans_fat === 0 && item.cholesterol === 0 && item.sodium === 0 && item.carbs === 0 && item.protein === 0 && item.sugar === 0 && item.fiber === 0) {
      newData.push(item)
    }
    else {
      newData.push({
        ...item,
        //render: buildItemData(item),
      })
    }
  })
  return newData
}

export function sanitizeData(data: IIngredientListItem): IIngredient {
  return {
    id: data.id ?? '',
    name: data.name,
    description: data.description,
    thumbnail_url: data.thumbnail_url,
    label_color: data.label_color,
    calories: data.calories,
    fat: data.fat,
    saturated_fat: data.saturated_fat,
    trans_fat: data.trans_fat,
    cholesterol: data.cholesterol,
    sodium: data.sodium,
    carbs: data.carbs,
    protein: data.protein,
    sugar: data.sugar,
    fiber: data.fiber,
    price: data.price
  }
}
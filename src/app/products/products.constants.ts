import { IngredientList } from './ingredients/ingredient-list/ingredient-list'
import { ItemList } from './items/item-list/item-list'
import { MenuList } from './menus/menu-list/menu-list'
import { VarietyList } from './varieties/variety-list/variety-list'

export const productServiceToken = 'ProductService'
export const productModule = 'ProductModule'

export const productRoutePath = '/products'

export enum ProductTab {
  Items = 'Items',
  Ingredients = 'Ingredients',
  Menus = 'Menus',
  Varieties = 'Varieties',
}

export const productTabs = [
  {
    name: ProductTab.Ingredients,
    component: IngredientList,
    path: `${productRoutePath}/ingredients`
  },
  {
    name: ProductTab.Items,
    component: ItemList,
    path: `${productRoutePath}/items`
  },
  {
    name: ProductTab.Menus,
    component: MenuList,
    path: `${productRoutePath}/menus`
  },
  {
    name: ProductTab.Varieties,
    component: VarietyList,
    path: `${productRoutePath}/varieties`
  },
]
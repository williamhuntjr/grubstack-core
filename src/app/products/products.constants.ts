import { UserPermissions } from 'auth/auth.constants'
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
    path: `${productRoutePath}/ingredients`,
  },
  {
    name: ProductTab.Items,
    component: ItemList,
    path: `${productRoutePath}/items`,
  },
  {
    name: ProductTab.Menus,
    component: MenuList,
    path: `${productRoutePath}/menus`,
  },
  {
    name: ProductTab.Varieties,
    component: VarietyList,
    path: `${productRoutePath}/varieties`,
  },
]

export const productPermissions = [
  UserPermissions.ViewIngredients,
  UserPermissions.MaintainIngredients,
  UserPermissions.ViewItems,
  UserPermissions.MaintainItems,
  UserPermissions.ViewMenus,
  UserPermissions.MaintainMenus,
]

export const itemPermissions = [UserPermissions.ViewItems, UserPermissions.MaintainItems]

export const ingredientPermissions = [UserPermissions.ViewIngredients, UserPermissions.MaintainIngredients]

export const menuPermissions = [UserPermissions.ViewMenus, UserPermissions.MaintainMenus]

export const varietyPermissions = [UserPermissions.ViewVarieties, UserPermissions.MaintainVarieties]

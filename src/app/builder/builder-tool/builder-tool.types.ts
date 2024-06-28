import { IIngredient } from 'app/products/ingredients/ingredients.types'
import { IItem } from 'app/products/items/items.types'
import { IMenu } from 'app/products/menus/menus.types'
import { IVariety } from 'app/products/varieties/varieties.types'
import { GSMode } from 'common/utils/mode/mode.types'
import { BuilderTypes } from '../builder.constants'

export type IBuilderDataItem = IMenu | IIngredient | IItem

export interface IBuilderToolState {
  isLoading: boolean
  childType: BuilderTypes
  data: IBuilderDataItem[]
  selected: IItem | IMenu | IVariety | null
  parent: IItem | IMenu | IVariety | null
  optional: IVariety[] | null
  page: number
  pages: number
  mode: GSMode
}

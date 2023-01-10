import { IItem } from 'app/products/items/items.types'
import { IMenu } from 'app/products/menus/menus.types'
import { IVariety } from 'app/products/varieties/varieties.types'
import { BuilderTypes } from '../builder.constants'

export interface IBuilderDialog {
  builderType: BuilderTypes
  onClose(): void
  onClick(data: IItem | IMenu): void
}

export interface IBuilderDialogState {
  page: number
  pages: number
  total: number
  isLoading: boolean
  data: IItem[]|IMenu[]|IVariety[]
}
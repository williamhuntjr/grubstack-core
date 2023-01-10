import { IPaginationParams, IPaginationData, IResponse } from 'common/common.types'
import { GSMode } from 'common/utils/mode/mode.types'
import { IBuilderIngredientFormValues } from 'app/builder/builder-tool/ingredient-form/ingredient-form.types'

export interface IItem {
  id?: string
  name: string
  description: string
  thumbnail_url: string
  price?: number
  sale_price?: number
  is_onsale?: boolean
}

export interface IItemState {
  isLoading: boolean
  data: IItem[]
  mode: GSMode
  total: number
  pages: number
  page: number
}

export interface IItemService {
  getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IItem>>
  getItem(itemId: string): Promise<IResponse<IItem>>
  getIngredients(paginationParams: IPaginationParams, itemId: string): Promise<IPaginationData<IItem>>
  delete(ingredientId: string): Promise<void>
  deleteIngredient(itemId: string, ingredientId: string): Promise<void>
  addIngredient(itemId: string, ingredientId: string): Promise<void>
  updateIngredient(itemId: string, ingredientId: string, data: IBuilderIngredientFormValues): Promise<void>
  create(params: IItem): Promise<IItem>
  update(params: IItem): Promise<IItem>
}
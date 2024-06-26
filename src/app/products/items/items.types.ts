import { IPaginationParams, IPaginationData, IResponse } from 'common/types'
import { GSMode } from 'common/utils/mode/mode.types'
import { IBuilderIngredientFormValues } from 'app/builder/builder-tool/ingredient-form/ingredient-form.types'
import { IVariety } from 'app/products/varieties/varieties.types'
import { IIngredient } from 'app/products/ingredients/ingredients.types'

export interface IItem {
  id?: string
  name: string
  description: string
  thumbnail_url: string
  varieties?: IVariety[]
  ingredients?: IIngredient[]
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
  get(itemId: string): Promise<IResponse<IItem>>
  delete(ingredientId: string): Promise<void>
  create(params: IItem): Promise<IItem>
  update(params: IItem): Promise<IItem>
  getIngredients(paginationParams: IPaginationParams, itemId: string): Promise<IPaginationData<IIngredient>>
  deleteIngredient(itemId: string, ingredientId: string): Promise<void>
  addIngredient(itemId: string, ingredientId: string): Promise<void>
  updateIngredient(itemId: string, ingredientId: string, data: IBuilderIngredientFormValues): Promise<void>
  getVarieties(itemId: string): Promise<IVariety[]>
  addVariety(itemId: string, varietyId: string): Promise<void>
  deleteVariety(itemId: string, varietyId: string): Promise<void>
}
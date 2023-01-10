import { IPaginationParams, IPaginationData, IResponse } from 'common/common.types'
import { GSMode } from 'common/utils/mode/mode.types'
import { IIngredient } from 'app/products/ingredients/ingredients.types'

export interface IVariety {
  id?: string
  name: string
  description: string
  thumbnail_url: string
}

export interface IVarietyState {
  isLoading: boolean
  data: IVariety[]
  mode: GSMode
  total: number
  pages: number
  page: number
}

export interface IVarietyService {
  getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IVariety>>
  getVariety(varietyId: string): Promise<IResponse<IVariety>>
  delete(varietyId: string): Promise<void>
  create(params: IVariety): Promise<IVariety>
  update(params: IVariety): Promise<IVariety>
  getIngredients(paginationParams: IPaginationParams, itemId: string): Promise<IPaginationData<IIngredient>>
  addIngredient(itemId: string, ingredientId: string): Promise<void>
  deleteIngredient(itemId: string, ingredientId: string): Promise<void>
}
import { IPaginationParams, IPaginationData, IResponse } from 'common/types'
import { GSMode } from 'common/utils/mode/mode.types'

export interface IIngredient {
  id?: string
  name: string
  description: string
  thumbnail_url: string
  calories: number
  fat: number
  saturated_fat: number
  trans_fat: number
  cholesterol: number
  sodium: number
  carbs: number
  protein: number
  sugar: number
  fiber: number
  price: number
  is_optional?: boolean
  is_addon?: boolean
  is_extra?: boolean
}

export type IIngredientSpecs = Pick<IIngredient, 'calories'|'fat'|'saturated_fat'|'trans_fat'|'cholesterol'|'sodium'|'carbs'|'protein'|'sugar'|'fiber'>

export interface IIngredientState {
  isLoading: boolean
  data: IIngredient[]
  mode: GSMode
  total: number
  pages: number
  page: number
}

export interface IIngredientService {
  getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IIngredient>>
  get(ingredientId: string): Promise<IResponse<IIngredient>>
  delete(ingredientId: string): Promise<void>
  create(params: IIngredient): Promise<IIngredient>
  update(params: IIngredient): Promise<IIngredient>
}

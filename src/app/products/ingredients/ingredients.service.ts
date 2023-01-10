import { AxiosInstance } from 'axios'
import { prepareRequestParams } from 'common/utils/request.utils'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IPaginationParams, IPaginationResponse, IPaginationData, IResponse } from 'common/common.types'
import { IIngredientService, IIngredient } from './ingredients.types'

export class IngredientService implements IIngredientService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }
  
  public async getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IIngredient>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IIngredient>>('/ingredients', { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages
    }
  }

  public async delete(ingredientId: string): Promise<void> {
    const params = { ingredient_id: ingredientId }
    await this.httpClient.post<Promise<void>>('/ingredient/delete', { params })
  }

  public async create(params: IIngredient): Promise<IIngredient> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IIngredient>>('/ingredient/create', { params })
    return data
  }

  public async update(params: IIngredient): Promise<IIngredient> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IIngredient>>('/ingredient/update', { params })
    return data
  }
  
}
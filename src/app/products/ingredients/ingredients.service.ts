import { AxiosInstance } from 'axios'
import { prepareRequestParams } from 'common/utils/request.utils'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IPaginationParams, IPaginationResponse, IPaginationData, IResponse } from 'common/types'
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

  public async get(ingredientId: string): Promise<IResponse<IIngredient>> {
    const resp = await this.httpClient.get<IResponse<IIngredient>>(`/ingredients/${ingredientId}`)
    return resp.data
  }

  public async delete(ingredientId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/ingredients/${ingredientId}`)
  }

  public async create(params: IIngredient): Promise<IIngredient> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IIngredient>>('/ingredients', { params })
    return data
  }

  public async update(params: IIngredient): Promise<IIngredient> {
    const {
      data: { data },
    } = await this.httpClient.patch<IResponse<IIngredient>>(`/ingredients/${params.id}`, { params })
    return data
  }
  
}
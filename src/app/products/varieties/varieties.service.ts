import { AxiosInstance } from 'axios'
import { prepareRequestParams } from 'common/utils/request.utils'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IPaginationParams, IPaginationResponse, IPaginationData, IResponse } from 'common/types'
import { IIngredient } from 'app/products/ingredients/ingredients.types'
import { IVarietyService, IVariety } from './varieties.types'

export class VarietyService implements IVarietyService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }

  public async getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IVariety>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IVariety>>('/varieties', { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages
    }
  }

  public async getVariety(varietyId: string): Promise<IResponse<IVariety>> {
    const resp = await this.httpClient.get<IResponse<IVariety>>(`/varieties/${varietyId}`)
    return resp.data
  }

  public async delete(varietyId: string): Promise<void> {
    const params = { variety_id: varietyId }
    await this.httpClient.delete<Promise<void>>(`/varieties/${varietyId}`, { params })
  }

  public async create(params: IVariety): Promise<IVariety> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IVariety>>('/varieties', { params })
    return data
  }

  public async update(params: IVariety): Promise<IVariety> {
    const {
      data: { data },
    } = await this.httpClient.patch<IResponse<IVariety>>(`/varieties/${params.id}`, { params })
    return data
  }

  public async getIngredients(paginationParams: IPaginationParams, varietyId: string): Promise<IPaginationData<IIngredient>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IIngredient>>(`/varieties/${varietyId}/ingredients`, { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages
    }
  }

  public async addIngredient(varietyId: string, ingredientId: string): Promise<void> {
    const params = { ingredient_id: ingredientId }
    await this.httpClient.post<Promise<void>>(`/varieties/${varietyId}/ingredients`, { params })
  }

  public async deleteIngredient(varietyId: string, ingredientId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/varieties/${varietyId}/ingredients/${ingredientId}`)
  }
}
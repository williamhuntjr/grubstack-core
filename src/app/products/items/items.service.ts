import { AxiosInstance } from 'axios'
import { prepareRequestParams } from 'common/utils/request.utils'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IPaginationParams, IPaginationResponse, IPaginationData, IResponse } from 'common/types'
import { IIngredient } from 'app/products/ingredients/ingredients.types'
import { IBuilderIngredientFormValues } from 'app/builder/builder-tool/ingredient-form/ingredient-form.types'
import { IVariety } from 'app/products/varieties/varieties.types'
import { IItemService, IItem } from './items.types'

export class ItemService implements IItemService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }

  public async getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IItem>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IItem>>('/items', { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages,
    }
  }

  public async delete(itemId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/items/${itemId}`)
  }

  public async create(params: IItem): Promise<IItem> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IItem>>('/items', { params })
    return data
  }

  public async update(params: IItem): Promise<IItem> {
    const {
      data: { data },
    } = await this.httpClient.patch<IResponse<IItem>>(`/items/${params.id}`, { params })
    return data
  }

  public async get(itemId: string): Promise<IResponse<IItem>> {
    const resp = await this.httpClient.get<IResponse<IItem>>(`/items/${itemId}`)
    return resp.data
  }

  public async getIngredients(paginationParams: IPaginationParams, itemId: string): Promise<IPaginationData<IIngredient>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IIngredient>>(`/items/${itemId}/ingredients`, { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages,
    }
  }

  public async deleteIngredient(itemId: string, ingredientId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/items/${itemId}/ingredients/${ingredientId}`)
  }

  public async addIngredient(itemId: string, ingredientId: string): Promise<void> {
    const params = { ingredient_id: ingredientId }
    await this.httpClient.post<Promise<void>>(`/items/${itemId}/ingredients`, { params })
  }

  public async updateIngredient(itemId: string, ingredientId: string, data: IBuilderIngredientFormValues): Promise<void> {
    const params = {
      item_id: itemId,
      ingredient_id: ingredientId,
      ...data,
    }
    await this.httpClient.patch<IResponse<IItem>>(`/items/${itemId}/ingredients/${ingredientId}`, { params })
  }

  public async getVarieties(itemId: string): Promise<IVariety[]> {
    const {
      data: { data },
    } = await this.httpClient.get<IResponse<IVariety[]>>(`/items/${itemId}/varieties`)
    return Array.isArray(data) ? data : []
  }

  public async addVariety(itemId: string, varietyId: string): Promise<void> {
    const params = { variety_id: varietyId }
    await this.httpClient.post<Promise<void>>(`/items/${itemId}/varieties`, { params })
  }

  public async deleteVariety(itemId: string, varietyId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/items/${itemId}/varieties/${varietyId}`)
  }
}

import { AxiosInstance } from 'axios'
import { prepareRequestParams } from 'common/utils/request.utils'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IPaginationParams, IPaginationResponse, IPaginationData, IResponse } from 'common/types'
import { IIngredient } from 'app/products/ingredients/ingredients.types'
import { IBuilderIngredientFormValues } from 'app/builder/builder-tool/ingredient-form/ingredient-form.types'
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
      pages: status.totalpages
    }
  }

  public async delete(itemId: string): Promise<void> {
    const params = { item_id: itemId }
    await this.httpClient.post<Promise<void>>('/item/delete', { params })
  }

  public async create(params: IItem): Promise<IItem> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IItem>>('/item/create', { params })
    return data
  }

  public async update(params: IItem): Promise<IItem> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IItem>>('/item/update', { params })
    return data
  }

  public async getItem(itemId: string): Promise<IResponse<IItem>> {
    const resp = await this.httpClient.get<IResponse<IItem>>(`/item/${itemId}`)
    return resp.data
  }

  public async getIngredients(paginationParams: IPaginationParams, itemId: string): Promise<IPaginationData<IIngredient>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IIngredient>>(`/item/${itemId}/ingredients`, { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages
    }
  }

  public async deleteIngredient(itemId: string, ingredientId: string): Promise<void> {
    const params = { item_id: itemId, ingredient_id: ingredientId }
    await this.httpClient.post<Promise<void>>('/item/deleteIngredient', { params })
  }

  public async addIngredient(itemId: string, ingredientId: string): Promise<void> {
    const params = { item_id: itemId, ingredient_id: ingredientId }
    await this.httpClient.post<Promise<void>>('/item/addIngredient', { params })
  }

  public async updateIngredient(itemId: string, ingredientId: string, data: IBuilderIngredientFormValues): Promise<void> {
    const params = {
      item_id: itemId,
      ingredient_id: ingredientId,
      ...data
    }
    await this.httpClient.post<IResponse<IItem>>('/item/updateIngredient', { params })
  }
}
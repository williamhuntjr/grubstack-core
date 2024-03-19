import { AxiosInstance } from 'axios'
import { prepareRequestParams } from 'common/utils/request.utils'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IPaginationParams, IPaginationResponse, IPaginationData, IResponse } from 'common/types'
import { IItem } from 'app/products/items/items.types'
import { IBuilderItemFormValues } from 'app/builder/builder-tool/item-form/item-form.types'
import { IMenuService, IMenu } from './menus.types'

export class MenuService implements IMenuService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }
  
  public async getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IMenu>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IMenu>>('/menus', { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages
    }
  }

  public async get(menuId: string): Promise<IResponse<IMenu>> {
    const resp = await this.httpClient.get<IResponse<IMenu>>(`/menus/${menuId}`)
    return resp.data
  }

  public async delete(menuId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/menus/${menuId}`)
  }

  public async create(params: IMenu): Promise<IMenu> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IMenu>>('/menus', { params })
    return data
  }

  public async update(params: IMenu): Promise<IMenu> {
    const {
      data: { data },
    } = await this.httpClient.put<IResponse<IMenu>>('/menus', { params })
    return data
  }

  public async getItems(paginationParams: IPaginationParams, menuId: string): Promise<IPaginationData<IItem>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IItem>>(`/menu/${menuId}/items`, { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages
    }
  }

  public async addItem(menuId: string, itemId: string): Promise<void> {
    const params = { item_id: itemId }
    await this.httpClient.post<Promise<void>>(`/menus/${menuId}/items`, { params })
  }

  public async deleteItem(menuId: string, itemId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/menus/${menuId}/items/${itemId}`)
  }

  public async updateItem(menuId: string, itemId: string, data: IBuilderItemFormValues): Promise<void> {
    const params = {
      ...data
    }
    await this.httpClient.put<IResponse<IItem>>(`/menus/${menuId}/items/${itemId}`, { params })
  }

}
import { AxiosInstance } from 'axios'
import { prepareRequestParams } from 'common/utils/request.utils'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IPaginationParams, IPaginationResponse, IPaginationData, IResponse } from 'common/common.types'
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

  public async getMenu(menuId: string): Promise<IResponse<IMenu>> {
    const resp = await this.httpClient.get<IResponse<IMenu>>(`/menu/${menuId}`)
    return resp.data
  }

  public async delete(menuId: string): Promise<void> {
    const params = { menu_id: menuId }
    await this.httpClient.post<Promise<void>>('/menu/delete', { params })
  }

  public async create(params: IMenu): Promise<IMenu> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IMenu>>('/menu/create', { params })
    return data
  }

  public async update(params: IMenu): Promise<IMenu> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IMenu>>('/menu/update', { params })
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
    const params = { menu_id: menuId, item_id: itemId }
    await this.httpClient.post<Promise<void>>('/menu/addItem', { params })
  }

  public async deleteItem(menuId: string, itemId: string): Promise<void> {
    const params = { menu_id: menuId, item_id: itemId }
    await this.httpClient.post<Promise<void>>('/menu/deleteItem', { params })
  }

  public async updateItem(menuId: string, itemId: string, data: IBuilderItemFormValues): Promise<void> {
    const params = {
      menu_id: menuId,
      item_id: itemId,
      ...data
    }
    await this.httpClient.post<IResponse<IItem>>('/menu/updateItem', { params })
  }

}
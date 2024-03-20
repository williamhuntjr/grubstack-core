import { AxiosInstance } from 'axios'
import { prepareRequestParams } from 'common/utils/request.utils'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IStoreFilters } from 'common/types/filter.types'
import { IPaginationParams, IPaginationResponse, IPaginationData, IResponse } from 'common/types'
import { IMenu } from 'app/products/menus/menus.types'
import { IStoreService, IStore } from './stores.types'

export class StoreService implements IStoreService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }
  
  public async getAll(paginationParams: IPaginationParams, filters?: IStoreFilters): Promise<IPaginationData<IStore>> {
    const params = prepareRequestParams(paginationParams, filters)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IStore>>('/stores', { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages
    }
  }

  public async get(storeId: string): Promise<IResponse<IStore>> {
    const {
      data: { data, status },
    } = await this.httpClient.get<IResponse<IStore>>(`/stores/${storeId}`)
    return {
      data, status
    }
  }

  public async delete(storeId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/stores/${storeId}`)
  }

  public async create(params: IStore): Promise<IStore> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IStore>>('/stores', { params })
    return data
  }

  public async update(params: IStore): Promise<IStore> {
    const {
      data: { data },
    } = await this.httpClient.put<IResponse<IStore>>('/stores', { params })
    return data
  }

  public async getMenus(paginationParams: IPaginationParams, storeId: string): Promise<IPaginationData<IMenu>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IMenu>>(`/stores/${storeId}/menus`, { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages
    }
  }

  public async addMenu(storeId: string, menuId: string): Promise<void> {
    const params = { menu_id: menuId }
    await this.httpClient.post<Promise<void>>(`/stores/${storeId}/menus`, { params })
  }

  public async deleteMenu(storeId: string, menuId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/stores/${storeId}/menus/${menuId}`)
  }
}
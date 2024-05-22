import { AxiosInstance } from 'axios'
import { prepareRequestParams } from 'common/utils/request.utils'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IPaginationParams, IPaginationResponse, IPaginationData, IResponse } from 'common/types'
import { IMenu } from 'app/products/menus/menus.types'
import { ILocationService, ILocation, ILocationFilters } from './locations.types'

export class LocationService implements ILocationService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }
  
  public async getAll(paginationParams: IPaginationParams): Promise<IPaginationData<ILocation>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<ILocation>>('/locations', { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages
    }
  }

  public async get(locationId: string): Promise<IResponse<ILocation>> {
    const resp = await this.httpClient.get<IResponse<ILocation>>(`/locations/${locationId}`)
    return resp.data
  }

  public async delete(locationId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/locations/${locationId}`)
  }

  public async create(params: ILocation): Promise<ILocation> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<ILocation>>('/locations', { params })
    return data
  }

  public async update(params: ILocation): Promise<ILocation> {
    const {
      data: { data },
    } = await this.httpClient.patch<IResponse<ILocation>>(`/locations/${params.id}`, { params })
    return data
  }

  public async getMenus(paginationParams: IPaginationParams, filters?: ILocationFilters): Promise<IPaginationData<IMenu>> {
    const params = prepareRequestParams(paginationParams, filters)
    const locationId = params.id
    if (locationId) {
      const {
        data: { data, status },
      } = await this.httpClient.get<IPaginationResponse<IMenu>>(`/locations/${locationId}/menus`, {})
      return {
        data: Array.isArray(data) ? data : [],
        total: status.totalrowcount,
        pages: status.totalpages
      }
    }
    return {
      data: [],
      total: 0,
      pages: 0
    }
  }

  public async addMenu(locationId: string, menuId: string): Promise<void> {
    const params = { menu_id: menuId }
    await this.httpClient.post<Promise<void>>(`/locations/${locationId}/menus`, { params })
  }

  public async deleteMenu(locationId: string, menuId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/locations/${locationId}/menus/${menuId}`)
  }
}
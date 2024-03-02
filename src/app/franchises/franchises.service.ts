import { AxiosInstance } from 'axios'
import { prepareRequestParams } from 'common/utils/request.utils'
import { bindAllInstanceMethods } from 'common/utils/object.utils'
import { IPaginationParams, IPaginationResponse, IPaginationData, IResponse } from 'common/types'
import { IStore } from 'app/stores/stores.types'
import { IFranchiseFilters } from 'common/types/filter.types'
import { IFranchiseService, IFranchise } from './franchises.types'

export class FranchiseService implements IFranchiseService {
  constructor(private readonly httpClient: AxiosInstance) {
    bindAllInstanceMethods(this)
  }
  
  public async getAll(paginationParams: IPaginationParams, filters?: IFranchiseFilters): Promise<IPaginationData<IFranchise>> {
    const params = prepareRequestParams(paginationParams, filters)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IFranchise>>('/franchises', { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages
    }
  }

  public async get(franchiseId: string): Promise<IResponse<IFranchise>> {
    const {
      data: { data, status },
    } = await this.httpClient.get<IResponse<IFranchise>>(`/franchises/${franchiseId}`)
    return {
      data, status
    }
  }

  public async delete(franchiseId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/franchises/${franchiseId}`)
  }

  public async create(params: IFranchise): Promise<IFranchise> {
    const {
      data: { data },
    } = await this.httpClient.post<IResponse<IFranchise>>('/franchises', { params })
    return data
  }

  public async update(params: IFranchise): Promise<IFranchise> {
    const {
      data: { data },
    } = await this.httpClient.put<IResponse<IFranchise>>('/franchises', { params })
    return data
  }

  public async getStores(paginationParams: IPaginationParams, franchiseId: string): Promise<IPaginationData<IStore>> {
    const params = prepareRequestParams(paginationParams)
    const {
      data: { data, status },
    } = await this.httpClient.get<IPaginationResponse<IStore>>(`/franchises/${franchiseId}/stores`, { params })
    return {
      data: Array.isArray(data) ? data : [],
      total: status.totalrowcount,
      pages: status.totalpages
    }
  }

  public async addStore(franchiseId: string, storeId: string): Promise<void> {
    const params = { store_id: storeId }
    await this.httpClient.post<Promise<void>>(`/franchises/${franchiseId}/stores`, { params })
  }

  public async deleteStore(franchiseId: string, storeId: string): Promise<void> {
    await this.httpClient.delete<Promise<void>>(`/franchises/${franchiseId}/stores/${storeId}`)
  }
}
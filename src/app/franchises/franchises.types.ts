import { GSMode } from 'common/utils/mode/mode.types'
import { IPaginationParams, IPaginationData, IResponse } from 'common/types'
import { ICardListItem } from 'core/components/card-list/card-list.types'
import { IStore } from 'app/stores/stores.types'

export interface IFranchise {
  id?: string
  name: string
  description: string
  thumbnail_url: string
  stores?: IStore[]
}

export interface IFranchiseService {
 getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IFranchise>>
 get(franchiseId: string): Promise<IResponse<IFranchise>>
 delete(franchiseId: string): Promise<void>
 create(params: IFranchise): Promise<IFranchise>
 update(params: IFranchise): Promise<IFranchise>
 getStores(paginationParams: IPaginationParams, franchiseId: string): Promise<IPaginationData<IStore>>
 addStore(franchiseId: string, storeId: string): Promise<void>
 deleteStore(franchiseId: string, storeId: string): Promise<void>
}

export interface IFranchiseState {
  isLoading: boolean
  mode: GSMode
}

export interface IFranchiseCardItem extends ICardListItem, IFranchise {
  thumbnail_url: string
}

export interface IFranchiseQuickPickerState {
  page: number
  pages: number
  total: number
  isLoading: boolean
  data: IStore[]
}
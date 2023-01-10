import { GSMode } from 'common/utils/mode/mode.types'
import { IPaginationParams, IPaginationData, IResponse } from 'common/common.types'
import { ICardListItem } from 'core/components/card-list/card-list.types'
import { IMenu } from 'app/products/menus/menus.types'

export interface IStore {
  id?: string
  name: string
  address1: string
  city: string
  state: string
  postal: string
  slug?: string
  store_type: string
  thumbnail_url: string
  menus?: IMenu[]
}

export interface IStoreService {
 getAll(paginationParams: IPaginationParams): Promise<IPaginationData<IStore>>
 get(storeId: string): Promise<IResponse<IStore>>
 delete(storeId: string): Promise<void>
 create(params: IStore): Promise<IStore>
 update(params: IStore): Promise<IStore>
 getMenus(paginationParams: IPaginationParams, storeId: string): Promise<IPaginationData<IMenu>>
 addMenu(storeId: string, menuId: string): Promise<void>
 deleteMenu(storeId: string, menuId: string): Promise<void>
}

export interface IStoreState {
  isLoading: boolean
  mode: GSMode
}

export interface IStoreCardItem extends ICardListItem, IStore {
  thumbnail_url: string
}

export interface IStoreQuickPickerState {
  page: number
  pages: number
  total: number
  isLoading: boolean
  data: IMenu[]
}
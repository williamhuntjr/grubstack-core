import { IPaginationParams, IPaginationData, IResponse } from 'common/types'
import { IMenu } from 'app/products/menus/menus.types'
import { GSMode } from 'common/utils/mode/mode.types'
import { IOrderType } from '../order-types/order-types.types'

export interface ILocation {
  id?: string
  name: string
  address1: string
  city: string
  state: string
  postal: string
  location_type: string
  phone_number: string
  create_date?: string
  menus?: IMenu[]
  is_active: boolean
}

export interface ILocationState {
  isLoading: boolean
  mode: GSMode
  data: ILocation | null
}

export interface ILocationFilters {
  id: string
}

export interface ILocationService {
  getAll(paginationParams: IPaginationParams): Promise<IPaginationData<ILocation>>
  get(locationId: string): Promise<IResponse<ILocation>>
  create(params: ILocation): Promise<ILocation>
  update(params: ILocation): Promise<ILocation>
  delete(locationId: string): Promise<void>
  getMenus(paginationParams: IPaginationParams, filters?: ILocationFilters): Promise<IPaginationData<IMenu>>
  addMenu(locationId: string, menuId: string): Promise<void>
  deleteMenu(locationId: string, menuId: string): Promise<void>
  getOrderTypes(locationId: string): Promise<IResponse<IOrderType[]>>
  addOrderType(locationId: string, orderTypeId: string): Promise<void>
  deleteOrderType(locationId: string, orderTypeId: string): Promise<void>
}

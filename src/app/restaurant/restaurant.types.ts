import { IResponse } from 'common/types'
import { IOrderType } from './order-types/order-types.types'

export interface IRestaurantService {
  getOrderTypes(): Promise<IResponse<IOrderType[]>>
}

export interface IRestaurantContainer {
  label?: string
  route?: string
  children?: React.ReactNode
}

export interface IProperty {
  key: string
  value: string
}

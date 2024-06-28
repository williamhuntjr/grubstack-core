import { IResponse } from 'common/types'
import { IOrderType } from './order-types/order-types.types'

export interface IRestaurantService {
  getProperty(key: string): Promise<IResponse<IProperty>>
  updateProperty(params: IProperty): Promise<IResponse<IProperty>>
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
